import { useEffect, useState } from "react"
import { fetchPaper, type ArxivPaper } from "../api/apxiv"

const summaryPreview = (summary: string, maxLength = 260) => {
    if (summary.length <= maxLength) {
        return summary
    }

    return `${summary.slice(0, maxLength).trim()}...`
}

type PostcardProps = {
    query: string
    onSelectPaper: (paper: ArxivPaper) => void
}

export default function Postcard({ query, onSelectPaper }: PostcardProps) {
    const [papers, setPapers] = useState<ArxivPaper[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true)
        setError("")

        fetchPaper(query).then((data) => {
            console.log(data)
            setPapers(data)
        }).catch((error) => {
            console.error(error)
            setError(error instanceof Error ? error.message : "Could not fetch arXiv papers")
        }).finally(() => {
            setIsLoading(false)
        })
    }, [query])

    if (isLoading) {
        return (
            <div className="border-b border-gray-300 py-6">
                <h2 className="text-xl font-semibold">Loading arXiv papers...</h2>
                <p className="text-gray-700 mt-3 text-sm">Fetching latest results.</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="border-b border-gray-300 py-6">
                <h2 className="text-xl font-semibold">Could not load papers</h2>
                <p className="text-gray-700 mt-3 text-sm">{error}</p>
            </div>
        )
    }

    if (papers.length === 0) {
        return (
            <div className="border-b border-gray-300 py-6">
                <h2 className="text-xl font-semibold">No papers found</h2>
                <p className="text-gray-700 mt-3 text-sm">Try a different search query.</p>
            </div>
        )
    }

    return (
        <>
            {papers.map((paper) => (
                <article
                    className="border-b border-gray-300 py-6 cursor-pointer"
                    key={paper.id}
                    onClick={() => onSelectPaper(paper)}
                >
                    <h2 className="text-xl font-semibold hover:underline cursor-pointer">
                        {paper.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {paper.authors.join(", ") || "arXiv"} • {paper.published.slice(0, 10)}
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
                        {summaryPreview(paper.summary)}
                    </p>

                    <div className="mt-3 text-sm space-x-4">
                        <a
                            className="text-blue-600"
                            href={paper.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                        >
                            Read More
                        </a>
                                {paper.pdfLink && (
                            <a
                                className="text-blue-600"
                                href={paper.pdfLink}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) => event.stopPropagation()}
                            >
                                PDF
                            </a>
                        )}
                        <button className="text-gray-600">Save</button>
                        <button className="text-gray-600">Share</button>
                    </div>
                </article>
            ))}
        </>
    )
}
