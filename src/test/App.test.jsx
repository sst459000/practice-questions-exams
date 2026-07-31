import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App.jsx";

const emptyBank = [];
const emptyExams = {};
const response = (data) => ({ ok: true, json: async () => data });

describe("App content loading", () => {
  it("shows a retry action when content loading fails", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn()
      .mockRejectedValueOnce(new Error("Network unavailable"))
      .mockImplementation((url) => Promise.resolve(response(url.includes("ctfl/bank") ? emptyBank : url.includes("practice-answers") ? {} : url.includes("ctai/bank") ? emptyBank : emptyExams)));
    vi.stubGlobal("fetch", fetchMock);
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByText("Loading practice content…")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Unable to load StudyHub content")).toBeInTheDocument());
    await user.click(screen.getByRole("button", { name: "Retry loading content" }));
    await waitFor(() => expect(screen.getByText("Choose an ISTQB course to open its syllabus-based question bank and practice exams.")).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledTimes(10);
    vi.unstubAllGlobals();
  });
});
