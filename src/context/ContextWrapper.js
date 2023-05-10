import React, { useState } from "react";
import Context from "./Context";

export default function ContextWrapper(props) {

  const [currentUser, setCurrentUser] = useState(null);
  const [Name, setName] = useState(null);
 

 

  return (
    <Context.Provider
      value={{ currentUser,setCurrentUser,Name,setName}}
    >
      {props.children}
    </Context.Provider>
  );
}
