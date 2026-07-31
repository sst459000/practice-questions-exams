import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ConfirmDialog } from "../components/ConfirmDialog.jsx";
import { QuestionCard } from "../components/QuestionCard.jsx";
import { QuestionNavigation } from "../components/QuestionNavigation.jsx";
import { normalizeKey, readStorage, removeStorage, writeStorage } from "../utils.js";
import { useExamNavigation } from "../context/ExamNavigationContext.jsx";

/** One-question-at-a-time mock exam controller. */
export function ExamPage({ courses }) {
  const { courseId, setId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const course = courses[courseId];
  const set = course?.exams[setId];
  const answerKey = course?.answerKey || {};
  const storageKey = `istqb-${courseId}-${setId}`;
  const freshAttempt = searchParams.get("attempt") === "new";
  const [selections, setSelections] = useState(() => freshAttempt ? {} : readStorage(storageKey, {}));
  const [index, setIndex] = useState(0);
  const [confirmState, setConfirmState] = useState(null);
  const { setActiveQuestionIndex } = useExamNavigation();

  useEffect(() => {
    setActiveQuestionIndex(index);
  }, [index, setActiveQuestionIndex]);

  useEffect(() => {
    if (!freshAttempt) return;
    removeStorage(storageKey);
    removeStorage(`${storageKey}-results`);
    removeStorage(`${storageKey}-submitted`);
  }, [freshAttempt, storageKey]);

  if (!set) return <main className="empty-state"><h1>Exam not found</h1><p>Choose an exam from the practice exam list.</p></main>;
  const question = set.questions[index];
  const key = normalizeKey(question.text);
  const answered = set.questions.filter((item) => selections[normalizeKey(item.text)]).length;

  function select(letter) {
    const next = { ...selections, [key]: letter };
    setSelections(next);
    writeStorage(storageKey, next);
  }

  function clear() {
    const next = { ...selections };
    delete next[key];
    setSelections(next);
    writeStorage(storageKey, next);
  }

  function submit() {
    const resultsKey = `${storageKey}-results`;
    writeStorage(resultsKey, { set, selections, answers: answerKey });
    writeStorage(`${storageKey}-submitted`, true);
    navigate(`/course/${courseId}/results/${setId}`);
  }

  function reset() {
    setSelections({});
    removeStorage(storageKey);
    removeStorage(`${storageKey}-results`);
    removeStorage(`${storageKey}-submitted`);
    setIndex(0);
    setConfirmState(null);
  }

  return (
    <main className="exam-shell">
      <p className="notice"><strong>{course.name}</strong> · Select one option for each question. Your choices are saved in this browser.</p>
      <section className="exam-layout">
        <aside className="question-map-panel"><div className="question-map-heading"><h2>Questions</h2></div><div className="question-jump-list">{set.questions.map((item, itemIndex) => <button type="button" className={`question-jump-button ${selections[normalizeKey(item.text)] ? "answered" : ""} ${itemIndex === index ? "active" : ""}`} onClick={() => setIndex(itemIndex)} key={itemIndex}>{itemIndex + 1}</button>)}</div><p className="question-map-legend"><span className="legend-dot" aria-hidden="true" />Answered</p></aside>
        <section className="exam-main">
          <div className="exam-page-heading"><div><p className="eyebrow">{set.title}</p><h2>{answered}/{set.questions.length} answered</h2></div></div>
          <QuestionNavigation index={index} total={set.questions.length} onPrevious={() => setIndex((value) => Math.max(value - 1, 0))} onNext={() => setIndex((value) => Math.min(value + 1, set.questions.length - 1))} />
          <QuestionCard question={question} number={index + 1} selected={selections[key]} onSelect={select} onClear={clear} />
          <section className="exam-actions"><div className="actions"><button type="button" onClick={() => setConfirmState("submit")}>Submit exam</button><button type="button" className="secondary" onClick={() => setConfirmState("reset")}>Reset exam</button></div></section>
        </section>
      </section>
      <ConfirmDialog open={Boolean(confirmState)} title={confirmState === "reset" ? "Reset exam?" : "Submit exam?"} message={confirmState === "reset" ? `This will clear your answers for ${set.title}.` : answered < set.questions.length ? `You have answered ${answered}/${set.questions.length} questions. Submit anyway?` : "This will lock in your current answers and show the score."} acceptLabel={confirmState === "reset" ? "Reset exam" : answered < set.questions.length ? "Submit anyway" : "Submit exam"} onCancel={() => setConfirmState(null)} onAccept={confirmState === "reset" ? reset : submit} />
    </main>
  );
}
