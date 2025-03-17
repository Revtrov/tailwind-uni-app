import { useEffect, useState } from "react";
import '../../index.css'; // or tailwind.css
import LoadingDegreeCard from "../../components/DegreeCard/LoadingDegreeCard";
import DegreeCard from "../../components/DegreeCard/DegreeCard";

function AllDegrees() {
  const [degrees, setDegrees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "All Degrees";
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/degree/");
      const data = await response.json();
      setDegrees(data);
      setLoading(false)
    };
    fetchData();
  }, []);
  
  const handleDelete = async(shortcode)=>{
    try{
      const response = fetch("/api/degree/"+shortcode + "/", {
        method:"DELETE"
      })
      if(!(await response).ok){
        console.error((await (await response).json()))
      }
      setDegrees(degrees.filter(degree => degree.shortcode !== shortcode));
    }catch(err){
      console.error(err)
    }
  }
  return (
    <div className ="min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-white py-6 mb-3 dark:text-gray-200 width-100 text-center">Our Degrees</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 justify-items-center">
        {loading ? LoadingDegreeCard() :
          degrees.map((element, index) =>
            <DegreeCard degree={element} key={index} onDelete={handleDelete}/>
          )
        }
      </div>
    </div>
  )
}

export default AllDegrees