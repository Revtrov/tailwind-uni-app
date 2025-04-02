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
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/5 "></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/6 "></div>
        </div>

        {/* View Degree Button Placeholder */}
        <div className="mt-6 flex justify-between items-center w-full">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-64"></div>
        </div>

        {/* Student Cards Grid Placeholder */}
        <div className="mt-6 flex justify-center items-center w-full">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-64"></div>
          </div>
        
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
  const { id } = useParams();
  const [cohort, setCohort] = useState();
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    document.title = "Cohort - " + id
    const fetchCohort = async () => {
      const response = await fetch("/api/cohort/" + id);
      const data = await response.json()
      const studentResponse = await fetch("/api/student/?cohort=" + id);
      const studentData = await studentResponse.json()
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
        <h2 className="text-3xl text-white sm:text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100">{cohort.name}</h2>

        <div className="mt-3 space-y-1 text-lg">
          <p><span className="text-white font-semibold text-gray-800 dark:text-gray-300">ID:</span> {cohort.id}</p>
          <p><span className="text-white font-semibold text-gray-800 dark:text-gray-300">Year:</span> {cohort.year}</p>
        </div>

        {/* View Degree Button */}
        <div className="mt-6 flex justify-between items-center w-full">
          <Link
            to={"/degrees/" + cohort.degree.split("/").slice(-2, -1)}
            className="px-6 py-3 bg-white text-blue-600 dark:bg-blue-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-blue-600 transition transform hover:scale-105">
            View Degree
          </Link>
          <Link
            to={"/modules/?delivered_to=" + cohort.id}
            className="px-6 py-3 bg-white text-blue-600 dark:bg-blue-700 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-blue-600 transition transform hover:scale-105">
            View Modules Delivered To This Cohort
          </Link>
        </div>

        {/* Student Cards Grid */}
        <h3 className="text-lg text-white font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center pt-3">
          All Students
        </h3>
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