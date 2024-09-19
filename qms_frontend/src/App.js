
import { Routes, Route } from "react-router-dom";
import Protected from "./Protected/Protected";
import UserManagement from './components/SuperAdmin/UserManagement';
import Login from './components/Login/Login';
import QmsLibrary from "./components/SuperAdmin/QMSLibrary";
import ForgotPassword from "./components/Login/ForgotPassword";
import FolderCards from "./components/SuperAdmin/QMSLibrary/Card/FolderCards";
import ListFiles from "./components/SuperAdmin/QMSLibrary/Card/FolderCards/ListFiles";
import AdminQmsLibrary from "./components/Admin/QmsLibraryAdmin";

import AdminFolderCards from "./components/Admin/QmsLibraryAdmin/Card/FolderCards";
 import AdminListFiles from "./components/Admin/QmsLibraryAdmin/Card/FolderCards/ListFiles";
 import UserQmsLibrary from "./components/User/QmsLibraryUser";
import UserFolderCards from "./components/User/QmsLibraryUser/Card/FolderCards";
import UserListFiles from "./components/User/QmsLibraryUser/Card/FolderCards/ListFiles";

function App() {
  return (
    
      <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              
             <>

{/* SuperAdmin */}

          {/* <Route exact path="/user" element={<Protected cmp={UserManagement} role="SUPER_ADMIN"/>} ></Route>
          <Route exact path="/qmsLibrary" element={<Protected cmp={QmsLibrary} role="SUPER_ADMIN"/>} ></Route>
          <Route exact path="/fCards" element={<Protected cmp={FolderCards} role="SUPER_ADMIN"/>} ></Route>
          <Route exact path="/fLists" element={<Protected cmp={ListFiles} role="SUPER_ADMIN"/>} ></Route> */}


      <Route path="/user" element={<UserManagement role="SUPER_ADMIN"/>} />
      <Route path="/qmsLibrary" element={<QmsLibrary role="SUPER_ADMIN"/>} />
      <Route path="/fCards" element={<FolderCards role="SUPER_ADMIN"/>} />
      <Route path="/fLists" element={<ListFiles role="SUPER_ADMIN"/>} />


{/* Admin */}

          {/* <Route exact path="/aQmsLibrary" element={<Protected cmp={AdminQmsLibrary} role="ADMIN"/>} ></Route>
          <Route exact path="/afCards" element={<Protected cmp={AdminFolderCards} role="ADMIN"/>} ></Route>
          <Route exact path="/afLists" element={<Protected cmp={AdminListFiles} role="ADMIN"/>} ></Route> */}
     
          <Route path="/aQmsLibrary" element={<AdminQmsLibrary role="ADMIN"/>} />
          <Route path="/afCards" element={<AdminFolderCards role="ADMIN"/>} />
          <Route path="/afLists" element={<AdminListFiles role="ADMIN"/>} />

     
{/* User */}
          {/* <Route exact path="/uQmsLibrary" element={<Protected cmp={UserQmsLibrary} role="USER"/>} ></Route>
          <Route exact path="/ufCards" element={<Protected cmp={UserFolderCards} role="USER"/>} ></Route>
          <Route exact path="/ufLists" element={<Protected cmp={UserListFiles} role="USER"/>} ></Route> */}

          <Route path="/uQmsLibrary" element={<UserQmsLibrary role="USER"/>} />
          <Route path="/ufCards" element={<UserFolderCards role="USER"/>} />
          <Route path="/ufLists" element={<UserListFiles role="USER"/>} />     
              </>
     </Routes>
   
  );
}

export default App;
