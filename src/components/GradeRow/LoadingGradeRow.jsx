function LoadingGradeRow() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg mb-4 w-full">
      <div className="flex flex-row lg:flex-row items-center gap-2 text-gray-900 dark:text-white font-semibold w-full">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 w-24 animate-pulse rounded-full" />
        <span className="text-gray-700 mx-2">/</span>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 w-24 animate-pulse rounded-full" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 text-gray-700 dark:text-gray-300 font-medium w-full mt-4 md:mt-0 ms-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 w-12 animate-pulse rounded" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 w-12 animate-pulse rounded" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 w-12 animate-pulse rounded" />
      </div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 w-16 animate-pulse rounded" />

    </div>
  )
}
export default LoadingGradeRow;