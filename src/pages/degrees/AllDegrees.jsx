import { useEffect, useState } from "react";
import LoadingDegreeCard from "../../components/DegreeCard/LoadingDegreeCard";
import DegreeCard from "../../components/DegreeCard/DegreeCard";

function AllDegrees() {
  const [degrees, setDegrees] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    document.title = "All Degrees";
    const fetchData = async () => {
      const response = await fetch("/api/degree/");
      const data = await response.json();
      setDegrees(data);
      setLoading(false)
    };
    fetchData();
  }, []);

  const handleDelete = async (shortcode) => {
    try {
      const response = await fetch(`/api/degree/${shortcode}/`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete degree.");
      setDegrees((prev) => prev.filter((degree) => degree.shortcode !== shortcode));
    } catch (err) {
      setError("Error deleting degree. Please try again.");
    }
  };
  if (loading) return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center py-3">
        All Degrees
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 justify-items-center">
        {[...Array(4)].map((_, index) =>
          <LoadingDegreeCard key={index} />)}
      </div>
    </div>
  )
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center py-3">
        All Degrees
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 pb-6 justify-items-center">
        {degrees.map((element, index) =>
          <DegreeCard degree={element} key={index} onDelete={handleDelete} />)}
      </div>
    </div>
  )
}

export default AllDegrees