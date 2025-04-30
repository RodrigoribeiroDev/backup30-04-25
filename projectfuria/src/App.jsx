import './App.css'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import { Outlet } from 'react-router-dom'

function App() {


  return (
    <div id="root">
      
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </div>
  )
}

export default App
