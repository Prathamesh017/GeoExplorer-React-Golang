import React, { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/SignUp'
import SpaceImg from '../imgs/space-background.jpg'

function LoginPage() {
  const [IsLogin, setIsLogin] = useState(false)
  return (
    <div
      className="h-screen w-screen flex flex-col bg-cover bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${SpaceImg})` }}
    >
      <h1 className="text-2xl text-[#00cc99] p-4">Welcome to GeoExplorer </h1>
      <div className="w-full  container my-auto flex justify-center items-center">
        {IsLogin ? (
          <Login setIsLogin={setIsLogin}></Login>
        ) : (
          <Signup setIsLogin={setIsLogin}></Signup>
        )}
      </div>
    </div>
  )
}

export default LoginPage
