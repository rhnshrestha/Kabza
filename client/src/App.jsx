
import './App.css'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import BookingFormTable from "./pages/BookingFormPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<BookingFormTable/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
