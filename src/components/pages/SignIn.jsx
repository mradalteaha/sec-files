import React , {useContext} from "react"
import './SignIn.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getBytes, ref} from 'firebase/storage'
import {storage} from '../../firebase'
import * as Name from 'w3name';
import GlobalContext from "../../context/Context";
import { useNavigate } from "react-router-dom";
function SignIn() {

  const {setCurrentUser,setName} =useContext(GlobalContext)
  const navigate = useNavigate()

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
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const storageRef =ref(storage, `Keys/${user.uid}/keys`);
                    getBytes(storageRef).then( async (bytes)=>{
                      console.log('bytes retrieved')
                      console.log(typeof(bytes))
                      const keys = new Uint8Array(bytes)
                      console.log(bytes)
                      Name.from(keys).then(name =>{
                        setName(name)
                        setCurrentUser(user)
                        navigate('/upload')
                        //set name into local storage
                      }).catch(err=>{
                        console.log(err)
                        alert('something went wrong')
                      })

                    }).catch(err =>{
                      console.log('error occured and couldnt get data')
                      console.log(err)
                      alert('error occured and couldnt get data')
                    })
                    // ...
                })
                .catch((error) => {
                   // const errorCode = error.code;
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
    function gotoSignUp(){
      navigate('/SignUp')

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
      <h5>don't have account <span onClick={gotoSignUp} >SignUp</span></h5>

    </div>
  )

}



export default SignIn;