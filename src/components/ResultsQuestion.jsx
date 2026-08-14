export function ResultsQuestion({ question, number, selected, correct, review }) {
  const isCorrect = Boolean(selected && correct && selected === correct);
  const statusClass = !selected ? "result-unanswered" : isCorrect ? "result-correct" : "result-incorrect";
  const explanation = !selected
    ? review?.correctReason || "Review the highlighted answer below."
    : isCorrect
      ? review?.correctReason || review?.takeaway || "Your selected answer matches the correct answer."
      : review?.selectedReason || review?.correctReason || "Compare your answer with the highlighted correct answer.";

  return (
    <article className={`result-question ${statusClass}`} id={review?.id || `question-${number}`}>
      <div className="result-question-heading">
        <h2><span className="result-number">{number}</span><span>{question.text}</span></h2>
        {review?.topic && <p className="result-topic">{review.topic}</p>}
      </div>
      <p className="result-status">
        {selected ? (isCorrect ? "Correct - your selected answer is correct." : "Incorrect - your selected answer is not correct.") : "Not answered - the correct answer is highlighted below."}
      </p>
      <div className="result-explanation">
        <strong>{isCorrect ? "Why this is correct" : !selected ? "Why this answer matters" : "Why your answer was wrong"}</strong>
        <p>{explanation}</p>
        {!isCorrect && selected && review?.correctReason && review?.selectedReason && <p><span className="result-explanation-label">Your answer:</span> {review.selectedReason}</p>}
        {!isCorrect && review?.correctReason && <p><span className="result-explanation-label">Correct answer:</span> {review.correctReason}</p>}
        {review?.takeaway && <p><span className="result-explanation-label">Takeaway:</span> {review.takeaway}</p>}
      </div>
      <div className="result-options">
        {question.options.map((option) => {
          const isSelected = option.letter === selected;
          const isAnswer = option.letter === correct;
          return (
            <div className={`result-option ${isAnswer ? "is-correct" : ""} ${isSelected && !isAnswer ? "is-wrong" : ""}`} key={option.letter}>
              <span>{option.text}</span>
              {(isSelected || isAnswer) && <span className="result-option-label">{isSelected && isAnswer ? "Your answer · Correct" : isAnswer ? "Correct answer" : "Your answer"}</span>}
            </div>
          );
        })}
      </div>
    </article>
  );
}
