import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
function CohortCard({ cohort, onDelete, hideDegree }) {
  const [isRemoving, setIsRemoving] = useState(false)
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onDelete(cohort.id), 300); // Wait for animation to finish before removing
  };
  return(<motion.div
    className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-2xl hover:shadow-lg transition transform hover:-translate-y-1"
    initial={{ opacity: 1, scale: 1 }} animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.8 : 1 }} transition={{ duration: 0.3 }}
  >
    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{cohort.name}</h2>
    <p className="text-gray-500 dark:text-gray-400 text-sm">ID: {cohort.id}</p>
    <p className="text-gray-600 dark:text-gray-300 mt-2">
      <strong>Year:</strong> {cohort.year}
    </p>
    <div className="mt-4 flex gap-2 flex-col sm:flex-row md:flex-row">
      <Link
        to={"/cohorts/" + cohort.id}
        className="block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition"
      >
        View Cohort
      </Link>
      {!hideDegree?<Link
        to={"/degrees/" + cohort.degree.split("degree/")[1].replace("/", "")}
        className="block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition"
      >
        View Degree
      </Link>
      :null}
      <button
        onClick={() => handleRemove()}
        className="block bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-400 transition"
      >
        Delete
      </button>
    </div>
  </motion.div>)
}
export default CohortCard