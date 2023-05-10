import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import GlobalContext from "../../context/Context";


function Heading(props){

    const {currentUser} =useContext(GlobalContext)

    const navigate = useNavigate()
    function gotoSignUp(){
        navigate('/SignUp')

    }

    function gotoSignIn(){
        navigate('/Signin')

    }

    function gotoSignHome(){
        navigate('/upload')

    }
    function gotoViewFiles(){
        //navigate('/viewfiles')

    }


    return (<header style={{display:'flex',flex:1,alignContent:"flex-start",alignItems:"flex-start",justifyContent:'left',textAlign:"left",flexDirection:'column'}}>
    
    <nav>
    <li style={{display:currentUser?'inline':'none'}} >
    <label onClick={gotoSignHome} style={{display:'inline'}} >Upload File</label>

    </li>

    <li style={{display:currentUser?'inline':'none'}} >
    <label onClick={gotoViewFiles} style={{display:'inline'}} >View Files</label>

    </li>
    <li style={{display:!currentUser?'inline':'none'}} >
    <label onClick={gotoSignIn} style={{display:'inline'}} >sign In</label>

    </li>
    
    <li style={{display:!currentUser?'inline':'none'}} >
        <label onClick={gotoSignUp} style={{display:'inline'}} >sign up</label>
        
    </li>
    </nav>

    </header>)
}

export default Heading;