export type Page = "explore" | "topics"

type SidebarProps = {
  activePage: Page
  onPageChange: (page: Page) => void
}

export default function Sidebar({ activePage, onPageChange }: SidebarProps) {
  const linkClass = (page: Page) =>
    `block w-full text-left text-sm cursor-pointer ${
      activePage === page ? "font-semibold text-blue-600" : "text-gray-600"
    }`

  return (
     <div className="w-64 border-r border-gray-300 p-4 space-y-4 hidden md:block">
      <button className={linkClass("explore")} type="button" onClick={() => onPageChange("explore")}>
        Explore
      </button>
      <p className="text-sm text-gray-600 cursor-pointer">Saved Posts</p>
      <button className={linkClass("topics")} type="button" onClick={() => onPageChange("topics")}>
        Topics
      </button>
    </div>
  )

}
