
import Homepage from '@/pages/Homepage'
import './App.css'
import { Route, Router,Routes } from 'react-router-dom'
import Category from './pages/Category'



function App() {
  
  return (
  
      <div className='App'>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/category/:category" element={<Category />} ></Route>
          </Routes>
      </div>

  )
}

export default App
