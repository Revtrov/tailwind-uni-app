import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function Degree({ degree, onDelete }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onDelete(degree.shortcode), 300);
  };

  return (
    <motion.div
      className="relative max-w-sm min-w-xs rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all hover:shadow-xl"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.8 : 1 }}
      transition={{ duration: 0.3 }}
    >

      {/* Degree Details */}
      <div className="p-6">
        <h2 className="font-bold text-xl text-gray-900 dark:text-white">{degree.full_name}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Shortcode: {degree.shortcode}</p>
      </div>
      <div className="px-6 pb-4 flex justify-center gap-4">
        {/* View Degree Button */}
        <Link
          to={`/degrees/${degree.shortcode}`}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          View Degree
        </Link>

        {/* Delete Button */}
        <button
          onClick={handleRemove}
          className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>

    </motion.div>
  );
}

export default Degree;
