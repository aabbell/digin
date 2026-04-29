export default function Sidebar() {

  return (
     <div className="w-64 border-r border-gray-300 p-4 space-y-4 hidden md:block">
      <h2 className="font-bold">Explore</h2>
      <p className="text-sm text-gray-600 cursor-pointer">Trending</p>
      <p className="text-sm text-gray-600 cursor-pointer">Recommended</p>
      <p className="text-sm text-gray-600 cursor-pointer">Saved Posts</p>
      <p className="text-sm text-gray-600 cursor-pointer">Topics</p>
    </div>
  )

}