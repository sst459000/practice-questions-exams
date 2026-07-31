import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { normalizeKey, readStorage } from "../utils.js";
import { ExamNavigationProvider } from "../context/ExamNavigationContext.jsx";
import { BankNavigationProvider } from "../context/BankNavigationContext.jsx";

/** Shared application chrome used by every route. */
export function Layout({ courses }) {
  const location = useLocation();
  const { courseId, setId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [activeBankSectionId, setActiveBankSectionId] = useState(null);
  const course = courses[courseId];
  const isExamRoute = location.pathname.includes("/exam/");
  const isBankRoute = location.pathname.includes("/bank");
  const isPracticeRoute = location.pathname.includes("/exams") || isExamRoute || location.pathname.includes("/results/");
  const activeExam = isExamRoute && course ? course.exams[setId] : null;
  const examSelections = activeExam ? readStorage(`istqb-${courseId}-${setId}`, {}) : {};

  useEffect(() => {
    setActiveQuestionIndex(0);
    setActiveBankSectionId(course?.bank?.[0]?.id || null);
    setMenuOpen(false);
  }, [courseId, setId]);

  useEffect(() => {
    const closeMenu = (event) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", closeMenu);
    return () => document.removeEventListener("keydown", closeMenu);
  }, []);

  function selectExamQuestion(index) {
    setActiveQuestionIndex(index);
    setMenuOpen(false);
  }

  function selectBankSection(sectionId) {
    setActiveBankSectionId(sectionId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function sectionProgress(section) {
    const progress = readStorage(`istqb-${courseId}-question-bank`, {});
    return `${section.questions.filter((question) => progress[question.id]).length}/${section.questions.length}`;
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">ISTQB Testing Practice</p>
          <h1>{course?.name || "Study Hub"}</h1>
        </div>
        <button type="button" className="mobile-menu-toggle" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span className="hamburger-icon" aria-hidden="true"><span /><span /><span /></span></button>
        <nav id="primary-navigation" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary">
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          {course && isPracticeRoute && <NavLink to={`/course/${course.id}/bank`} onClick={() => setMenuOpen(false)}>Question Bank</NavLink>}
          {course && isBankRoute && <NavLink to={`/course/${course.id}/exams`} onClick={() => setMenuOpen(false)}>Practice Exams</NavLink>}
          {course && isBankRoute && <div className="mobile-bank-menu"><h2>Sections</h2><div className="mobile-section-list">{course.bank.map((section) => <button type="button" className={`mobile-section-button${section.id === activeBankSectionId ? " active" : ""}`} onClick={() => selectBankSection(section.id)} key={section.id}><span>{section.title}</span><strong>{sectionProgress(section)} tried</strong></button>)}</div></div>}
          {activeExam && <div className="mobile-question-menu"><h2>Questions</h2><div className="question-jump-list">{activeExam.questions.map((question, index) => <button type="button" className={`question-jump-button ${examSelections[normalizeKey(question.text)] ? "answered" : ""} ${index === activeQuestionIndex ? "active" : ""}`} onClick={() => selectExamQuestion(index)} key={index}>{index + 1}</button>)}</div><p className="question-map-legend"><span className="legend-dot" aria-hidden="true" />Answered</p></div>}
        </nav>
      </header>
      <ExamNavigationProvider value={{ activeQuestionIndex, setActiveQuestionIndex }}>
        <BankNavigationProvider value={{ activeSectionId: activeBankSectionId, setActiveSectionId: selectBankSection }}>
          <Outlet />
        </BankNavigationProvider>
      </ExamNavigationProvider>
      {course && <footer className="study-footer"><div><strong>Official documentation</strong><span>{course.name} · {course.syllabus}</span></div><div className="study-footer-links"><a href={course.id === "ctfl" ? "https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" : "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/"} target="_blank" rel="noreferrer">Official {course.name} syllabus</a><a href="https://www.istqb.org/certifications/" target="_blank" rel="noreferrer">All ISTQB certifications</a></div></footer>}
    </>
  );
}
