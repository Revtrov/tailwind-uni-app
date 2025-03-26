import { useEffect, useState } from "react"
import LoadingStudentCard from "../../components/StudentCard/LoadingStudentCard";
import { useParams } from "react-router-dom";
import StudentCard from "../../components/StudentCard/StudentCard";
function StudentsInModule(){
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([])
  const {code} = useParams();
  useEffect(() => {
    document.title = code + "- Students";
    const fetchData = async () => {
      const response = await fetch("/api/module/" + code);
      if (!response.ok) throw new Error("Error loading modules")
      const data = await response.json();
      let allStudents = [];
      for (const cohort of data.delivered_to) {
        const studentResponse = await fetch("/api/student/?cohort=" + cohort.split("cohort/")[1].replace("/", ""))
        const studentData = await studentResponse.json()
        allStudents = [...allStudents, ...studentData];
      }
      setStudents(allStudents);
      setLoading(false);
    }
    fetchData()
  }, [])
  console.log(students);
  if (loading) {
    return (
      <div className="bg-gray-300 dark:bg-slate-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center py-3">
          Students in {code}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {[...Array(8)].map((_, index) =>
            <LoadingStudentCard key={index} />
          )}
        </div>
      </div>
    )
  }
   return (
    
     <div className="bg-gray-300 dark:bg-slate-900">
       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 w-full flex items-center justify-center py-3">
         Students in {code}
       </h3>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
         {students.map((student, index) =>
           <StudentCard key={index} student={student}/>
         )}
       </div>
     </div>
   )

}
export default StudentsInModule