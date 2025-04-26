
import Homepage from '@/pages/Homepage'
import './App.css'
import { Route, Router,Routes } from 'react-router-dom'
import Category from './pages/Category'
import MovieDetails from './pages/MovieDetails'



function App() {
  
  return (
  
      <div className='App'>
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/category" element={<Category />} ></Route>
            <Route path="/movies/:imdbCode" element={<MovieDetails/>}></Route>
          </Routes>
      </div>

  )
}

export default App
