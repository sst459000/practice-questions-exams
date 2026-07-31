import { Link, useParams } from "react-router-dom";
import { ResultsQuestion } from "../components/ResultsQuestion.jsx";
import { normalizeKey, readStorage } from "../utils.js";

/** Displays every submitted question in one continuously scrollable view. */
export function ResultsPage() {
  const { courseId, setId } = useParams();
  const result = readStorage(`istqb-${courseId}-${setId}-results`, null);
  if (!result?.set?.questions) return <main className="results-shell"><section className="score-summary"><h1>Results unavailable</h1><p>Submit a practice exam first to see its results.</p><div className="results-actions"><Link className="button-link" to={`/course/${courseId}/exams`}>Back to practice exams</Link><Link className="button-link secondary" to={`/course/${courseId}`}>Course home</Link></div></section></main>;

  const { set, selections = {}, answers = {} } = result;
  const getCorrect = (question) => answers[normalizeKey(question.text)] || question.correct || question.answer;
  const correctCount = set.questions.filter((question) => selections[normalizeKey(question.text)] === getCorrect(question)).length;
  const percentage = set.questions.length ? Math.round((correctCount / set.questions.length) * 100) : 0;

  return (
    <main className="results-shell">
      <section className="score-summary"><p className="score-label">Your score</p><strong className="score-value">{correctCount}/{set.questions.length}</strong><p className="score-percent">{percentage}% correct</p><p className="score-detail">Review every question below. Green is correct, red is incorrect, and gray is unanswered.</p></section>
      <div className="results-list">{set.questions.map((question, index) => <ResultsQuestion question={question} number={index + 1} selected={selections[normalizeKey(question.text)]} correct={getCorrect(question)} key={index} />)}</div>
      <div className="results-actions"><Link className="button-link" to={`/course/${courseId}/exam/${setId}?attempt=new`}>Start new attempt</Link><Link className="button-link secondary" to={`/course/${courseId}/exams`}>Practice exams</Link></div>
    </main>
  );
}
