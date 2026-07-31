import { describe, expect, it } from "vitest";
import fs from "node:fs";
import ctflBank from "../../public/data/ctfl/bank.json";
import ctflAnswers from "../../public/data/ctfl/practice-answers.json";
import ctaiBank from "../../public/data/ctai/bank.json";
import ctaiExams from "../../public/data/ctai/exams.json";
import { balanceAnswerOptionLengths } from "../utils.js";

const normalize = (value) => String(value).trim().replace(/\s+/g, " ").toLowerCase();

describe("CT-AI course data integrity", () => {
  it("contains approximately 350 bank questions across seven syllabus sections", () => {
    expect(ctaiBank).toHaveLength(7);
    expect(ctaiBank.flatMap((section) => section.questions)).toHaveLength(350);
  });

  it("contains four 40-question exams with unique questions per exam", () => {
    const exams = Object.values(ctaiExams);
    expect(exams).toHaveLength(4);
    exams.forEach((exam) => {
      expect(exam.questions).toHaveLength(40);
      expect(new Set(exam.questions.map((question) => question.text)).size).toBe(40);
      exam.questions.forEach((question) => {
        expect(question.options.filter((option) => option.letter === question.correct)).toHaveLength(1);
      });
    });
    expect(new Set(exams.flatMap((exam) => exam.questions.map((question) => question.text))).size).toBe(160);
    expect(exams.flatMap((exam) => exam.questions).some((question) => question.text.includes("practice variant"))).toBe(false);
  });

  it("keeps CTFL bank content complete and structurally valid", () => {
    const bank = ctflBank;
    expect(bank).toHaveLength(6);
    expect(bank.flatMap((section) => section.questions)).toHaveLength(350);
    expect(new Set(bank.flatMap((section) => section.questions.map((question) => question.id))).size).toBe(350);
    bank.flatMap((section) => section.questions).forEach((question) => {
      expect(question.text).toBeTruthy();
      expect(question.options).toHaveLength(4);
      expect(question.options.filter((option) => option.correct)).toHaveLength(1);
      expect(question.topic).toBeTruthy();
      expect(question.takeaway).toBeTruthy();
    });
  });

  it("has a valid answer key for every CTFL practice question", () => {
    const exams = JSON.parse(fs.readFileSync("public/data/exams.json", "utf8"));
    const answers = ctflAnswers;
    const questions = Object.values(exams).flatMap((exam) => exam.questions);
    expect(questions).toHaveLength(160);
    expect(new Set(questions.map((question) => question.text)).size).toBe(160);
    questions.forEach((question) => {
      const answer = answers[normalize(question.text)];
      expect(answer).toBeTruthy();
      expect(question.options.some((option) => option.letter === answer)).toBe(true);
    });
  });

  it("keeps correct answers from being identifiable by length in both courses", () => {
    const ctflExams = Object.values(JSON.parse(fs.readFileSync("public/data/exams.json", "utf8")));
    const ctflQuestions = [
      ...ctflBank.flatMap((section) => section.questions),
      ...ctflExams.flatMap((exam) => exam.questions).map((question) => ({ ...question, correct: ctflAnswers[normalize(question.text)] }))
    ];
    const ctaiQuestions = [...ctaiBank.flatMap((section) => section.questions), ...Object.values(ctaiExams).flatMap((exam) => exam.questions)];
    [...ctflQuestions, ...ctaiQuestions].forEach((question) => {
      const options = question.options.map((option) => ({ ...option, correct: option.correct ?? option.letter === question.correct }));
      const balanced = balanceAnswerOptionLengths(options);
      const correct = balanced.find((option) => option.correct).text.length;
      const wrongAverage = balanced.filter((option) => !option.correct).reduce((sum, option) => sum + option.text.length, 0) / 3;
      expect(correct).toBeLessThanOrEqual(wrongAverage * 1.25);
    });
  });
});
