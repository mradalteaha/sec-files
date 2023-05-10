import './App.css';
import HomePage from './components/pages/HomePage';
import { Routes,Route } from "react-router-dom";
import Heading from './components/common/Heading';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
function App() {


  return (
    <Routes>
      <Route path="/" element={<><Heading/><SignIn/>  </>}/>
      <Route path="/upload" element={<><Heading/><HomePage/>   </>}/>
      <Route path="/SignIn" element={<><Heading/><SignIn/>  </>}/>
      <Route path="/SignUp" element={<><Heading/><SignUp/>  </>}/>
    </Routes>
  );
}

export default App;