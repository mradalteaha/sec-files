import React from "react";

const GlobalContext = React.createContext({
  currentUser:null,
  setCurrentUser:()=>{},
  Name:null,
  setName:()=>{},
  
});

export default GlobalContext;