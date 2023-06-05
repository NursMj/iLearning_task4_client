import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthRegPage from './pages/AuthRegPage'
import AdminPage from './pages/AdminPage'
import Header from './components/Header'
import './App.css'


function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(() => {
    const storedIsAuth = localStorage.getItem('isAuth')
    return storedIsAuth ? JSON.parse(storedIsAuth) : false
  })

  useEffect(() => {
    localStorage.setItem('isAuth', JSON.stringify(isAuth))
  }, [isAuth])

  function logOut() {
    setIsAuth(false)
    localStorage.clear()
  }

  return (
    <BrowserRouter>
      <Header props={{isAuth, logOut}}/>
      <Routes>
        {isAuth && <Route path='/admin' element={<AdminPage props={{logOut,isLoading, setIsLoading}}/>}/>}
        <Route path="/registration" element={<AuthRegPage props={{isAuth, setIsAuth, isLoading, setIsLoading}}/>} />
        <Route path="/" element={<AuthRegPage props={{isAuth, setIsAuth, isLoading, setIsLoading}}/>} />
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
