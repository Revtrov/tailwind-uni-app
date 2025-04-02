function LoadingDegreeCard() {
  return (
    <div className="relative max-w-sm min-w-xs rounded-xl overflow-hidden shadow-lg bg-white my-1 py-1 animate-pulse dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all">
      <div className="p-6">
        <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded dark:bg-gray-700"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded dark:bg-gray-700"></div>
      </div>
      <div className="px-6 pb-4 flex justify-center gap-4">
        <div className="bg-blue-400 h-8 w-24 rounded dark:bg-cyan-950 mb-2"></div>
        <div className="bg-red-400 h-8 w-24 rounded dark:bg-red-700 mb-2"></div>
      </div>
    </div>
  );
}

export default LoadingDegreeCard;
