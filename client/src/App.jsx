
import {Route, Routes, BrowserRouter} from "react-router-dom"
import BookingFormPage from "./pages/BookingFormPage"
import LandingPage from "./pages/LandingPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/booking-form' element={<BookingFormPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
