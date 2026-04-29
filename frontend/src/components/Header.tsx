export default function Header() {
  return (
    <div className="border-b font-SN border-gray-300 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Research Blog</h1>
      <input
        className="w-1/2 border border-gray-300 rounded-full px-4 py-2 text-sm"
        placeholder="Search articles, topics, authors..."
      />
      <button className="text-sm text-blue-600">Login</button>
    </div>
  )
}