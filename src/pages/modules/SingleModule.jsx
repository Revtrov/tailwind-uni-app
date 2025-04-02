import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
function SingleModule() {
  const { code } = useParams();
  const [module, setModule] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    document.title = "Module - " + code
    const fetchData = async () => {
      const response = await fetch("/api/module/" + code);
      if (!response.ok) throw new Error("Failed to find module")
      const data = await response.json();
      setModule(data);
      setLoading(false);
    }
    fetchData();
  }, [code])
  if (loading) return(
    <div className="flex items-center justify-center min-h-screen">
  <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md w-full max-w-md">
    <div className="animate-pulse">
      {/* Title */}
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
      {/* Code */}
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-3"></div>
      {/* Delivered To */}
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-3"></div>
      <div className="flex gap-2 mt-2">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
      </div>
      {/* CA Split */}
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3 my-3"></div>
      {/* Button */}
      <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    </div>
  </div>
</div>

  )
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 transition hover:shadow-xl w-full max-w-lg">
        {module ? (
          <div >
            <h1 className="text-2xl font-bold mb-2">{module.full_name}</h1>
            <p className="mb-2"><strong>Code:</strong> {module.code}</p>
            <div className="mb-2">
              <strong>Delivered To:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {module.delivered_to.map((id) => (
                  <Link key={id} to={"/cohorts/" + id.split("cohort/")[1].replace("/", "")} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    {id.split("cohort/")[1].replace("/", "")}
                  </Link>
                ))}
              </div>
            </div>
            <p className="mb-4"><strong>CA Split:</strong> {module.ca_split}</p>
            <Link to={"/modules/" + module.code + "/students"}className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              View All Students in Module
            </Link>
          </div>
        ) : (
          <div>Module not found</div>
        )}
      </div>
    </div>
  )
}
export default SingleModule