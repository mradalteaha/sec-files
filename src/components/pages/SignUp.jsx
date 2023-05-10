import React from 'react'
import './SignUp.css'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {ref, uploadBytes} from 'firebase/storage'
import * as Name from 'w3name';
import {storage} from '../../firebase'
import { useNavigate } from "react-router-dom";


function SignUp(props){
    const navigate = useNavigate()
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
               const userData={
                displayName:Account.fullName,
                username:Account.username
               }
                createUserWithEmailAndPassword(auth, Account.email, Account.password)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const userStorageRef = ref(storage, `Keys/${user.uid}/keys`);


                  updateProfile(user,userData).then(async (res)=>{//updating user profile data
                    Name.create().then(async name =>{
                        console.log('name has been created')
                       const nameBytes =  name.key.bytes

                        uploadBytes(userStorageRef, nameBytes).then(res =>{
                            alert('user keys saved')
                            navigate('/upload')

                        }); 
                    

                    }).catch(err=>{
                        console.log('error on creating name ')
                        alert('error on creating name ')
                    });
                  }).catch(err =>{
                    alert(err)
                  })
                    // ...
                })
                .catch((error) => {
                    //const errorCode = error.code;
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
    

    function gotoSignIn(){
        navigate('/Signin')

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
        <h5>I have account <span onClick={gotoSignIn}>SignIn</span></h5>


        </div>)

}
export default SignUp ;