import type { ArxivPaper } from "../api/apxiv"

type CardProps = {
    paper: ArxivPaper | null
    onClose: () => void
}

export default function Card({ paper, onClose }: CardProps) {
    if (!paper) {
        return null
    }

    return (
        <section className="fixed inset-0 z-50 bg-black/40 px-4 py-6" onClick={onClose}>
            <article
                className="mx-auto max-h-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-950">{paper.title}</h1>
                        <p className="mt-2 text-sm text-gray-500">
                            {paper.authors.join(", ") || "arXiv"} • {paper.published.slice(0, 10)}
                        </p>
                    </div>

                    <button
                        className="shrink-0 rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>

                <div className="mt-6">
                    {paper.pdfLink ? (
                        <iframe
                            className="h-[70vh] w-full rounded border border-gray-200"
                            src={paper.pdfLink}
                            title={`${paper.title} PDF`}
                        />
                    ) : (
                        <div className="rounded border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                            No PDF is available for this paper.
                        </div>
                    )}
                </div>

                <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                    <a
                        className="text-blue-600 hover:underline"
                        href={paper.link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Open on arXiv
                    </a>

                    {paper.pdfLink && (
                        <a
                            className="text-blue-600 hover:underline"
                            href={paper.pdfLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open PDF
                        </a>
                    )}
                </div>
            </article>
        </section>
    )
}
