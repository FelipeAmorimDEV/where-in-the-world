import { Link } from "react-router-dom"

const NotFound = () =>
  <div className="mt-32 text-center text-gray-900 dark:text-white">
    <h2 className="font-bold text-9xl">404</h2>
    <h3 className="text-3xl mt-3 mb-5">Page Not Found</h3>
    <Link to="/" className="px-4 py-2 bg-gray-400 text-white rounded-md text-lg font-bold hover:bg-opacity-0 hover:border hover:border-gray-900 hover:text-gray-900 dark:hover:text-white">Go Home</Link>
  </div>

export { NotFound }