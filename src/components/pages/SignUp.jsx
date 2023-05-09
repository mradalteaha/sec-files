import React from 'react'
import './SignUp.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function SignUp(props){
    
    async function handleClick(event){ //getting the element out of the form 
        try{
            event.preventDefault();
            let Account = {
                fullName:document.getElementById("fullName").value
                ,email : document.getElementById("email").value
                ,username:document.getElementById("username").value
                ,password:document.getElementById("password").value
            }


            const auth = getAuth();
            if(Account.email !=='' && Account.password !=='' && Account.username !=='' && Account.fullName !==''){
                createUserWithEmailAndPassword(auth, Account.email, Account.password)
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
            }
            else{
                alert('enter valid data for signUp')
            }
      
    
        }catch(err){

            console.log(err)
        }
    
    }
    



    return (<div className='container'>

        <h1> Sign Up</h1>
        <form onSubmit = {handleClick } >
        <input 
             id='fullName'
             name= "fullName"
            type="text" placeholder="Full Name" ></input>
            <input 
             id='email'
             name= "email"
            type="text" placeholder="Email" ></input>
            <input 
             id='username'
             name= "username"
            type="text" placeholder="UserName" ></input>
            <input 
             id='password'
             name= "password"
            type="password" placeholder="PassWord"></input>
     
          
          <br></br>
            
        <button type="submit">Submit</button>

        </form>

        </div>)

}
export default SignUp ;