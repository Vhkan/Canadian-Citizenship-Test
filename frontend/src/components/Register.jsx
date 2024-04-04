import { useState } from "react";
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

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if(!username || !firstName || !lastName || !email || !password) {
      setErrorMessage('Please, fill in all the fields to register!')
    } else {
      setErrorMessage(""); //clear the error message
    }

    console.log({ username, firstName, lastName, email, password });
    
    //Clear the fields
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
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

        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
