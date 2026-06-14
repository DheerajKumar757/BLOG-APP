import NavbarComponent from './components/NavbarComponent'
import { Route, Routes } from 'react-router-dom'
import UserAuthFormPage from './pages/UserAuthFormPage'
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { lookInSession } from './common/session'
import { Toaster } from 'react-hot-toast'
import VerifyEmail from './pages/VerifyEmail'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'

export const UserContext = createContext({});

const App = () => {

  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
  }, [])

  return (
    <UserContext.Provider value={{userAuth, setUserAuth}}>
      <Toaster />
      <Routes>
        <Route path ="/" element={<NavbarComponent />} >
          <Route path = "/signin" element={<UserAuthFormPage type="signin" />} />
          <Route path = "/signup" element={<UserAuthFormPage type="signup" />} />   
          <Route path = "/verify-email/:token" element={<VerifyEmail />}/>   
          <Route path = "/forget-password" element={<ForgetPassword />}/>
          <Route path = "/reset-password/:pass_username/:pass_param" element={<ResetPassword/>}/>
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
