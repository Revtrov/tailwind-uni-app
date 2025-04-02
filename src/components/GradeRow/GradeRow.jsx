import { Link } from "react-router-dom";
function GradeRow({ grade }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg mb-4 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-2 text-gray-900 dark:text-white font-semibold w-full">
        <Link
          className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 rounded-full shadow-sm hover:bg-blue-200 transition-all"
          to={"/cohorts/" + grade.cohort.split("cohort/")[1].replace("/", "")}
        >
          {grade.cohort.split("cohort/")[1].replace("/", "")}
        </Link>
        <span className="text-gray-700 mx-2">/</span>
        <Link
          className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 rounded-full shadow-sm hover:bg-blue-200 transition-all"
          to={"/modules/" + grade.module.split("module/")[1].replace("/", "")}
        >
          {grade.module.split("module/")[1].replace("/", "")}
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 text-gray-700 dark:text-gray-300 font-medium w-full mt-4 lg:mt-0">
        <span>Exam: {grade.exam_mark}</span>
        <span>CA: {grade.ca_mark}</span>
        <span>Total: {grade.total_grade.toFixed(1)}</span>
      </div>
      <Link 
        className="px-1 ms-1  bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
        to={"/modules/" + grade.module.split("module/")[1].replace("/", "") + "/grades/?student=" + grade.student.split("student/")[1].replace("/", "")}
      >
        Edit
      </Link>

    </div>

  )
}
export default GradeRow;