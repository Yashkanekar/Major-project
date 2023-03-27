import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import BookingPage from './components/BookingPage'
import HomePage from './pages/HomePage'
import Transactions from './components/Transactions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
         <Route index path='/' element={<HomePage/>}/>
         <Route  path='/book' element={<BookingPage/>}/>
         <Route  path='/transactions' element={<Transactions/>}/>
       </Routes>
    </div>
    // <div className="App">
    //   <BookingPage/>
    // </div>
  )
}

export default App
