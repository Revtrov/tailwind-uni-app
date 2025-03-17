import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import degreeImage from '../../assets/degree.png'
import LoadingDegreeCard from "../../components/DegreeCard/LoadingDegreeCard";
import Degree from "../../components/DegreeCard/DegreeCard";
function DegreeInfo() {
  let { code } = useParams();
  const [degree, setDegrees] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/degree/" + code);
      const data = await response.json();
      setDegrees(data);
      setLoading(false)
      document.title = data.full_name;
    };
    fetchData();
  }, [code]);
  if (!degree) {
    return (<div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 max-w-md rounded-lg overflow-hidden shadow-lg bg-white px-2 aspect-w-1 aspect-h-2 dark:bg-gray-800 animate-pulse">
        <img
          className="w-full h-48 object-contain"
          src={degreeImage}
          alt="University Degree"
        />
        <div className="px-6 py-4">
          <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded dark:bg-gray-700"></div>
          <div className="bg-gray-200 h-4 w-full mb-4 rounded dark:bg-gray-600"></div>
        </div>
        <div className="px-6 py-4 flex justify-end">
          <div className="bg-blue-400 w-24 h-8 rounded dark:bg-cyan-950"></div>
        </div>
      </div>
    </div>
    );
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-64 max-w-md rounded-lg overflow-hidden shadow-lg bg-white px-2 aspect-w-1 aspect-h-2 dark:bg-gray-800">
        <img
          className="w-full h-48 object-contain"
          src={degreeImage}
          alt="University Degree"
        />
        <div className="px-6 py-4">
          <h2 className="font-bold text-2xl text-gray-800 dark:text-white">{degree.full_name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Shortcode: {degree.shortcode}</p>
        </div>
        <div className="px-6 py-4 flex justify-end">
          <Link
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
export default DegreeInfo