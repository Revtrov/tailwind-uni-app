import { useEffect, useState } from "react"
import ModuleCard from "../../components/ModuleCard/ModuleCard";
import LoadingModuleCard from "../../components/ModuleCard/LoadingModuleCard";
function AllModules() {
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([])
  useEffect(() => {
    document.title = "All Modules";
    const fetchData = async () => {
      const response = await fetch("/api/module/");
      if (!response.ok) throw new Error("Error loading modules")
      const data = await response.json();
      setModules(data)
      setLoading(false)
    }
    fetchData()
  }, [])
  const handleDelete = async (code) => {
    try {
      const response = await fetch(`/api/module/${code}/`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete module.");
      setModules((prev) => prev.filter((module) => module.code !== code));
    } catch (err) {
      setError("Error deleting module. Please try again.");
    }
  };
  if (loading) {
    return (
      <div className="bg-gray-300 dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center py-3">
          All Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {[...Array(8)].map((_, index) =>
            <LoadingModuleCard key={index} />
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="bg-gray-300 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center py-3">
        All Modules
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {modules.map((module, index) =>
          <ModuleCard key={index} module={module} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )

}
export default AllModules