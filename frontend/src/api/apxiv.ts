export type ArxivPaper = {
  id: string
  title: string
  summary: string
  published: string
  authors: string[]
  link: string
  pdfLink: string
}

const textFrom = (node: Element, selector: string) =>
  node.querySelector(selector)?.textContent?.trim().replace(/\s+/g, " ") ?? ""

const hrefFrom = (node: Element, selector: string) =>
  node.querySelector(selector)?.getAttribute("href") ?? ""

export async function fetchPaper(query: string, maxResults = 10): Promise<ArxivPaper[]> {
  const url = new URL("/arxiv-api/api/query", window.location.origin)
  const trimmedQuery = query.trim()
  const searchQuery = trimmedQuery.includes(":") ? trimmedQuery : `all:${trimmedQuery}`

  url.searchParams.set("search_query", trimmedQuery ? searchQuery : "cat:*")
  url.searchParams.set("max_results", String(maxResults))

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`arXiv request failed with ${response.status}`)
  }

  const xml = await response.text()
  const doc = new DOMParser().parseFromString(xml, "application/xml")
  const parseError = doc.querySelector("parsererror")

  if (parseError) {
    throw new Error("arXiv returned invalid XML")
  }

  return Array.from(doc.querySelectorAll("entry")).map((entry) => ({
    id: textFrom(entry, "id"),
    title: textFrom(entry, "title"),
    summary: textFrom(entry, "summary"),
    published: textFrom(entry, "published"),
    authors: Array.from(entry.querySelectorAll("author > name")).map((author) =>
      author.textContent?.trim() ?? "",
    ),
    link: textFrom(entry, "id"),
    pdfLink: hrefFrom(entry, 'link[type="application/pdf"]'),
  }))
}
