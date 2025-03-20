function LoadingModuleCard() {
  return (
    <div
      className="p-6 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700 animate-pulse flex flex-col h-full"
    >
      <div className="h-6 bg-gray-300 dark:bg-gray-600 w-3/4 mb-4"></div>
      <div className="mt-auto">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 w-1/3 mb-4"></div>
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="w-24 h-8 bg-gray-300 dark:bg-gray-500 animate-pulse rounded-lg"></div>
        </div>
        <div className="mt-4">
          <div className="w-full h-10 bg-gray-300 dark:bg-gray-500 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingModuleCard;
