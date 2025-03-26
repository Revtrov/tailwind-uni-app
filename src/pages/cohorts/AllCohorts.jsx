import { useEffect, useState } from "react";
import CohortCard from "../../components/CohortCard/CohortCard";
import LoadingCohortCard from "../../components/CohortCard/LoadingCohortCard";

function AllCohorts() {
  const [loading, setLoading] = useState(true);
  const [cohorts, setCohorts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "All Cohorts"
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cohort");
        if (!response.ok) throw new Error("Failed to fetch cohorts.");
        const data = await response.json();
        setCohorts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/cohort/${id}/`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete cohort.");

      setCohorts((prev) => prev.filter((cohort) => cohort.id !== id));
    } catch (err) {
      setError("Error deleting cohort. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-300 dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center py-3">
          All Cohorts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {[...Array(12)].map((_, index) => (
            <LoadingCohortCard key={index}/>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-300 dark:bg-slate-900 min-h-[92vh]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center py-3">
        All Cohorts
      </h3>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-400 rounded-lg text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {cohorts.map((cohort) => (
          <CohortCard key={cohort.id} cohort={cohort} onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
}

export default AllCohorts;
