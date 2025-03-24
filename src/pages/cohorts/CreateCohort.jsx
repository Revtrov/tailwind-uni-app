import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCohort() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    year: "",
    degree: ""
  });
  const [degrees, setDegrees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  useEffect(() => {
    document.title = "Create Cohort";
    
    const fetchData = async () => {
      try {
        const response = await fetch("/api/degree/");
        if (!response.ok) throw new Error("Failed to fetch degrees");
        const data = await response.json();
        setDegrees(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    // Validate Year Input
    if (!Number.isInteger(Number(formData.year))) {
      setError("Year must be an integer.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/cohort/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(Object.keys(errorData).map(key=>key +": "+ errorData[key]) || "Failed to create cohort."); 
        return;
      }

      navigate("/cohorts/all"); // Navigate on success
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[92vh] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create a Cohort</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-400 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Id */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., COMBUS1"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 1"
              required
            />
          </div>

          {/* Degree */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">Degree</label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select a degree</option>
              {degrees.map((degree, index) => (
                <option key={index} value={"http://127.0.0.1:8000/api/degree/" + degree.shortcode + "/"}>
                  {degree.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg font-semibold hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Cohort"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCohort;
