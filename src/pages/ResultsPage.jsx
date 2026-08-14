import { Link, useParams } from "react-router-dom";
import { ResultsQuestion } from "../components/ResultsQuestion.jsx";
import { normalizeKey, readStorage } from "../utils.js";

/** Displays submitted exam results with a topic summary and the full detailed review below. */
export function ResultsPage() {
  const { courseId, setId } = useParams();
  const result = readStorage(`istqb-${courseId}-${setId}-results`, null);

  if (!result?.set?.questions) {
    return (
      <main className="results-shell">
        <section className="score-summary">
          <h1>Results unavailable</h1>
          <p>Submit a practice exam first to see its results.</p>
          <div className="results-actions">
            <Link className="button-link" to={`/course/${courseId}/exams`}>Back to practice exams</Link>
            <Link className="button-link secondary" to={`/course/${courseId}`}>Course home</Link>
          </div>
        </section>
      </main>
    );
  }

  const { set, selections = {}, answers = {}, review = [] } = result;
  const reviewQuestions = review.length ? review : set.questions.map((question, index) => createFallbackReviewQuestion({ question, index, selections, answers, setId }));
  const correctCount = reviewQuestions.filter((entry) => entry.selected && entry.selected === entry.correct).length;
  const percentage = reviewQuestions.length ? Math.round((correctCount / reviewQuestions.length) * 100) : 0;
  const topicSummary = buildTopicSummary(reviewQuestions);

  return (
    <main className="results-shell">
      <section className="score-summary">
        <p className="score-label">Your score</p>
        <strong className="score-value">{correctCount}/{reviewQuestions.length}</strong>
        <p className="score-percent">{percentage}% correct</p>
        <p className="score-detail">Review the full question breakdown below. Green is correct, red is incorrect, and gray is unanswered.</p>
      </section>

      <section className="review-panel">
        <div className="review-panel-header">
          <div>
            <p className="score-label">Review focus</p>
            <h2>Weak topics</h2>
          </div>
          <p className="review-panel-copy">Use the topic breakdown to plan the next revision round, then read the detailed explanation for each question below.</p>
        </div>

        <div className="topic-summary-grid">
          {topicSummary.map((topic) => (
            <article className="topic-summary-card" key={topic.name}>
              <strong>{topic.name}</strong>
              <span>{topic.correct}/{topic.total} correct</span>
              <small>{topic.missed} missed</small>
            </article>
          ))}
        </div>

        <div className="results-actions results-actions-inline">
          <Link className="button-link" to={`/course/${courseId}/exam/${setId}?attempt=new`}>Start new attempt</Link>
          <Link className="button-link secondary" to={`/course/${courseId}/exams`}>Practice exams</Link>
        </div>
      </section>

      <div className="results-list">
        {reviewQuestions.map((question, index) => (
          <ResultsQuestion
            question={question}
            number={index + 1}
            selected={question.selected}
            correct={question.correct}
            review={question}
            key={question.id}
          />
        ))}
      </div>
    </main>
  );
}

function createFallbackReviewQuestion({ question, index, selections, answers, setId }) {
  const key = normalizeKey(question.text);
  const correct = answers[key] || question.correct || question.answer;
  const selected = selections[key];
  const correctOption = question.options.find((option) => option.letter === correct);
  const selectedOption = question.options.find((option) => option.letter === selected);

  return {
    id: `${setId}-question-${index + 1}`,
    number: index + 1,
    text: question.text,
    topic: question.topic || "Review",
    selected,
    correct,
    selectedText: selectedOption?.text || "",
    selectedReason: selectedOption?.reason || "",
    correctText: correctOption?.text || "",
    correctReason: correctOption?.reason || "",
    takeaway: question.takeaway || "",
    options: question.options
  };
}

function buildTopicSummary(reviewQuestions) {
  const summary = new Map();
  reviewQuestions.forEach((question) => {
    const entry = summary.get(question.topic) || { name: question.topic, total: 0, correct: 0, missed: 0 };
    entry.total += 1;
    if (question.selected && question.selected === question.correct) {
      entry.correct += 1;
    } else {
      entry.missed += 1;
    }
    summary.set(question.topic, entry);
  });

  return [...summary.values()].sort((a, b) => b.missed - a.missed || a.name.localeCompare(b.name));
}
