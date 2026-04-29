import Header from './components/Header.tsx'
import Sidebar from './components/Sidebar.tsx'
import Postcard from './components/Postcard.tsx'
function App() {
 

  return (
    <div className='min-h-screen flex flex-col'>
      <Header></Header>    
      <div className='flex flex-1'> 
      <Sidebar></Sidebar>
      <main className='flex-1 p-6'>
          <Postcard ></Postcard>
      </main>
      </div>
    </div>
  )
}

export default App
