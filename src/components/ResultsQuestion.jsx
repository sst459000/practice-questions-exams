export function ResultsQuestion({ question, number, selected, correct }) {
  const isCorrect = Boolean(selected && correct && selected === correct);
  const statusClass = !selected ? "result-unanswered" : isCorrect ? "result-correct" : "result-incorrect";
  return (
    <article className={`result-question ${statusClass}`}>
      <h2><span className="result-number">{number}</span><span>{question.text}</span></h2>
      <p className="result-status">
        {selected ? (isCorrect ? "Correct — your selected answer is correct." : "Incorrect — your selected answer is not correct.") : "Not answered — the correct answer is highlighted below."}
      </p>
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
