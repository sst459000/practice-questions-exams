import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ExamsPage } from "./pages/ExamsPage.jsx";
import { BankPage } from "./pages/BankPage.jsx";
import { ExamPage } from "./pages/ExamPage.jsx";
import { ResultsPage } from "./pages/ResultsPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { prepareCourseContent } from "./utils.js";

/** Loads both course catalogs once before the shared routes render. */
export default function App() {
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setCourses(null);
    setError("");
    Promise.all([
      fetch("/data/exams.json").then(requireResponse).then((response) => response.json()),
      fetch("/data/ctfl/bank.json").then(requireResponse).then((response) => response.json()),
      fetch("/data/ctfl/practice-answers.json").then(requireResponse).then((response) => response.json()),
      fetch("/data/ctai/exams.json").then(requireResponse).then((response) => response.json()),
      fetch("/data/ctai/bank.json").then(requireResponse).then((response) => response.json())
    ])
      .then(([ctflExams, ctflBank, ctflAnswers, ctaiExams, ctaiBank]) => {
        if (cancelled) return;
        setCourses({
          ctfl: prepareCourseContent({ id: "ctfl", name: "ISTQB CTFL", title: "Certified Tester Foundation Level", syllabus: "CTFL v4.0.1", exams: ctflExams, bank: ctflBank, answerKey: ctflAnswers }, ctflAnswers),
          ctai: prepareCourseContent({ id: "ctai", name: "ISTQB CT-AI", title: "Certified Tester AI Testing", syllabus: "CT-AI v2.0", exams: ctaiExams, bank: ctaiBank, answerKey: {} })
        });
      })
      .catch((loadError) => {
        if (!cancelled) setError(loadError.message);
      });
    return () => { cancelled = true; };
  }, [loadAttempt]);

  if (error) return <main className="error-state"><h1>Unable to load StudyHub content</h1><p>{error}</p><button type="button" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>Retry loading content</button></main>;
  if (!courses) return <main className="loading-state">Loading practice content…</main>;

  return (
    <Routes>
      <Route element={<Layout courses={courses} />}>
        <Route index element={<HomePage courses={courses} />} />
        <Route path="course/:courseId" element={<HomePage courses={courses} />} />
        <Route path="course/:courseId/bank" element={<BankPage courses={courses} />} />
        <Route path="course/:courseId/exams" element={<ExamsPage courses={courses} />} />
        <Route path="course/:courseId/exam/:setId" element={<ExamPage courses={courses} />} />
        <Route path="course/:courseId/results/:setId" element={<ResultsPage courses={courses} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function requireResponse(response) {
  if (!response.ok) throw new Error("Unable to load course data.");
  return response;
}
