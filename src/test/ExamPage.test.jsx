import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout.jsx";
import { ExamPage } from "../pages/ExamPage.jsx";

const exams = {
  "set-1": {
    id: "set-1",
    title: "Practice Exam 1",
    questions: [
      { text: "First question", options: [{ letter: "A", text: "First answer" }, { letter: "B", text: "Second answer" }] },
      { text: "Second question", options: [{ letter: "A", text: "Another answer" }, { letter: "B", text: "Best answer" }] }
    ]
  }
};

function renderExam(initialEntry = "/course/ctfl/exam/set-1") {
  const courses = { ctfl: { id: "ctfl", name: "ISTQB CTFL", exams } };
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route element={<Layout courses={courses} />}>
          <Route path="/course/:courseId/exam/:setId" element={<ExamPage courses={courses} />} />
          <Route path="/course/:courseId/results/:setId" element={<p>Results route</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("ExamPage", () => {
  beforeEach(() => {
    window.practiceAnswers = {
      "first question": "A",
      "second question": "B"
    };
  });

  it("saves a selected answer and lets the user move between questions", async () => {
    const user = userEvent.setup();
    renderExam();
    await user.click(screen.getByLabelText("First answer"));
    expect(JSON.parse(localStorage.getItem("istqb-ctfl-set-1"))).toEqual({ "first question": "A" });
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Second question")).toBeInTheDocument();
  });

  it("opens the mobile menu and exposes navigation plus question tiles", async () => {
    const user = userEvent.setup();
    renderExam();
    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Question Bank" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Practice Exams" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Questions" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "2" })).toHaveLength(2);
  });

  it("stores a result snapshot and navigates after confirmed submission", async () => {
    const user = userEvent.setup();
    renderExam();
    await user.click(screen.getByRole("button", { name: "Submit exam" }));
    const dialogSubmit = screen.getAllByRole("button", { name: "Submit anyway" })[0];
    await user.click(dialogSubmit);
    expect(JSON.parse(localStorage.getItem("istqb-ctfl-set-1-results")).set.id).toBe("set-1");
    expect(screen.getByText("Results route")).toBeInTheDocument();
  });

  it("starts a clean attempt from the results action", () => {
    localStorage.setItem("istqb-ctfl-set-1", JSON.stringify({ "first question": "A" }));
    renderExam("/course/ctfl/exam/set-1?attempt=new");
    expect(screen.getByText("0/2 answered")).toBeInTheDocument();
    expect(screen.getByLabelText("First answer")).not.toBeChecked();
    expect(localStorage.getItem("istqb-ctfl-set-1")).toBeNull();
  });
});
