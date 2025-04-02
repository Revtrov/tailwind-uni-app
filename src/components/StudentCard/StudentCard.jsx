import { Link } from "react-router-dom";

function StudentCard({ student, module_code }) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-md rounded-xl p-4 text-center w-full">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {student.first_name} {student.last_name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">ID: {student.student_id}</p>
      <p className="text-sm text-blue-500 dark:text-blue-400 mt-1">{student.email}</p>
      <Link
        to={"/students/" + student.student_id}
        className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        View Student
      </Link>
      {module_code ?
        <Link
          to={"/modules/" + module_code + "/grades" + "?student=" +student.student_id}
          className="mt-4 inline-block px-4 py-2 ms-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Set Student Grade
        </Link> : null
      }

    </div>
  );
}

export default StudentCard;
