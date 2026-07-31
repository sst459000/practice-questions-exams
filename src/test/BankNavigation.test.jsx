import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import { BankPage } from "../pages/BankPage.jsx";

const bank = [
  { id: "one", title: "1. First section", subtitle: "First", questions: [{ id: "q1", text: "First section question", topic: "First", takeaway: "First", options: [{ letter: "A", text: "Correct", correct: true }, { letter: "B", text: "Wrong", correct: false }] }] },
  { id: "two", title: "2. Second section", subtitle: "Second", questions: [{ id: "q2", text: "Second section question", topic: "Second", takeaway: "Second", options: [{ letter: "A", text: "Correct", correct: true }, { letter: "B", text: "Wrong", correct: false }] }] }
];

describe("mobile Question Bank navigation", () => {
  it("exposes sections in the shared hamburger menu and switches content", async () => {
    const user = userEvent.setup();
    const courses = { ctai: { id: "ctai", name: "ISTQB CT-AI", title: "AI Testing", syllabus: "CT-AI v2.0", bank, exams: {} } };
    render(<MemoryRouter initialEntries={["/course/ctai/bank"]}><Routes><Route element={<Layout courses={courses} />}><Route path="/course/:courseId/bank" element={<BankPage courses={courses} />} /></Route></Routes></MemoryRouter>);
    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.getAllByRole("heading", { name: "Sections" })).toHaveLength(2);
    const secondSectionButtons = screen.getAllByRole("button", { name: /2\. Second section/ });
    await user.click(secondSectionButtons[0]);
    expect(screen.getByText("Second section question")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open navigation menu" })).toBeInTheDocument();
  });
});
