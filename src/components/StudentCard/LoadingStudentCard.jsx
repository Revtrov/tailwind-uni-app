function StudentCardLoading({index}) {
  return (
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-xl p-4 text-center w-full animate-pulse" key={index}>
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto mt-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mx-auto mt-2"></div>
      <div className="mt-4 h-10 bg-gray-300 dark:bg-gray-600 rounded w-24 mx-auto"></div>
    </div>
  );
}

export default StudentCardLoading;
  