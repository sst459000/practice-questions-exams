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
  it("marks a correct selection and highlights the correct option", () => {
    render(<ResultsQuestion question={question} number={1} selected="B" correct="B" />);
    expect(screen.getByText("Correct — your selected answer is correct.")).toBeInTheDocument();
    expect(screen.getByText("Correct option").closest(".result-option")).toHaveClass("is-correct");
    expect(screen.getByText("Your answer · Correct")).toBeInTheDocument();
  });

  it("marks an incorrect selection and identifies both answer states", () => {
    render(<ResultsQuestion question={question} number={1} selected="A" correct="B" />);
    expect(screen.getByText("Incorrect — your selected answer is not correct.")).toBeInTheDocument();
    expect(screen.getByText("First option").closest(".result-option")).toHaveClass("is-wrong");
    expect(screen.getByText("Correct option").closest(".result-option")).toHaveClass("is-correct");
  });

  it("handles unanswered questions", () => {
    render(<ResultsQuestion question={question} number={1} correct="B" />);
    expect(screen.getByText("Not answered — the correct answer is highlighted below.")).toBeInTheDocument();
  });
});
