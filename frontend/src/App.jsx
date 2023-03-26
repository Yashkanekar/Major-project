import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import BookingPage from './components/BookingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <div className="App">
    //   <Routes>
    //      <Route index path='/' element={<HomePage/>}/>
    //    </Routes>
    // </div>
    <div className="App">
      <BookingPage/>
    </div>
  )
}

export default App
