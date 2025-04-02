import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import degreeImage from '../../assets/degree.png'
import CohortCard from "../../components/CohortCard/CohortCard";
import LoadingCohortCard from "../../components/CohortCard/LoadingCohortCard";

function SingleDegree() {
  const { code } = useParams();
  const [degree, setDegrees] = useState()
  const [cohorts, setCohorts] = useState();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    document.title = "Degree -" + code
    const fetchData = async () => {
      const response = await fetch("/api/degree/" + code);
      const cohortResponse = await fetch("/api/cohort/?degree=" + code);
      const data = await response.json();
      const cohortData = await cohortResponse.json();
      setDegrees(data);
      setCohorts(cohortData);
      setLoading(false)
      document.title = data.full_name;
    };
    fetchData();
  }, [code]);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cohort?")) return;

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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-4xl min-h-[300px] flex flex-col rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
           {/* Image Placeholder */}
          <div className="w-full relative flex justify-center items-center p-4">
          <img className="max-w-[90%] max-h-[90%] object-contain" src={degreeImage} alt="University Degree" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-1/4 flex flex-col justify-center items-center space-y-2">
              <div className="w-full h-9 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="w-7/10 h-6 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"></div></div>
            </div>
          </div>

          <div className="w-full flex flex-col justify-between p-4">
            <div>
              <h3 className="w-full text-lg font-bold text-gray-700 dark:text-gray-300 text-center">Cohorts</h3>
              <ul className="grid grid-cols-2 gap-2 my-2">
                {[...Array(4)].map((_, key) => (
                  <LoadingCohortCard key={key} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-4xl min-h-[300px] flex flex-col rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
        <div className="w-full relative flex justify-center items-center p-4">
          <img className="max-w-[90%] max-h-[90%] object-contain" src={degreeImage} alt="University Degree" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <h2 className="text-2xl font-bold text-white text-center px-4">{degree.full_name}<br></br>{degree.shortcode}</h2>
          </div>
        </div>

        <div className="w-full flex flex-col justify-between p-4">
          <div>
          <h3 className="w-full text-lg font-bold text-gray-700 dark:text-gray-300 text-center">Cohorts</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
              {cohorts.length > 0 ? (
                cohorts.map((cohort, i) => (
                  <CohortCard key={i} cohort={cohort} hideDegree={true} onDelete={handleDelete} />
                ))
              ) : (
                <li className="text-gray-500 dark:text-gray-400">No cohorts available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}
export default SingleDegree