import { useEffect, useState, } from "react";
import { useParams, Link } from "react-router-dom";
import ModuleCard from "../../components/ModuleCard/ModuleCard";
import LoadingModuleCard from "../../components/ModuleCard/LoadingModuleCard";
import GradeRow from "../../components/GradeRow/GradeRow";
import LoadingGradeRow from "../../components/GradeRow/LoadingGradeRow";

function LoadingSingleStudent() {
  return (
    <div className="flex justify-center items-center h-[50%] bg-gray-100 dark:bg-gray-900 px-4 py-6">
  <div className="max-w-6xl w-full bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 flex flex-col items-start text-center overflow-hidden">
    <div className="flex flex-col md:flex-row gap-6 w-full items-center">
      {/* Loading Profile */}
      <div className="w-full md:w-1/2 h-[30vh] bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex items-center gap-6 animate-pulse">
        <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-lg" />

        {/* Loading Cohort & Email */}
        <div className="flex-1 flex justify-center items-center p-6 rounded-lg">
          <div className="flex flex-col items-center text-center w-full text-gray-700 dark:text-gray-300 space-y-3">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 w-full animate-pulse rounded" />
            <div className="h-4 bg-gray-300 dark:bg-gray-600 w-full animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Loading Grades */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 max-h-[30vh] overflow-y-auto animate-pulse">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Grades</h3>
        {[...Array(5)].map((_, index) => (
          <LoadingGradeRow key={index} />
        ))}
      </div>
    </div>

    {/* Loading Modules */}
    <div className="mt-6 w-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Modules</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <LoadingModuleCard key={index} />
        ))}
      </div>
    </div>
  </div>
</div>

  );
}
function SingleStudent() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState();
  const [modules, setModules] = useState([])
  const [grades, setGrades] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/student/" + id)
      const data = await response.json()
      const moduleResponse = await fetch("/api/module/?delivered_to=" + data.cohort.split("cohort/")[1].replace("/", ""))
      const moduleData = await moduleResponse.json()
      const gradesResponse = await fetch("/api/grade/?student=" + id)
      const gradesData = await gradesResponse.json()
      document.title = "Student - " + id
      setStudent(data);
      setModules(moduleData)
      setGrades(gradesData)
      setLoading(false)
    }
    fetchData()
  }, [id])
  
  const handleDelete = async (code) => {
    console.log(`Attempting to delete module with code: ${code}`); // Debugging line  
    try {
      const response = await fetch(`/api/module/${code}/`, { method: "DELETE" });
      console.log("Delete response:", response); // Debugging line
      if (!response.ok) throw new Error("Failed to delete module.");
  
      setModules((prevModules) => prevModules.filter((module) => module.code !== code));
    } catch (err) {
      console.error("Error deleting module:", err);
      alert("Error deleting module. Please try again.");
    }
  };
  
  
  
  if (loading) return <LoadingSingleStudent />;
  return (
    <div className="flex justify-center items-center h-[50%] bg-gray-100 dark:bg-gray-900 px-4 py-6">
      <div className="max-w-6xl w-full bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 flex flex-col items-start text-center">
        <div className="flex flex-col md:flex-row gap-6 w-full items-center overflow-hidden">
          {/* Profile */}
          <div className="w-full md:w-1/2 bg-white h-[30vh] dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex items-center gap-6">
            <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
              {/* Profile Image */}
              <div className="w-24 h-24 bg-blue-500 dark:bg-blue-600 text-white text-3xl font-bold flex items-center justify-center rounded-lg shadow-md">
                {student.first_name[0].toUpperCase()}
              </div>

              {/* Student Info */}
              <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                {student.first_name} {student.last_name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{student.student_id}</p>
            </div>

            {/* Cohort & Email */}
            <div className="flex-1 flex justify-center items-center p-6 rounded-lg">
              <div className="flex flex-col items-center text-center text-gray-700 dark:text-gray-300">
                <p className="text-lg font-semibold mb-2">
                  <span className="font-semibold">Cohort:</span> {student.cohort.split("cohort/")[1].replace("/", "")}
                </p>
                <div className="text-lg">
                  <div className="font-semibold">Email:</div>
                  <a href={`mailto:${student.email}`} className="text-blue-500 dark:text-blue-400 hover:underline">
                    {student.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Grades */}
          <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 max-h-[30vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Grades
            </h3>
            {grades.map((grade, index) => (
              <GradeRow key={index} grade={grade} />
            ))}
          </div>
        </div>


        {/* Modules */}
        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Modules</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            { modules.map((module, index) => <ModuleCard key={index} module={module} onDelete={handleDelete}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleStudent;