import { Link } from "react-router-dom";
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white dark:bg-blue-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              'url("https://via.placeholder.com/1920x600?text=University+Campus")',
          }}
        ></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-white dark:text-gray-100">
            Welcome to Uniportal
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-200 dark:text-gray-300">
          A portal for managing your university.
          </p>
          <Link
          to={"/degrees/all/"}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-100 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
          >
            View Degrees
          </Link>
        </div>
      </section>

      {/* University Highlights */}
      <section className="container mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 dark:text-white">
            Our Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            Discover the unique features that make our portal so useful.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Highlight 1 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Degrees, Cohorts, Modules and more!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All the tools you would need for managing your Courses.
            </p>
          </div>
          {/* Highlight 2 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Detailed Student Breakdowns
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our portal has detailed student entries that make managing your students easy.
            </p>
          </div>
          {/* Highlight 3 */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Concise and Simple UI
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access cutting-edge UI to view and update nessessary information.
            </p>
          </div>
        </div>
      </section>

      
    </div>
  )
}
export default Home;