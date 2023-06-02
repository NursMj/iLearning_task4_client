import { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from 'react-router-dom'
import AuthRegPage from './pages/AuthRegPage'
import AdminPage from './pages/AdminPage'
import Header from './components/Header'
import UserContext from './context/userContext'

const Layout = () => {
  return (
    <div className='app'>
      <Header />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AuthRegPage />,
      },
      {
        path: "/registration",
        element: <AuthRegPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
    ]
  },
])

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <UserContext.Provider value={isAuth}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

export default App
