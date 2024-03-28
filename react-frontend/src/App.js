import React from 'react'
import LoginPage from './pages/LoginPage'
import MapPage from "./pages/MapsPage.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/maps',
    element: <MapPage/>,
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App