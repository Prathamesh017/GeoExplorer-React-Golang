import React, { useState} from 'react'
import axios from "axios";
import  {useNavigate}from "react-router-dom";
function Login(props) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState({
    showError: false,
    showErrorMsg: '',
  })
  const navigate=useNavigate();
 

  async function handleLogin() {
    try {
      const { email, password } = user
      if (!email || !password) {
        setError({ showError: true, showErrorMsg: 'Enter Complete Details' })
        return
      }
      setError({ showError: false, showErrorMsg: '' })
      console.log(process.env.REACT_APP_API_URL);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        user,
      )
      console.log(response);
      localStorage.setItem('token', JSON.stringify(response.data.token))
      navigate("/maps")
    
    } catch (err) {
      console.log(err);
      setError({ showError: true, showErrorMsg: err.response.data.message })
    }
  }

  return (
    <div className="w-full  text-slate-900 flex justify-center">
      <div className="w-2/4 md:w-1/4 p-4 flex flex-col bg-slate-100 shadow-md gap-2 rounded">
        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="text"
            placeholder="enter email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value })
            }}
            className="border border-slate-700 p-1 rounded"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            placeholder="enter password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value })
            }}
            className="border border-slate-700 p-1 rounded"
          ></input>
        </div>
        {error.showError && (
          <p className="text-red-700">{error.showErrorMsg}</p>
        )}
        <div className="button-classw-full mt-8">
          <button
            onClick={() => {
              handleLogin()
            }}
            className="w-full bg-[#00cc99] hover:bg-[#00b386]  py-2 px-6 rounded text-white"
          >
            Login
          </button>
        </div>
        <div className="flex items-center justify-between button-class mt-2">
          <span>Account Doesn't Exists?</span>
          <button
            className=" bg-[#00cc99] hover:bg-[#00b386] py-2 px-6 rounded text-white"
            onClick={() => {
              props.setIsLogin(false)
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login