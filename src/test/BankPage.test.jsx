import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { BankPage } from "../pages/BankPage.jsx";
import { BankNavigationProvider } from "../context/BankNavigationContext.jsx";

const bank = [{
  id: "fundamentals",
  title: "Fundamentals",
  subtitle: "Core concepts",
  questions: [{
    id: "q1",
    text: "What is testing?",
    topic: "Testing",
    takeaway: "Testing provides information.",
    options: [
      { letter: "A", text: "Finding information", correct: true, reason: "This is the correct concept." },
      { letter: "B", text: "Guessing", correct: false, reason: "This is not testing." }
    ]
  }]
}];

describe("BankPage", () => {
  beforeEach(() => {
    window.ISTQB_QUESTION_BANK = bank;
  });

  function renderBank() {
    const courses = { ctai: { id: "ctai", name: "ISTQB CT-AI", bank } };
    return render(<MemoryRouter initialEntries={["/course/ctai/bank"]}><BankNavigationProvider value={{ activeSectionId: bank[0].id, setActiveSectionId: vi.fn() }}><Routes><Route path="/course/:courseId/bank" element={<BankPage courses={courses} />} /></Routes></BankNavigationProvider></MemoryRouter>);
  }

  it("shows immediate feedback after selecting an answer", async () => {
    const user = userEvent.setup();
    renderBank();
    expect(screen.getByText(/official ISTQB CT-AI v2.0 syllabus/)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Finding information" })).toBeInTheDocument();
    await user.click(screen.getByRole("radio", { name: "Finding information" }));
    expect(screen.getByRole("button", { name: "Check answer" })).toBeInTheDocument();
    expect(screen.queryByText("Correct")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(screen.getByText("Testing provides information.")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("istqb-ctai-question-bank"))).toEqual({ q1: "A" });
  });

  it("allows changing the choice before confirming it", async () => {
    const user = userEvent.setup();
    renderBank();
    await user.click(screen.getByRole("radio", { name: "Guessing" }));
    await user.click(screen.getByRole("radio", { name: "Finding information" }));
    await user.click(screen.getByRole("button", { name: "Check answer" }));
    expect(screen.getByText("Correct")).toBeInTheDocument();
  });

  it("preserves an unconfirmed choice after the page is remounted", async () => {
    const user = userEvent.setup();
    const view = renderBank();
    await user.click(screen.getByRole("radio", { name: "Guessing" }));
    view.unmount();
    renderBank();
    expect(screen.getByRole("radio", { name: "Guessing" })).toBeChecked();
    expect(screen.getByRole("button", { name: "Check answer" })).toBeInTheDocument();
  });

  it("clears the current section after confirmation", async () => {
    const user = userEvent.setup();
    renderBank();
    await user.click(screen.getByRole("radio", { name: "Finding information" }));
    await user.click(screen.getAllByRole("button", { name: "Reset section" })[0]);
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Reset section", exact: true }));
    expect(JSON.parse(localStorage.getItem("istqb-ctai-question-bank"))).toEqual({});
  });
});
