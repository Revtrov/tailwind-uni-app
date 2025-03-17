import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
function Degree({ degree, onDelete }) {
  const [isRemoving, setIsRemoving] = useState(false)
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onDelete(degree.shortcode), 300); // Wait for animation to finish before removing
  };
  return (
    <motion.div className="relative max-w-sm min-w-xs rounded overflow-hidden shadow-lg bg-white my-1 py-1 dark:bg-gray-800" initial={{ opacity: 1, scale: 1 }} animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.8 : 1 }} transition={{ duration: 0.3 }}>
      <button className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" onClick={handleRemove}>
        X
      </button>

      <div className="px-6 py-4">
        <div className="font-bold text-xl text-black dark:text-white">{degree.full_name}</div>
      </div>

      <div className="px-6 pt-2 pb-2">
        <Link to={`/degrees/${degree.shortcode}`} className="inline-block bg-blue-500 text-white px-4 py-2 my-2 rounded hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600">
          View Degree
        </Link>
      </div>
    </motion.div>
  );
}
export default Degree;
