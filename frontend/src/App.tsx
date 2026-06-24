import { useState } from 'react'
import Header from './components/Header.tsx'
import Sidebar, { type Page } from './components/Sidebar.tsx'
import Postcard from './components/Postcard.tsx'
import Card from './components/card.tsx'
import type { ArxivPaper } from './api/apxiv.ts'

const topics = [
  { label: 'AI', query: 'cat:cs.AI' },
  { label: 'Machine Learning', query: 'cat:cs.LG' },
  { label: 'Biology', query: 'cat:q-bio.*' },
  { label: 'Physics', query: 'cat:physics.*' },
  { label: 'Math', query: 'cat:math.*' },
]

function App() {
  const [selectedPaper, setSelectedPaper] = useState<ArxivPaper | null>(null)
  const [activePage, setActivePage] = useState<Page>('explore')
  const [activeTopic, setActiveTopic] = useState(topics[0])
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setActivePage('explore')
  }

  return (
    
    <div className='min-h-screen flex flex-col'>
      <Header onSearch={handleSearch}></Header>    
      <div className='flex flex-1'> 
      <Sidebar activePage={activePage} onPageChange={setActivePage}></Sidebar>
      <main className='flex-1 p-6'>
        {activePage === 'explore' && (
          <>
            <div className='mb-2'>
              <h2 className='text-2xl font-semibold'>{searchQuery ? 'Search Results' : 'Explore'}</h2>
              <p className='mt-1 text-sm text-gray-500'>{searchQuery ? `Results for "${searchQuery}"` : 'Recent papers across arXiv categories.'}</p>
            </div>

            <Postcard query={searchQuery} onSelectPaper={setSelectedPaper}></Postcard>
          </>
        )}

        {activePage === 'topics' && (
          <>
            <div className='mb-4'>
              <h2 className='text-2xl font-semibold'>Topics</h2>
              <p className='mt-1 text-sm text-gray-500'>Choose a research area to browse papers.</p>
            </div>

            <div className='mb-4 flex flex-wrap gap-2'>
              {topics.map((topic) => (
                <button
                  className={`rounded-full border px-3 py-1 text-sm ${activeTopic.query === topic.query ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-300 text-gray-600'}`}
                  key={topic.query}
                  type='button'
                  onClick={() => setActiveTopic(topic)}
                >
                  {topic.label}
                </button>
              ))}
            </div>

            <Postcard query={activeTopic.query} onSelectPaper={setSelectedPaper}></Postcard>
          </>
        )}
      </main>
      </div>
      <Card paper={selectedPaper} onClose={() => setSelectedPaper(null)}></Card>
    </div>
  )
}

export default App
