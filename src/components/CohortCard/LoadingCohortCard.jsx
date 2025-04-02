function LoadingCohortCard() {
  return (
    <div
      className="bg-white dark:bg-gray-800 p-6 shadow-md rounded-2xl animate-pulse"
    >
      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="mt-4 flex gap-2 flex-col sm:flex-row md:flex-row">
        <div className="h-10 bg-blue-300 dark:bg-blue-500/70 rounded-lg w-30"></div>
        <div className="h-10 bg-blue-300 dark:bg-blue-500/70 rounded-lg w-30"></div>
        <div className="block bg-red-700 dark:bg-red-600/60 text-white px-4 py-2 rounded-lg  w-22.5">
        </div>
      </div>
    </div>
  )
}
export default LoadingCohortCard