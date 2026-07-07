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
import Editor from './pages/Editor'
import HomePage from './pages/HomePage'
import SearchPage from './components/SearchPage'
import PageNotFound from './pages/404-Page'

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
        <Route path = "/editor" element={<Editor />} />
        <Route path ="/" element={<NavbarComponent />} >
          <Route index element={ <HomePage /> }/>
          <Route path = "/signin" element={<UserAuthFormPage type="signin" />} />
          <Route path = "/signup" element={<UserAuthFormPage type="signup" />} />   
          <Route path = "/verify-email/:token" element={<VerifyEmail />}/>   
          <Route path = "/forget-password" element={<ForgetPassword />}/>
          <Route path = "/reset-password/:pass_username/:pass_param" element={<ResetPassword/>}/>
          <Route path = "search/:query" element={<SearchPage />}/>
          <Route path = "*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
