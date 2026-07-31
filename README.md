# StudyHub

StudyHub is a unified React/Vite application for multiple ISTQB certification courses. It currently includes CTFL and CT-AI content while sharing one application shell, responsive design system, persistence layer, and test suite.

## Features

- Home page with course selection
- Section-based Question Bank with instant explanations for each course
- Editable Question Bank answers with an explicit “Check answer” step
- Radio-button answer selection is consistent across Question Bank and Practice Exams
- CTFL practice exams and CT-AI practice exams
- Local answer persistence using `localStorage`
- Submit confirmation and reset confirmation dialogs
- Full-page results view with score, selected answers, and correct answers
- Fresh exam attempts from the results page
- Course-hub progress summaries and a friendly not-found page
- Green correct-answer and red incorrect-answer states
- Responsive layout for desktop, tablet, and mobile screens
- Accessible keyboard-operable navigation and confirmation dialogs
- Answer choices are presentation-balanced to reduce answer-length pattern clues

## Tech stack

- React
- React Router
- Vite
- Plain CSS using the visual language from the original project

Tailwind is not required; the project keeps the existing custom styling to avoid adding an unnecessary styling dependency.

## Setup

Requirements:

- Node.js 20.19+ or Node.js 22.12+
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

Create a production build with:

```bash
npm run build
npm run preview
```

Run the unit tests with:

```bash
npm test
```

Use watch mode while developing:

```bash
npm run test:watch
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/App.jsx` | Course data loading and route configuration |
| `src/main.jsx` | React entry point |
| `src/components/` | Shared layout, question, navigation, dialog, and result components |
| `src/pages/` | Home, bank, exam, exam-list, and results pages |
| `src/utils.js` | Storage, normalization, and shuffle helpers |
| `src/app.css` | Shared and responsive application styles |
| `src/test/` | Vitest and React Testing Library unit tests |
| `public/data/exams.json` | CTFL practice exam content |
| `public/data/ctfl/bank.json` | CTFL question-bank content loaded by the app |
| `public/data/ctfl/practice-answers.json` | CTFL practice-exam answer key loaded by the app |
| `public/data/ctai/bank.json` | CT-AI v2.0 syllabus-based question bank |
| `public/data/ctai/exams.json` | CT-AI practice exams |

CT-AI content is generated reproducibly from the syllabus-aligned concepts in `scripts/generate-ctai-content.mjs`:

```bash
npm run generate:ctai
```

Regenerate the CTFL JSON catalogs after changing the maintained CTFL source files:

```bash
npm run generate:ctfl
```

## Courses and routes

- `/` — course selection
- `/course/ctfl/bank` — CTFL Question Bank
- `/course/ctfl/exams` — CTFL Practice Exams
- `/course/ctai/bank` — CT-AI Question Bank
- `/course/ctai/exams` — CT-AI Practice Exams

The shared pages receive a course configuration and load course-specific JSON data through the same fetch-based loading path. This keeps components, styling, storage helpers, and tests reusable without mixing answer data between courses.

Both course catalogs are validated in automated tests. CTFL and CT-AI each contain 350 question-bank questions, and each has four 40-question practice exams with unique questions and complete answer coverage.

## Data maintenance

The maintained CTFL source files remain in `public/data/bank-data.js` and `public/data/practice-answers.js`; run `npm run generate:ctfl` to produce the JSON catalogs consumed by the app. CTFL practice exam content is in `public/data/exams.json`. CT-AI content is stored separately under `public/data/ctai/`.

The CTFL bank follows the six chapter structure of the [official CTFL v4.0 syllabus](https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/). The CT-AI bank is based on the official ISTQB Certified Tester AI Testing syllabus v2.0, covering AI foundations, AI quality characteristics, machine learning, testing AI-based systems, input data testing, model testing, and ML development testing. The official source is [ISTQB CT-AI v2.0](https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/).

The CTFL and CT-AI questions are original practice questions aligned to syllabus concepts; they are not official ISTQB exam questions or official sample questions. Content should be reviewed against the current syllabus before use as a formal training resource.

Question wording is intentionally varied and written as original practice content. At runtime, both Question Bank and Practice Exam choices use the same answer-presentation balancing helper so a noticeably longer correct answer is not used as a predictable clue. This does not replace expert review of question quality.

Practice answer keys use normalized question text as their lookup key. If a practice question's text changes, update its matching answer-key entry as well.

## Storage keys

- `istqb-ctfl-question-bank` — CTFL Question Bank progress
- `istqb-ctai-question-bank` — CT-AI Question Bank progress
- `istqb-{course}-set-N` — in-progress exam answers
- `istqb-{course}-set-N-results` — submitted exam snapshot
- `istqb-{course}-set-N-submitted` — submission state

All progress is browser-local. There is no backend or account synchronization.

## Validation checklist

1. Run `npm test`.
2. Run `npm run build`.
3. Test Home, Question Bank, Practice Exams, and Results routes.
4. Reload after answering questions and confirm persistence.
5. Submit with correct, incorrect, and unanswered questions.
6. Test reset actions.
7. Test at a mobile viewport and with keyboard navigation.

## Test coverage

The test suite covers the highest-risk reusable and interactive behavior:

- question-key normalization;
- localStorage round trips and malformed-storage fallback;
- shuffle collection integrity;
- Previous/Next button state and callbacks; and
- correct, incorrect, and unanswered result rendering;
- exam answer selection and persistence;
- exam submission and result-snapshot creation;
- mobile navigation and question-tile visibility; and
- Question Bank feedback and reset behavior; and
- CT-AI question-count, exam-count, uniqueness, and answer-integrity checks.
- CTFL question-bank structure, question metadata, exam uniqueness, and answer-key integrity checks.
- Full results-page score and question rendering, including missing-result handling.
- Confirmation-dialog focus and keyboard behavior.
- editable Question Bank answers and explicit answer confirmation;
- fresh exam attempts and progress summaries;
- missing-results navigation and answer-length balancing.

When adding a new scoring rule, storage rule, or reusable component, add or update a focused test in `src/test/`.
