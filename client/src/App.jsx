import React from 'react'
import NavbarComponent from './components/NavbarComponent'
import { Route, Routes } from 'react-router-dom'
import UserAuthFormPage from './pages/UserAuthFormPage'

const App = () => {
  return (
    <Routes>
      <Route path ="/" element={<NavbarComponent />} >
        <Route path = "/signin" element={<UserAuthFormPage type="signin" />} />
        <Route path = "/signup" element={<UserAuthFormPage type="signup" />} />      
      </Route>
    </Routes>
  )
}

export default App
