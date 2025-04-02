import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
function CreateModule() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    code: "",
    delivered_to: [],
    ca_split: 0
  });
  const [cohorts, setCohorts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 


  useEffect(() => {
    document.title = "Create Module";
    const fetchData = async () => {
      const response = await fetch("/api/cohort");
      const data = await response.json();
      setCohorts(data);
      setLoading(false)
    }
    fetchData()
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
  
    // Check if it's a checkbox
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value] // Add value to array if checkbox is checked
          : prev[name].filter((item) => item !== value), // Remove value from array if unchecked
      }));
    } else {
      // For regular input
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  
    setError(""); // Clear error when user interacts
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch("/api/module/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (formData.ca_split < 0 || formData.ca_split > 100) {
        setError("CA Split must be between 0 and 100.");
        setLoading(false);
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        setError(Object.keys(errorData).map(key => key + ": " + errorData[key])[0] || "Failed to create module.");
        return;
      }

      navigate("/modules/all"); // Navigate on success
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[92vh] flex items-center justify-center bg-gray-200 dark:bg-gray-900">
      <div className="max-w-xl w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Create a Module
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-400 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
              Degree Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Introduction to Computer Hardware"
              required
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
              Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., CA112"
              required
            />
          </div>
          {/* Deliverd To */}
          <div className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all shadow-sm">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Select Cohorts:</p>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {cohorts.map((cohort) => (
                <label key={cohort.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="delivered_to" // Ensure name matches formData key
                    value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}
                    checked={formData.delivered_to.includes(`http://127.0.0.1:8000/api/cohort/${cohort.id}/`)}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-900 dark:text-white">{cohort.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* CA Split */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
              CA Split
            </label>
            <input
              type="text"
              name="ca_split"
              value={formData.ca_split}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 50%"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg font-semibold hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Module"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreateModule