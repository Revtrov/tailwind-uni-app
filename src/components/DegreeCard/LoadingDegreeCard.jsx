function LoadingDegreeCard() {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white my-1 py-1 animate-pulse dark:bg-slate-900">
      <div className="px-6 py-4">
        {/* Title Placeholder */}
        <div className="bg-gray-300 h-6 w-3/4 mb-2 rounded dark:bg-gray-700"></div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {/* Link Placeholder */}
        <div className="bg-blue-400 w-24 h-8 rounded dark:bg-cyan-950"></div>
      </div>
    </div>
  )
}
export default LoadingDegreeCard