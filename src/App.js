import './App.css';
import HomePage from './components/pages/HomePage';
import { Routes,Route } from "react-router-dom";
import Heading from './components/common/Heading';
import SignIn from './components/pages/SignIn';
import { getAuth } from "firebase/auth";
import ViewFiles from './components/pages/ViewFiles';

import SignUp from './components/pages/SignUp';
function App() {

  const auth = getAuth()
  const currentUser = auth.currentUser
  return (
    <Routes>
      <Route path="/" element={currentUser? <><Heading/><HomePage/></> : <><Heading/><SignIn/>  </>}/>
      <Route path="/upload" element={<><Heading/><HomePage/></>}/>
      <Route path="/SignIn" element={<><Heading/><SignIn/>  </>}/>
      <Route path="/SignUp" element={<><Heading/><SignUp/>  </>}/>
      <Route path="/viewfiles" element={<><Heading/><ViewFiles/>  </>}/>


      
    </Routes>
  );
}

export default App;