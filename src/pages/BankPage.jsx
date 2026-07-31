import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ConfirmDialog } from "../components/ConfirmDialog.jsx";
import { QuestionNavigation } from "../components/QuestionNavigation.jsx";
import { readStorage, removeStorage, shuffle, writeStorage } from "../utils.js";

/** Question-bank learning mode with editable answers and confirmed feedback. */
export function BankPage({ courses }) {
  const { courseId } = useParams();
  const bank = courses[courseId]?.bank || [];
  const storageKey = `istqb-${courseId}-question-bank`;
  const draftStorageKey = `${storageKey}-drafts`;
  const [activeSectionId, setActiveSectionId] = useState(bank[0]?.id);
  const [selections, setSelections] = useState(() => readStorage(storageKey, {}));
  const [pendingSelections, setPendingSelections] = useState(() => readStorage(draftStorageKey, {}));
  const [positions, setPositions] = useState({});
  const [confirmState, setConfirmState] = useState(null);
  const questionOrder = useMemo(() => new Map(bank.map((section) => [section.id, shuffle(section.questions)])), [bank]);
  const section = bank.find((item) => item.id === activeSectionId) || bank[0];
  const questions = section ? (questionOrder.get(section.id) || section.questions) : [];
  const index = Math.min(positions[section?.id] || 0, Math.max(questions.length - 1, 0));
  const question = questions[index];

  const summaryFor = (item) => {
    const answered = item.questions.filter((entry) => selections[entry.id]);
    return { total: item.questions.length, answered: answered.length, correct: answered.filter((entry) => isCorrect(entry, selections[entry.id])).length };
  };
  const overall = bank.reduce((result, item) => {
    const summary = summaryFor(item);
    return { total: result.total + summary.total, answered: result.answered + summary.answered, correct: result.correct + summary.correct };
  }, { total: 0, answered: 0, correct: 0 });
  const sectionSummary = section ? summaryFor(section) : { total: 0, answered: 0, correct: 0 };

  function choose(letter) {
    const next = { ...pendingSelections, [question.id]: letter };
    setPendingSelections(next);
    writeStorage(draftStorageKey, next);
  }

  function confirmAnswer() {
    const pending = pendingSelections[question.id];
    if (!pending) return;
    const next = { ...selections, [question.id]: pending };
    setSelections(next);
    setPendingSelections((current) => {
      const remaining = { ...current };
      delete remaining[question.id];
      writeStorage(draftStorageKey, remaining);
      return remaining;
    });
    writeStorage(storageKey, next);
  }

  function move(offset) {
    setPositions((current) => ({ ...current, [section.id]: Math.min(Math.max(index + offset, 0), questions.length - 1) }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetSection() {
    const next = { ...selections };
    section.questions.forEach((entry) => delete next[entry.id]);
    setSelections(next);
    setPendingSelections({});
    removeStorage(draftStorageKey);
    setPositions((current) => ({ ...current, [section.id]: 0 }));
    writeStorage(storageKey, next);
    setConfirmState(null);
  }

  function resetAll() {
    setSelections({});
    setPendingSelections({});
    removeStorage(draftStorageKey);
    setPositions({});
    removeStorage(storageKey);
    setConfirmState(null);
  }

  if (!section || !question) return <main className="empty-state"><p>No question-bank content is available.</p></main>;
  const selected = pendingSelections[question.id] || selections[question.id];
  const isPending = Boolean(pendingSelections[question.id]);
  const selectedOption = question.options.find((option) => option.letter === selected);
  const correctOption = question.options.find((option) => option.correct);

  return (
    <main className="bank-shell">
      <p className="notice">Original syllabus-aligned learning questions. Select an option, change it if needed, then choose “Check answer” when you are ready.</p>
      <section className="bank-layout">
        <aside className="section-panel">
          <div className="section-panel-heading"><h2>Sections</h2></div>
          <div className="section-list">
            {bank.map((item) => {
              const summary = summaryFor(item);
              return <button type="button" className={`section-button${item.id === section.id ? " active" : ""}`} onClick={() => setActiveSectionId(item.id)} key={item.id}><span>{item.title}</span><strong>{summary.answered}/{summary.total} tried, {summary.correct} correct</strong></button>;
            })}
          </div>
          <div className="source-note">Based on the official {courseId === "ctai" ? "ISTQB CT-AI v2.0" : "ISTQB CTFL v4.0.1"} syllabus chapter structure.</div>
        </aside>
        <section className="bank-main">
          <div className="bank-header"><div><h2>{section.title}</h2><p>{section.subtitle}</p></div><div className="bank-actions"><span className="section-progress">{sectionSummary.answered}/{sectionSummary.total} tried, {sectionSummary.correct} correct</span><button type="button" className="secondary" onClick={() => setConfirmState("section")}>Reset section</button><button type="button" className="secondary" onClick={() => setConfirmState("all")}>Reset all</button></div></div>
          <QuestionNavigation index={index} total={questions.length} onPrevious={() => move(-1)} onNext={() => move(1)} />
          <article className={`question learning-question ${selected ? `answered ${isCorrect(question, selected) ? "correct" : "incorrect"}` : ""}`}>
            <h2 className="question-title"><span className="number">{index + 1}</span><span>{question.text}</span></h2>
            <div className="learning-options">
              {question.options.map((option) => <label className={`learning-option ${selected ? `${option.correct && !isPending ? "is-correct" : ""} ${selected === option.letter && option.correct && !isPending ? "is-selected-correct" : ""} ${selected === option.letter && !option.correct && !isPending ? "is-selected-wrong" : ""} ${selected === option.letter && isPending ? "is-pending" : ""}` : ""}`} key={option.letter}><input type="radio" name={`bank-question-${question.id}`} value={option.letter} checked={selected === option.letter} onChange={() => choose(option.letter)} /><span>{option.text}</span></label>)}
            </div>
            {isPending && <div className="question-tools"><button type="button" onClick={confirmAnswer}>Check answer</button></div>}
            {selected && !isPending && <div className={`feedback ${selectedOption?.correct ? "feedback-correct" : "feedback-incorrect"}`}><strong>{selectedOption?.correct ? "Correct" : "Incorrect"}</strong><p><span>Concept:</span> {question.topic}</p>{selectedOption?.correct ? <p>{selectedOption.reason}</p> : <><p><span>Your choice:</span> {selectedOption?.reason}</p><p><span>Correct answer {correctOption?.letter}:</span> {correctOption?.reason}</p></>}<p><span>Takeaway:</span> {question.takeaway}</p></div>}
          </article>
        </section>
      </section>
      <div className="progress footer-progress">{overall.answered}/{overall.total} tried overall</div>
      <ConfirmDialog open={Boolean(confirmState)} title={confirmState === "all" ? "Reset all progress?" : "Reset section?"} message={confirmState === "all" ? "This will clear your answers across the full question bank." : `This will clear your answers for ${section.title}.`} acceptLabel={confirmState === "all" ? "Reset all" : "Reset section"} onCancel={() => setConfirmState(null)} onAccept={confirmState === "all" ? resetAll : resetSection} />
    </main>
  );
}

function isCorrect(question, letter) {
  return Boolean(question.options.find((option) => option.letter === letter)?.correct);
}
