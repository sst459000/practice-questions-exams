import { mkdir, readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";

async function evaluateBrowserData(path, property) {
  const source = await readFile(path, "utf8");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: path });
  return context.window[property];
}

const bank = await evaluateBrowserData("public/data/bank-data.js", "ISTQB_QUESTION_BANK");
const answers = await evaluateBrowserData("public/data/practice-answers.js", "practiceAnswers");
const exams = JSON.parse(await readFile("public/data/exams.json", "utf8"));
const bankLookup = new Map(bank.flatMap((section) => section.questions).map((question) => [normalizeKey(question.text), question]));

await mkdir("public/data/ctfl", { recursive: true });
await writeFile("public/data/ctfl/bank.json", JSON.stringify(bank, null, 2));
await writeFile("public/data/ctfl/practice-answers.json", JSON.stringify(answers, null, 2));
await writeFile("public/data/exams.json", JSON.stringify(enrichExamSets(exams, bankLookup), null, 2));

function enrichExamSets(examSets, bankLookup) {
  return Object.fromEntries(Object.entries(examSets).map(([setId, exam]) => [
    setId,
    {
      ...exam,
      questions: uniqueBy(exam.questions, (question) => normalizeKey(question.text)).map((question, index) => {
        const source = bankLookup.get(normalizeKey(question.text));
        const optionMap = new Map((source?.options || []).map((option) => [option.letter, option]));
        return {
          ...question,
          id: question.id || `${setId}-${String(index + 1).padStart(2, "0")}`,
          sourceId: question.sourceId || source?.id || "",
          topic: question.topic || source?.topic || "Review",
          takeaway: question.takeaway || source?.takeaway || "",
          options: question.options.map((option) => ({
            ...option,
            reason: option.reason || optionMap.get(option.letter)?.reason || ""
          })),
          correct: question.correct || source?.options?.find((option) => option.correct)?.letter || ""
        };
      })
    }
  ]));
}

function uniqueBy(items, selector) {
  const seen = new Set();
  return items.filter((item) => {
    const key = selector(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizeKey(value) {
  return String(value).trim().replace(/\s+/g, " ").toLowerCase();
}
