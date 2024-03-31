import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup(props) {
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    cpassword:""
  })
  const [error,setError]=useState({
    showError:false,
    showErrorMsg:"",
  })
  const navigate=useNavigate();


  async function handleSignup(){
    try {
   
    const {name,email,password,cpassword}=user;
    if(!name || !email || !password || !cpassword){
         setError({showError:true,showErrorMsg:"Enter Complete Details"})
        return;
    }
    if( password!==cpassword){
      setError({showError:true,showErrorMsg:"Passwords Doesn't Match"})
      return;
    }
    setError({showError:false,showErrorMsg:""})
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      {name,email,password,location:[]}
    )
    console.log(response);
    localStorage.setItem('token', JSON.stringify(response.data.user.token))
    navigate("/maps")


  } catch (err) {
    console.log(err);
    setError({showError:true,showErrorMsg:err.response.data.message});
    } 

  }
  return (
    <div className="w-full  text-slate-900 flex justify-center">
      <div className="w-2/4 md:w-1/4 p-4 flex flex-col bg-slate-100 shadow-md gap-2 rounded">
        <div className="flex flex-col gap-2">
          <label>Name</label>
          <input
            type="text"
            placeholder="enter name"
            onChange={(e)=>{setUser({...user,name:e.target.value}) }}
            className="border border-slate-700 p-1 rounded"
          ></input>
          <label>Email</label>
          <input
            type="text"
            placeholder="enter email"
            onChange={(e)=>{setUser({...user,email:e.target.value}) }}
            className="border border-slate-700 p-1 rounded"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            placeholder="enter password"
            onChange={(e)=>{setUser({...user,password:e.target.value}) }}
            className="border border-slate-700 p-1 rounded"
          ></input>
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="enter password"
            onChange={(e)=>{setUser({...user,cpassword:e.target.value}) }}
            className="border border-slate-700 p-1 rounded"
          ></input>
        </div>
        {error.showError&& <p className='text-red-700'>{error.showErrorMsg}</p>}
        <div className="button-classw-full mt-8">
          <button onClick={()=>{handleSignup()}} className="w-full  bg-[#00cc99] hover:bg-[#00b386]  py-2 px-6 rounded text-white">
            Signup
          </button>
        </div>
        <div className="flex items-center justify-between button-class mt-2">
          <span>Account Already Exists?</span>
          <button className=" bg-[#00cc99] hover:bg-[#00b386] py-2 px-6 rounded text-white" onClick={()=>{props.setIsLogin(true)}}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup