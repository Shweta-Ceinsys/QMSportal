

import { Routes, Route } from "react-router-dom";
import UserManagement from './components/SuperAdmin/UserManagement';
import Login from './components/Login/Login';
import QmsLibrary from "./components/SuperAdmin/QMSLibrary";
import ForgotPassword from "./components/Login/ForgotPassword";
import FolderCards from "./components/SuperAdmin/QMSLibrary/Card/FolderCards";


function App() {
  return (
    
      <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              
             <>


          <Route path="/user" element={<UserManagement role="SUPER_ADMIN"/>} />
          <Route path="/qmsLibrary" element={<QmsLibrary role="SUPER_ADMIN"/>} />
          <Route path="/fCards" element={<FolderCards role="SUPER_ADMIN"/>} />
              </>
     </Routes>
   
  );
}

export default App;
