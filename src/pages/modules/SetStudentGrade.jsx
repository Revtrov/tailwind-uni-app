import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams, Link } from "react-router-dom";

function SetStudentGrade() {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    module: "",
    ca_mark: 0,
    exam_mark: 0,
    cohort: "",
    student: "",
  });

  const studentId = searchParams.get("student");
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!studentId) {
      navigate(`/modules/${code}/students`);
      return;
    }

    document.title = `Student - ${studentId}`;

    const fetchData = async () => {
      try {
        const [studentRes, gradesRes] = await Promise.all([
          fetch(`/api/student/${studentId}`),
          fetch(`/api/grade/?student=${studentId}`),
        ]);

        const studentData = await studentRes.json();
        const gradesData = (await gradesRes.json()).filter(
          (g) => g.module.split("module/")[1].replace("/", "") === code
        );

        setStudent(studentData);
        setFormData(gradesData[0] || { 
          module: `http://localhost:8000/api/module/${code}/`, 
          student: `http://localhost:8000/api/student/${studentId}/`, 
          ca_mark: 0, 
          exam_mark: 0, 
          cohort: studentData.cohort 
        });
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId, code, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/grade/${formData.id || ""}/`, {
        method: formData.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(Object.values(errorData)[0] || "Failed to save grade.");
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 1000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[92vh] flex items-center justify-center bg-gray-200 dark:bg-gray-900">
        <div className="max-w-xl w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4 w-5/8"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[92vh] flex items-center justify-center bg-gray-200 dark:bg-gray-900">
      <div className="max-w-xl w-full mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Set{" "}
          {student && (
            <Link
              to={`/students/${studentId}`}
              className="mx-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all"
            >
              {student.first_name} {student.last_name}'s
            </Link>
          )}
          Grade for{" "}
          <Link
            to={`/modules/${code}`}
            className="mx-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all"
          >
            {code}
          </Link>
        </h2>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-400 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold py-1">CA Mark</label>
            <input
              type="number"
              name="ca_mark"
              value={formData.ca_mark}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 50"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold py-1">Exam Mark</label>
            <input
              type="number"
              name="exam_mark"
              value={formData.exam_mark}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 40"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 mt-1 rounded-lg font-semibold hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : saved ? "Saved!" : "Save Grade"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetStudentGrade;
