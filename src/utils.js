/** Normalize question text for stable answer-key and storage lookups. */
export function normalizeKey(value) {
  return String(value).trim().replace(/\s+/g, " ").toLowerCase();
}

/** Read JSON storage defensively so corrupted browser data does not break the app. */
export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (_error) {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (_error) {
    return false;
  }
}

/** Remove browser storage safely when storage is unavailable or restricted. */
export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (_error) {
    return false;
  }
}

export function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

/**
 * Reduces answer-length clues without changing the answer key or meaning.
 * Short distractors receive a brief context phrase only when the correct
 * answer would otherwise be noticeably longer than the other choices.
 */
export function balanceAnswerOptionLengths(options) {
  const correct = options.find((option) => option.correct);
  if (!correct) return options;
  const averageWrongLength = options.filter((option) => !option.correct).reduce((total, option) => total + option.text.length, 0) / Math.max(options.length - 1, 1);
  if (correct.text.length <= averageWrongLength * 1.25) return options;
  const phrases = [" in this context", " for the stated situation", " when applied in practice"];
  return options.map((option, index) => {
    if (option.correct || option.text.length >= correct.text.length * 0.78) return option;
    let text = option.text;
    let phraseIndex = index;
    while (text.length < correct.text.length * 0.78 && phraseIndex < index + phrases.length * 3) {
      text += phrases[phraseIndex % phrases.length];
      phraseIndex += 1;
    }
    return { ...option, text };
  });
}

export function prepareCourseContent(course, answerKey = {}) {
  const prepareQuestions = (questions) => questions.map((question) => {
    const correctLetter = question.correct || answerKey[normalizeKey(question.text)];
    const options = question.options.map((option) => ({ ...option, correct: option.correct ?? option.letter === correctLetter }));
    return { ...question, options: balanceAnswerOptionLengths(options) };
  });
  return {
    ...course,
    bank: course.bank.map((section) => ({ ...section, questions: prepareQuestions(section.questions) })),
    exams: Object.fromEntries(Object.entries(course.exams).map(([id, exam]) => [id, { ...exam, questions: prepareQuestions(exam.questions) }]))
  };
}
