import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmDialog } from "../components/ConfirmDialog.jsx";

describe("ConfirmDialog", () => {
  it("focuses the dialog and supports Escape", async () => {
    const user = userEvent.setup();
    const cancel = vi.fn();
    render(<ConfirmDialog open title="Confirm" message="Are you sure?" acceptLabel="Yes" onCancel={cancel} onAccept={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(cancel).toHaveBeenCalledOnce();
  });
});
