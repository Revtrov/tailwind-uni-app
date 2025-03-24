import { useParams } from "react-router-dom"
import { useState, useEffect, use } from "react"
function SingleModule() {
  const { code } = useParams();
  const [module, setModule] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/module/" + code);
      if (!response.ok) throw new Error("Failed to find module")
      const data = await response.json();
      setModule(data);
      setLoading(false);
    }
    fetchData();
  }, [code])
  if (loading) return(
    <div className="">Loading...</div>
  )
  return (
    <div className="">
      {JSON.stringify(module)}
    </div>
  )
}
export default SingleModule