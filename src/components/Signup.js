import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Signup(props) {

    const [credentials,setCredentials]=useState({name:'',email:'',password:'',cpassword:''});
    let history=useNavigate();    
    
        const onchange=(e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value})
                }
    
        const handleSubmit= async (e)=>{
    e.preventDefault();
     const response=await fetch('http://localhost:5000/api/auth/createUser',{
    method:'POST',
    headers:{
    'Content-Type':'application/json',
      
    },
    body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    
      });
      const json= await response.json();
      console.log(json)
      if (json.success) {
        localStorage.setItem('token',json.authToken);
        props.showAlert('Signup Successfull','success')
        history("/login")
      }
      else{
        props.showAlert('Invalid Details','danger')
      }
    }
  return (
    <div className="container mt-3">
      <h2 className='text-center my-2'>SignUp to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onchange} minLength={5} required/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onchange} aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onchange} minLength={6} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onchange} minLength={6} required/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup
