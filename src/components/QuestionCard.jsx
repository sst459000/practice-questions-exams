export function QuestionCard({ question, number, selected, onSelect, onClear, feedback }) {
  return (
    <article className="question">
      <h2 className="question-title"><span className="number">{number}</span><span>{question.text}</span></h2>
      <div className="options">
        {question.options.map((option) => (
          <label className="option" key={option.letter}>
            <input type="radio" name={`question-${question.id || number}`} value={option.letter} checked={selected === option.letter} onChange={() => onSelect(option.letter)} />
            <span>{option.text}</span>
          </label>
        ))}
      </div>
      {onClear && <div className="question-tools"><button type="button" className="secondary" disabled={!selected} onClick={onClear}>Clear answer</button></div>}
      {feedback}
    </article>
  );
}
