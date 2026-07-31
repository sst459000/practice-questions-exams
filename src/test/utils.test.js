import { describe, expect, it, beforeEach, vi } from "vitest";
import { balanceAnswerOptionLengths, normalizeKey, readStorage, removeStorage, shuffle, writeStorage } from "../utils.js";

describe("utility helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("normalizes whitespace and case for stable question keys", () => {
    expect(normalizeKey("  Which   Answer? ")).toBe("which answer?");
  });

  it("round-trips JSON values through localStorage", () => {
    writeStorage("progress", { answer: "B" });
    expect(readStorage("progress", {})).toEqual({ answer: "B" });
  });

  it("returns the fallback when stored JSON is invalid", () => {
    localStorage.setItem("broken", "not-json");
    expect(readStorage("broken", { safe: true })).toEqual({ safe: true });
  });

  it("removes stored values safely", () => {
    writeStorage("remove-me", { value: true });
    expect(removeStorage("remove-me")).toBe(true);
    expect(readStorage("remove-me", null)).toBeNull();
  });

  it("shuffles without changing the item collection", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(shuffle(["A", "B", "C"])).toHaveLength(3);
    expect(shuffle(["A", "B", "C"])).toEqual(expect.arrayContaining(["A", "B", "C"]));
  });

  it("reduces answer-length clues without changing option order or correctness", () => {
    const options = [{ letter: "A", text: "A much longer correct explanation", correct: true }, { letter: "B", text: "No", correct: false }, { letter: "C", text: "No", correct: false }, { letter: "D", text: "No", correct: false }];
    const balanced = balanceAnswerOptionLengths(options);
    expect(balanced.map((option) => option.letter)).toEqual(["A", "B", "C", "D"]);
    expect(balanced.filter((option) => option.correct)).toHaveLength(1);
    expect(balanced[1].text).not.toBe("No");
  });
});
