import React, { useState } from 'react'
import axios from 'axios';
import Input from '../component/Form/Input'

const Login = () => {
  const [username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const onSubmit = async(event) => {
      event.preventDefault();
      const dataInfo = await axios.post('http://localhost:5001/api/student/login',{username,password});
      const data = await dataInfo.data;
      if(data.length > 0 ){
         localStorage.setItem("student_login",true);
         window.location.href = `/student/${username}`;
      }
      else
      {
        alert('Please provide valid email or password');
      }
  }
  
  return (
    <div className="flex justify-center md:p-20">
    <div className="bg-white shadow-md rounded px-10 pt-10 pb-10 mb-4 w-full md:w-96">
     <h3 className="block text-gray-700 text-sm font-bold mb-6 text-center">LOGIN</h3>
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <Input type="text" placeholder="Username" value={username} onChange = {(event)=> {setUsername(event.target.value)}}/>
      </div>
      <div className="mb-4">
        <Input  type="password" placeholder="**********" value={password} onChange={(event) => setPassword(event.target.value)}/>
       </div>
      <div className="w-full">
        <button className="bg-red-900 text-sm text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
          LOGIN
        </button>
      </div>
    </form>
  </div>
  </div>
  )
}

export default Login