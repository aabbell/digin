export default function Postcard() {
    return(
        <div className="border-b border-gray-300 py-6">
      <h2 className="text-xl font-semibold hover:underline cursor-pointer">
        Transformers Changed How We Understand Language Models
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        AI Research Daily • 2026-01-10 • 6 min read
      </p>

      <div className="flex gap-2 mt-2 flex-wrap">
        {/* {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))} */}
      </div>

      <p className="text-gray-700 mt-3 text-sm">
        Transformers have revolutionized modern NLP by replacing recurrence with attention mechanisms..
      </p>

      <div className="mt-3 text-sm space-x-4">
        <button className="text-blue-600">Read More</button>
        <button className="text-gray-600">Save</button>
        <button className="text-gray-600">Share</button>
      </div>
    </div>
  )
}