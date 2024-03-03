
import { useState } from 'react';
import './App.css'
import { MdMailOutline } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";


function App() {
  const initialValue = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValue) //for form values

  const [formErrors, setFormErrors] = useState({})

  const [isSubmitted , setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    //e.target gives the input element itself
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    //we use [] in making object when key name is assigned from variable
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues))
    setIsSubmitted(true)
  }


  const validate = (values)=>{
    const errors = {}
    const regexEmail  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'/?.><,])(?=.*[^\s]).{8,}$/

    if(!values.username) {
      errors.username = "Username is required!"
    }
    if(!values.email){
      errors.email = "Email is required!"
    }
    else if(!regexEmail.test(values.email)){
      errors.email = "This is not a valid Email!"
    }
    if(!values.password) {
      errors.password = "Password is required!"
    }
    else if(values.password < 8){    
        errors.password = "Password too short!"
    } 
    else if(!regexPassword.test(values.password)){
      errors.password = "Password is too weak!"
    }
    return errors


  }


  return (
    <>
      <div className="formContainer">
        {(Object.keys(formErrors).length === 0 && isSubmitted) && alert("Login Success")  }

        <form onSubmit={handleSubmit}>
          <h1>LoginForm</h1>
          <div className="field">
            <CgProfile />
            <input type="text" name='username' placeholder='Username' value={formValues.username} onChange={handleChange} />
           {(Object.keys(formErrors).length !=0) && <p className='Error'>{formErrors.username}</p> }
          </div>
          <div className='field'>
            <MdMailOutline />
            <input type="email" placeholder='Email' value={formValues.email} name='email' onChange={handleChange} />
            {(Object.keys(formErrors).length !=0) && <p className='Error'>{formErrors.email}</p> }

          </div>
          <div className='field'>
            <MdLockOutline />
            <input type="password" placeholder='Password' value={formValues.password} name='password' onChange={handleChange} />
            {(Object.keys(formErrors).length !=0) && <p className='Error'>{formErrors.password}</p> }
          </div>

          <button>Submit</button>

        </form>
      </div>

    </>
  )
}

export default App
