import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
function CreateDegree() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    shortcode: "",
  })
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const response = await fetch("/api/degree/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      if (!(await response).ok) {
        console.error((await (await response).json()))
      }else{
        navigate("/degrees/all")
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }

  }
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Create a Degree</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">Degree Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Bachelor of Science"
            required
          />
        </div>

        {/* Shortcode */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">Shortcode</label>
          <input
            type="text"
            name="shortcode"
            value={formData.shortcode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., BSc"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          {loading ? "Submitting..." : "Create Degree"}
        </button>
      </form>
    </div>
  )
}
export default CreateDegree