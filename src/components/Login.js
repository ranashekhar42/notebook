import React,{useState} from 'react'
import {useNavigate} from 'react-router'


function Login(props) {
    const [credentials,setCredentials]=useState({email:'',password:''});
let history=useNavigate();    

    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
            }

    const handleSubmit= async (e)=>{
e.preventDefault();
 const response=await fetch('http://localhost:5000/api/auth/login',{
method:'POST',
headers:{
'Content-Type':'application/json',
  
},
body:JSON.stringify({email:credentials.email,password:credentials.password})

  });
  const json= await response.json();
  console.log(json)
  if (json.success) {
    localStorage.setItem('token',json.authToken);
    history("/")
    props.showAlert('Login Successful','success')
  }else{
    props.showAlert('Invalid Credentials','danger')
  }
    }
  return (
    <div className="container mt-3">
      <h2 className='text-center my-2'>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onchange} aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onchange} minLength={6} required/>
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
