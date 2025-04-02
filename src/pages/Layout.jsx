
import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/bank.png';
function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="bg-blue-600 text-white shadow-md w-full ">
        <div className="container mx-auto flex justify-between items-center p-4 h-[8vh]">
          <Link className="text-2xl font-bold flex items-center h-full" to="/">
            <img
              src={logo}
              className="px-2 pe-5 object-contain h-full"
              alt="Bank logo"
            />
            {/* Bank icons created by Freepik - Flaticon */}
            Uniportal
          </Link>
          <nav className="hidden lg:flex space-x-6">
            {/* Navigation */}
            <Link className="hover:text-gray-200" to="/degrees/all">All Degrees</Link>
            <Link className="hover:text-gray-200" to="/degrees/create">Create Degree</Link>
            <Link className="hover:text-gray-200" to="/modules/all">All Modules</Link>
            <Link className="hover:text-gray-200" to="/modules/create">Create Module</Link>
            <Link className="hover:text-gray-200" to="/cohorts/all">All Cohorts</Link>
            <Link className="hover:text-gray-200" to="/cohorts/create">Create Cohort</Link>
            <Link className="hover:text-gray-200" to="/students/create">Create Student</Link>
          </nav>
          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <nav className="lg:hidden bg-blue-700 p-4">
            <Link className="block py-2 hover:text-gray-200" to="/degrees/all">All Degrees</Link>
            <Link className="block py-2 hover:text-gray-200" to="/degrees/create">Create Degree</Link>
            <Link className="block py-2 hover:text-gray-200" to="/modules/all">All Modules</Link>
            <Link className="block py-2 hover:text-gray-200" to="/modules/create">Create Module</Link>
            <Link className="block py-2 hover:text-gray-200" to="/cohorts/all">All Cohorts</Link>
            <Link className="block py-2 hover:text-gray-200" to="/cohorts/create">Create Cohort</Link>
            <Link className="block py-2 hover:text-gray-200" to="/students/create">Create Student</Link>
          </nav>
        )}
      </header>

      <Outlet />
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto text-center">
          <p className="text-lg">&copy; 2025 Uniportal</p>
          <div className="mt-4">
            <Link  className="text-gray-400 hover:text-white px-4">
              Privacy Policy
            </Link>
            <Link  className="text-gray-400 hover:text-white px-4">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Layout;