import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ResultsPage } from "../pages/ResultsPage.jsx";

const result = {
  set: {
    id: "set-1",
    questions: [
      { text: "First question", options: [{ letter: "A", text: "Correct" }, { letter: "B", text: "Wrong" }] },
      { text: "Second question", options: [{ letter: "A", text: "Wrong" }, { letter: "B", text: "Correct" }] }
    ]
  },
  selections: { "first question": "A", "second question": "A" },
  answers: { "first question": "A", "second question": "B" }
};

describe("ResultsPage", () => {
  beforeEach(() => localStorage.setItem("istqb-ctfl-set-1-results", JSON.stringify(result)));

  it("shows the score and every question in one results view", () => {
    render(<MemoryRouter initialEntries={["/course/ctfl/results/set-1"]}><Routes><Route path="/course/:courseId/results/:setId" element={<ResultsPage />} /></Routes></MemoryRouter>);
    expect(screen.getByText("1/2")).toBeInTheDocument();
    expect(screen.getByText("First question")).toBeInTheDocument();
    expect(screen.getByText("Second question")).toBeInTheDocument();
    expect(screen.getByText("Correct — your selected answer is correct.")).toBeInTheDocument();
    expect(screen.getByText("Incorrect — your selected answer is not correct.")).toBeInTheDocument();
  });

  it("handles missing submitted results safely", () => {
    localStorage.clear();
    render(<MemoryRouter initialEntries={["/course/ctfl/results/set-1"]}><Routes><Route path="/course/:courseId/results/:setId" element={<ResultsPage />} /></Routes></MemoryRouter>);
    expect(screen.getByText("Results unavailable")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to practice exams" })).toBeInTheDocument();
  });
});
