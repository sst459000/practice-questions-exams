export function QuestionNavigation({ index, total, onPrevious, onNext }) {
  return (
    <div className="question-nav" aria-label="Question navigation">
      <button type="button" className="secondary" disabled={index <= 0} onClick={onPrevious}>Previous</button>
      <span className="question-position">Question {Math.min(index + 1, total)} of {total}</span>
      <button type="button" className="secondary" disabled={index >= total - 1} onClick={onNext}>Next</button>
    </div>
  );
}
