
import { Outlet, Link } from 'react-router-dom'
import {useState} from 'react'
import logo from '../assets/react.svg';
function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  return (<>
    <header className="bg-blue-600 text-white shadow-md w-full h-[8vh]">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link className="text-2xl font-bold flex items-center" to="/">
          <img src={logo} className='px-2 pe-5' />
          University
        </Link>
        <nav className="hidden md:flex space-x-6">
          {/* Navigation */}
          <Link className="hover:text-gray-200" to="/">Home</Link>
          <Link className="hover:text-gray-200" to="/degrees/all">All Degrees</Link>
          <Link className="hover:text-gray-200" to="/degrees/COMSCI">COMSCI</Link>
          <Link className="hover:text-gray-200" to="/degrees/create">Create Degree</Link>
        </nav>
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
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
        <nav className="md:hidden bg-blue-700 p-4">
          <Link className="block py-2 hover:text-gray-200" to="/">Home</Link>
          <Link className="block py-2 hover:text-gray-200" to="/degrees/all">All Degrees</Link>
          <Link className="block py-2 hover:text-gray-200" to="/degrees/COMSCI">COMSCI</Link>
          <Link className="block py-2 hover:text-gray-200" to="/degrees/create">Create Degree</Link>
        </nav>
      )}
    </header>
      <Outlet />
      </>
  )
}
export default Layout;