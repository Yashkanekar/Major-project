import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route index path='/' element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default App
