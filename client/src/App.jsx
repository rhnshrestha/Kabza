
import {Route, Routes, BrowserRouter} from "react-router-dom"
import BookingFormPage from "./pages/BookingFormPage"
import LandingPage from "./pages/LandingPage"
import UserLogin from "./pages/auth/UserLogin"
import UserRegister from "./pages/auth/UserRegister"
import AdminLogin from "./pages/auth/AdminLogin"

import AdminRoutes from "./routes/AdminRoutes"

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/booking-form' element={<BookingFormPage/>}/>
          <Route path='/user-login' element={<UserLogin/>}/>
          <Route path='/user-register' element={<UserRegister/>}/>
          <Route path='/admin-login' element={<AdminLogin/>}/>

          <Route path="/admin/*" element={<AdminRoutes />} />
          
      </Routes>
    </BrowserRouter>
  )
}

export default App
