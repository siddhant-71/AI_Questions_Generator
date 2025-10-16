import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css'
import MainPage from './MainPage'
import Questions from './Questions'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/questions' element={<Questions/>}/>
      </Routes>
    </Router>
  )
}

export default App
