import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage.jsx";

const courses = {
  ctfl: {
    id: "ctfl",
    name: "ISTQB CTFL",
    title: "Certified Tester Foundation Level",
    syllabus: "CTFL v4.0.1",
    bank: [{ questions: [{ id: "q1" }] }],
    exams: { "set-1": { id: "set-1", questions: [{ text: "Question", options: [{ letter: "A" }], correct: "A" }] } }
  }
};

describe("HomePage course hub", () => {
  it("shows progress summaries for a selected course", () => {
    render(<MemoryRouter initialEntries={["/course/ctfl"]}><Routes><Route path="/course/:courseId" element={<HomePage courses={courses} />} /></Routes></MemoryRouter>);
    expect(screen.getByText("0/1 questions attempted")).toBeInTheDocument();
    expect(screen.getByText("0 completed · No completed exams yet")).toBeInTheDocument();
  });
});
