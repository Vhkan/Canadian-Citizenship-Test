import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Toast package for user notifications
// import { toast } from 'react-toastify';

const Register = () => {

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const [errorMessage, setErrorMessage ] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //redirection 
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if(!username || !firstName || !lastName || !email || !password) {
      setErrorMessage('Please, fill in all the fields to register!')
      return; //stop execution when validation fails
    }

    const userRegData = { username, firstName, lastName, email, password };

    try {
      const URL = "http://localhost:9000/register";
      const settings = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(userRegData)
      };
      const response = await fetch(URL, settings);

      if(!response.ok) {
        throw new Error("Registrations is failed. Try again!")
      }

      const result = await response.json();
      console.log("Registration result:", result);

      //Successfull registration
      setSuccessMessage('Successfull Registration!');
      setErrorMessage("");

      //Redirecting a new registered user to the login page
      setTimeout(() => {
        navigate('/login')
      }, 4000);
      
      //Clear the fields
      setUsername("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      
    } catch (error) {
      console.log("registration failed!", error);
      setErrorMessage('Registration failed. Please try again.');
    }
    console.log("New user:",{ username, firstName, lastName, email, password });
  };
  

  
  return (
    <div>
      <h5>Please fill in the registration form📝 below👇</h5>
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" name="username" value={username} onChange={handleUsername} />
        </div>

        <div>
          <label htmlFor="first_name">First name</label>
          <input id="first_name" type="text" name="first_name" value={firstName} onChange={handleFirstName}/>
        </div>

        <div>
          <label htmlFor="last_name">Last name</label>
          <input id="last_name" type="text" name="last_name" value={lastName} onChange={handleLastName}/>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={email} onChange={handleEmail}/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={password} onChange={handlePassword}/>
        </div>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}

        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
