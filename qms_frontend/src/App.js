
import './App.css';
import { Routes, Route } from "react-router-dom";
import UserManagement from './components/SuperAdmin/UserManagement';
import Login from './components/Login/Login';


function App() {
  return (
    <div className="App">
      <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
           
              
              
             <>


          <Route path="/user" element={<UserManagement role="SUPER_ADMIN"/>} />
              </>
            </Routes>
    </div>
  );
}

export default App;
