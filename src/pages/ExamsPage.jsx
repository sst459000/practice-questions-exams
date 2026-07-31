import { Link, useParams } from "react-router-dom";

export function ExamsPage({ courses }) {
  const { courseId } = useParams();
  const course = courses[courseId];
  if (!course) return <main className="empty-state"><h1>Course not found</h1></main>;
  return (
    <main>
      <p className="notice"><strong>{course.name}</strong> · {course.title} ({course.syllabus}). Your choices are saved in this browser, and a full results page appears after submission.</p>
      <div className="set-grid">
        {Object.values(course.exams).map((exam) => (
          <Link className="set-link" to={`/course/${courseId}/exam/${exam.id}`} key={exam.id}>
            <strong>{exam.title}</strong><span>{exam.questions.length} questions</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
