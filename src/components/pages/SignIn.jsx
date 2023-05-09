import React from "react"
import './SignIn.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {


    async function handleClick(event) { //getting the element out of the form 
        try{
            event.preventDefault();

            let Account = {
                email: document.getElementById("username").value
                , password: document.getElementById("password").value
            }
            

            if (Account.email !== '') {
                const auth = getAuth();
                signInWithEmailAndPassword(auth, Account.email, Account.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                });
            }else{
                alert('enter valid data for login')
            }

        }
        catch(err){
        console.log(err)
        }


    }


  return (
    <div className="container">

      <h1> Sign In</h1>
      <form onSubmit={handleClick} >

        <input
          id='username'
          name="username"
          type="text" placeholder="Email"></input>
        <input
          id='password'
          name="password"
          type="password" placeholder="PassWord"></input>


        <br></br>

        <button type="submit">Submit</button>

      </form>

    </div>
  )

}



export default SignIn;