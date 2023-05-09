import React from "react";
import { useNavigate } from "react-router-dom";




function Heading(props){

    const navigate = useNavigate()
    function gotoSignUp(){
        navigate('/SignUp')

    }

    function gotoSignIn(){
        navigate('/Signin')

    }

    function gotoSignHome(){
        navigate('/')

    }
    function gotoViewFiles(){
        //navigate('/viewfiles')

    }


    return (<header style={{display:'flex',flex:1,alignContent:"flex-start",alignItems:"flex-start",justifyContent:'left',textAlign:"left",flexDirection:'column'}}>
    
    <nav>
    <li >
    <label onClick={gotoSignHome} style={{display:'inline'}} >Upload File</label>

    </li>

    <li >
    <label onClick={gotoViewFiles} style={{display:'inline'}} >View Files</label>

    </li>
    <li >
    <label onClick={gotoSignIn} style={{display:'inline'}} >sign In</label>

    </li>
    
    <li >
        <label onClick={gotoSignUp} style={{display:'inline'}} >sign up</label>
        
    </li>
    </nav>

    </header>)
}

export default Heading;