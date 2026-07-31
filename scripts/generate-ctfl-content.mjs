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
await mkdir("public/data/ctfl", { recursive: true });
await writeFile("public/data/ctfl/bank.json", JSON.stringify(bank, null, 2));
await writeFile("public/data/ctfl/practice-answers.json", JSON.stringify(answers, null, 2));
