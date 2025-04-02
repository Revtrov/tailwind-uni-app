import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cohorts, setCohorts] = useState([]);
  const [formData, setFormData] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    cohort: ""
  })
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Create Student";
    const fetchData = async () => {
      const response = await fetch("/api/cohort");
      const data = await response.json();
      setCohorts(data);
      setLoading(false)
    }
    fetchData()
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user interacts
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch("/api/student/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(Object.keys(errorData).map(key => key + ": " + errorData[key])[0] || "Failed to create student.");
        return;
      }

      navigate("/student/" + formData.student_id); // Navigate on success
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (<div className="w-full min-h-[92vh] flex items-center justify-center bg-gray-200 dark:bg-gray-900">
    <div className="max-w-xl w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Create a Student
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-400 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student ID */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">
            Student ID
          </label>
          <input
            type="text"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 23420047"
            required
          />
        </div>
        {/* First Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., John"
            required
          />
        </div>
        {/* Last Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Doe"
            required
          />
        </div>

        {/* Cohort */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">
            Cohort
          </label>
          <select
            name="cohort"
            value={formData.cohort}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a cohort</option>
            {cohorts.map((cohort) => (
              <option
                key={cohort.id}
                value={`http://127.0.0.1:8000/api/cohort/${cohort.id}/`}
              >
                {cohort.name}
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
          {loading ? "Submitting..." : "Create Student"}
        </button>
      </form>
    </div>
  </div>)
}
export default CreateStudent;