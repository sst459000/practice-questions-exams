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
  answers: { "first question": "A", "second question": "B" },
  review: [
    {
      id: "set-1-question-1",
      number: 1,
      text: "First question",
      topic: "Topic alpha",
      selected: "A",
      correct: "A",
      correctReason: "This answer is correct.",
      takeaway: "Keep this in mind.",
      options: [{ letter: "A", text: "Correct" }, { letter: "B", text: "Wrong" }]
    },
    {
      id: "set-1-question-2",
      number: 2,
      text: "Second question",
      topic: "Topic beta",
      selected: "A",
      correct: "B",
      selectedReason: "This choice misses the point.",
      correctReason: "This is the right answer.",
      takeaway: "Review the topic.",
      options: [{ letter: "A", text: "Wrong" }, { letter: "B", text: "Correct" }]
    }
  ]
};

describe("ResultsPage", () => {
  beforeEach(() => localStorage.setItem("istqb-ctfl-set-1-results", JSON.stringify(result)));

  it("shows the score, topic review summary, and every question in one results view", () => {
    render(
      <MemoryRouter initialEntries={["/course/ctfl/results/set-1"]}>
        <Routes>
          <Route path="/course/:courseId/results/:setId" element={<ResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("1/2")).toBeInTheDocument();
    expect(screen.getAllByText("Topic alpha").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Topic beta").length).toBeGreaterThan(0);
    expect(screen.getByText("First question")).toBeInTheDocument();
    expect(screen.getByText("Second question")).toBeInTheDocument();
    expect(screen.getByText("Why this is correct")).toBeInTheDocument();
    expect(screen.getByText("Why your answer was wrong")).toBeInTheDocument();
  });

  it("handles missing submitted results safely", () => {
    localStorage.clear();
    render(
      <MemoryRouter initialEntries={["/course/ctfl/results/set-1"]}>
        <Routes>
          <Route path="/course/:courseId/results/:setId" element={<ResultsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Results unavailable")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to practice exams" })).toBeInTheDocument();
  });
});
