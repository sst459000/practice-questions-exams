import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuestionNavigation } from "../components/QuestionNavigation.jsx";

describe("QuestionNavigation", () => {
  it("disables Previous on the first question and Next on the last", () => {
    const { rerender } = render(<QuestionNavigation index={0} total={3} onPrevious={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();

    rerender(<QuestionNavigation index={2} total={3} onPrevious={vi.fn()} onNext={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("calls the correct navigation callback", async () => {
    const user = userEvent.setup();
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    render(<QuestionNavigation index={1} total={3} onPrevious={onPrevious} onNext={onNext} />);
    await user.click(screen.getByRole("button", { name: "Previous" }));
    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(onPrevious).toHaveBeenCalledOnce();
    expect(onNext).toHaveBeenCalledOnce();
  });
});
