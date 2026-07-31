import { Link, useParams } from "react-router-dom";
import { normalizeKey, readStorage } from "../utils.js";

export function HomePage({ courses }) {
  const { courseId } = useParams();
  const selectedCourse = courseId ? courses[courseId] : null;

  if (courseId && !selectedCourse) {
    return <main className="empty-state"><h1>Course not found</h1><p>Return home and choose an available course.</p><Link className="button-link" to="/">Back to home</Link></main>;
  }

  if (selectedCourse) {
    const bankQuestions = selectedCourse.bank.flatMap((section) => section.questions);
    const bankProgressData = readStorage(`istqb-${selectedCourse.id}-question-bank`, {});
    const bankProgress = bankQuestions.filter((question) => bankProgressData[question.id]).length;
    const examResults = Object.values(selectedCourse.exams).map((exam) => readStorage(`istqb-${selectedCourse.id}-${exam.id}-results`, null)).filter(Boolean);
    const bestScore = examResults.reduce((best, result) => {
      const correct = result.set.questions.filter((question) => result.selections?.[normalizeKey(question.text)] === (result.answers?.[normalizeKey(question.text)] || question.correct || question.answer)).length;
      return Math.max(best, result.set.questions.length ? Math.round((correct / result.set.questions.length) * 100) : 0);
    }, 0);
    return (
      <main>
        <p className="notice"><strong>{selectedCourse.name}</strong> · {selectedCourse.title} · {selectedCourse.syllabus}</p>
        <div className="set-grid">
          <Link className="set-link" to={`/course/${selectedCourse.id}/bank`}><strong>Question Bank</strong><span>Section-based learning with instant feedback and explanations</span><small>{bankProgress}/{bankQuestions.length} questions attempted</small></Link>
          <Link className="set-link" to={`/course/${selectedCourse.id}/exams`}><strong>Practice Exams</strong><span>Answer-free mock exams with full results after submission</span><small>{examResults.length} completed · {examResults.length ? `Best score ${bestScore}%` : "No completed exams yet"}</small></Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <p className="notice">Choose an ISTQB course to open its syllabus-based question bank and practice exams.</p>
      <div className="set-grid">
        {Object.values(courses).map((course) => <Link className="set-link" to={`/course/${course.id}`} key={course.id}><strong>{course.name}</strong><span>{course.title} · {course.syllabus}</span></Link>)}
      </div>
    </main>
  );
}
