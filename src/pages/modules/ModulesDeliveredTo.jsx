import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import ModuleCard from "../../components/ModuleCard/ModuleCard";
import LoadingModuleCard from "../../components/ModuleCard/LoadingModuleCard";
function ModulesDeliveredTo() {
  const [searchParams] = useSearchParams()
  const cohort = searchParams.get("delivered_to");
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cohort) { navigate("/modules/all"); return}
    const fetchData = async () => {
      document.title = "Modules Delivered To - " + cohort;
      const response = await fetch("/api/module/?delivered_to=" + cohort);
      if (!response.ok) throw new Error("Error loading modules")
      const data = await response.json();
      setModules(data)
      setLoading(false)
    }
    fetchData()
  }, [cohort])
  if (loading) {
    return (
      <div className="bg-gray-300 dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center py-3">
          Modules Delivered To {cohort}
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
        Modules Delivered To {cohort}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {modules.map((module, index) =>
          <ModuleCard key={index} module={module} />
        )}
      </div>
    </div>
  )

}
export default ModulesDeliveredTo