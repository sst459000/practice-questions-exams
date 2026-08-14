import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ResultsQuestion } from "../components/ResultsQuestion.jsx";

const question = {
  text: "Which answer is correct?",
  options: [
    { letter: "A", text: "First option" },
    { letter: "B", text: "Correct option" },
    { letter: "C", text: "Third option" }
  ]
};

describe("ResultsQuestion", () => {
  it("shows the correct-answer explanation for a correct response", () => {
    render(<ResultsQuestion question={question} number={1} selected="B" correct="B" review={{ takeaway: "Use the best match." }} />);

    expect(screen.getByText("Correct - your selected answer is correct.")).toBeInTheDocument();
    expect(screen.getByText("Why this is correct")).toBeInTheDocument();
    expect(screen.getByText("Correct option").closest(".result-option")).toHaveClass("is-correct");
    expect(screen.getByText((_, element) => element.textContent === "Your answer · Correct")).toBeInTheDocument();
  });

  it("shows the wrong-answer explanation for an incorrect response", () => {
    render(
      <ResultsQuestion
        question={question}
        number={1}
        selected="A"
        correct="B"
        review={{ selectedReason: "This is not the best match.", correctReason: "This is the right answer.", takeaway: "Use the correct concept." }}
      />
    );

    expect(screen.getByText("Incorrect - your selected answer is not correct.")).toBeInTheDocument();
    expect(screen.getByText("Why your answer was wrong")).toBeInTheDocument();
    expect(screen.getAllByText("This is not the best match.").length).toBeGreaterThan(0);
    expect(screen.getAllByText("This is the right answer.").length).toBeGreaterThan(0);
    expect(screen.getByText("First option").closest(".result-option")).toHaveClass("is-wrong");
    expect(screen.getByText("Correct option").closest(".result-option")).toHaveClass("is-correct");
  });

  it("shows the unanswered state", () => {
    render(<ResultsQuestion question={question} number={1} correct="B" review={{ correctReason: "This is the right answer." }} />);

    expect(screen.getByText("Not answered - the correct answer is highlighted below.")).toBeInTheDocument();
    expect(screen.getByText("Why this answer matters")).toBeInTheDocument();
  });
});
