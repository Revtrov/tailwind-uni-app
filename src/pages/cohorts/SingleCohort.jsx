import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentCard from "../../components/StudentCard/StudentCard"
import LoadingStudentCard from "../../components/StudentCard/LoadingStudentCard"
function LoadingSingleCohort() {
  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4 py-6 min-h-[92vh]">
      <div className="w-full max-w-5xl p-[2.5vmin] rounded-lg shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white animate-pulse">

        {/* Cohort Details Placeholder */}
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mx-auto mb-4"></div>
        <div className="mt-3 space-y-1 text-lg">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
        </div>

        {/* View Degree Button Placeholder */}
        <div className="mt-6 flex justify-center">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32 mx-auto"></div>
        </div>

        {/* Student Cards Grid Placeholder */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-sm overflow-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {Array.from({ length: 16 }).map((_, index) => (
            <LoadingStudentCard key={index} index={index} />
          ))}
        </div>

      </div>
    </div>

  )
}
function SingleCohort() {
  let { id } = useParams();
  const [cohort, setCohort] = useState();
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchCohort = async () => {
      const response = await fetch("/api/cohort/" + id);
      const data = await response.json()
      const studentResponse = await fetch("/api/student/?cohort=" + id);
      const studentData = await studentResponse.json()
      document.title = "Cohort -" + id
      setCohort(data);
      setStudents(studentData)
      setLoading(false)
    }
    fetchCohort()
  }, [id])
  if (loading) return (
    <LoadingSingleCohort />
  );

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-800 px-4 py-6 min-h-[92vh]">
  <div className="w-full max-w-5xl p-[2.5vmin] rounded-lg shadow-xl bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-950 dark:to-gray-700 text-white">

    {/* Cohort Details */}
    <h2 className="text-3xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100">{cohort.name}</h2>

    <div className="mt-3 space-y-1 text-lg">
      <p><span className="font-semibold text-gray-800 dark:text-gray-300">ID:</span> {cohort.id}</p>
      <p><span className="font-semibold text-gray-800 dark:text-gray-300">Year:</span> {cohort.year}</p>
    </div>

    {/* View Degree Button */}
    <div className="mt-6 flex justify-between items-center w-full">
      <Link
        to={"/degrees/" + cohort.degree.split("/").slice(-2, -1)}
        className="px-6 py-3 bg-white text-blue-600 dark:bg-blue-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-blue-600 transition transform hover:scale-105">
        View Degree
      </Link>
      <Link
        // to={"/modules/" + cohort.degree.split("/").slice(-2, -1)}
        className="px-6 py-3 bg-white text-blue-600 dark:bg-blue-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-blue-600 transition transform hover:scale-105">
        View Modules Delivered
      </Link>
    </div>

    {/* Student Cards Grid */}
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-sm overflow-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        {students.map((student) => (
          <StudentCard key={student.student_id} student={student} />
        ))}
    </div>

  </div>
</div>


  )
}
export default SingleCohort