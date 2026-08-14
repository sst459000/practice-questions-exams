import { describe, expect, it, beforeEach, vi } from "vitest";
import { balanceAnswerOptionLengths, buildExamReview, normalizeKey, prepareCourseContent, readStorage, removeStorage, shuffle, writeStorage } from "../utils.js";

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

  it("assigns stable ids and bank source ids to prepared practice exam questions", () => {
    const prepared = prepareCourseContent({
      id: "ctfl",
      name: "ISTQB CTFL",
      title: "Certified Tester Foundation Level",
      syllabus: "CTFL v4.0.1",
      bank: [
        {
          id: "chapter-1",
          title: "Chapter 1",
          subtitle: "",
          questions: [{ text: "Shared question", topic: "Topic A", takeaway: "Takeaway A", options: [{ letter: "A", text: "Correct A", correct: true }, { letter: "B", text: "Wrong B" }, { letter: "C", text: "Wrong C" }, { letter: "D", text: "Wrong D" }] }]
        }
      ],
      exams: {
        "set-1": {
          id: "set-1",
          title: "Practice Exam 1",
          questions: [{ text: "Shared question", options: [{ letter: "A", text: "Correct A" }, { letter: "B", text: "Wrong B" }, { letter: "C", text: "Wrong C" }, { letter: "D", text: "Wrong D" }] }]
        }
      }
    });

    const question = prepared.exams["set-1"].questions[0];
    expect(question.id).toBe("ctfl-set-1-01");
    expect(question.sourceId).toBe("ctfl-bank-chapter-1-01");
  });

  it("builds review metadata from a source id when question text is duplicated", () => {
    const review = buildExamReview({
      set: {
        id: "set-1",
        questions: [{ id: "ctfl-set-1-01", sourceId: "bank-b", text: "Shared stem", options: [{ letter: "A", text: "Answer A" }, { letter: "B", text: "Answer B" }] }]
      },
      selections: { "shared stem": "A" },
      answers: { "shared stem": "A" },
      bank: [
        {
          id: "sec-1",
          title: "Section 1",
          questions: [{ id: "bank-a", text: "Shared stem", topic: "Topic A", takeaway: "Takeaway A", options: [{ letter: "A", text: "Answer A", correct: true }, { letter: "B", text: "Answer B", correct: false }] }]
        },
        {
          id: "sec-2",
          title: "Section 2",
          questions: [{ id: "bank-b", text: "Shared stem", topic: "Topic B", takeaway: "Takeaway B", options: [{ letter: "A", text: "Answer A", correct: false }, { letter: "B", text: "Answer B", correct: true }] }]
        }
      ]
    });

    expect(review).toHaveLength(1);
    expect(review[0].sourceId).toBe("bank-b");
    expect(review[0].topic).toBe("Topic B");
  });
});
