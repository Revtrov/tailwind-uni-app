import { Link } from "react-router-dom"
function ModuleCard({ module }) {
  return (
  <div
    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 transition hover:shadow-xl flex flex-col h-full"
  >
    {/* Module Name (Stays at the Top) */}
    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{module.full_name}</h4>

    {/* Everything else is pushed to the bottom */}
    <div className="mt-auto">
      {/* Module Code & CA Split */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
        <span className="font-medium">Code:</span> {module.code}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        <span className="font-semibold">CA Split:</span> {module.ca_split}
      </p>

      {/* Delivered To (Cohorts) */}
      <div className="mt-4 flex flex-wrap gap-2">
        {module.delivered_to.map((name, index) => (
          <Link
            key={index}
            to={`/cohorts/${name.split("/api/cohort/")[1]}`}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all"
          >
            {name.split("cohort/")[1].replace("/", "")}
          </Link>
        ))}
      </div>

      {/* View Module Button */}
      <div className="mt-4">
        <Link
          to={`/modules/${module.code}`}
          className="block w-full text-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-all"
        >
          View Module
        </Link>
      </div>
    </div>
  </div>
  )
}
export default ModuleCard