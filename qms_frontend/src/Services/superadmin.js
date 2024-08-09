import axios from "axios";
import authHeader from "./authHeader";
import { Component } from "react";
import config from "./config";

const API_URL = config.serverURL; 


class SuperAdminService extends Component {


addUser =(user)=>{
  return axios.post(API_URL + "api/addUser", user,{ headers: authHeader() });
}



  getAllUsers = () => {
    return axios.get(API_URL + "api/getAll", { headers: authHeader() });
  };


  modifyUser =(editUser)=>{
    return axios.put(API_URL + "api/modifyUser",editUser,{ headers: authHeader() });
  }

  deleteUser = (id) => {
    return axios.delete(API_URL + "api/deleteUser",{
        params: {
            id: id // Use the passed dealer parameter here
        },
        headers: authHeader() // Assuming authHeader() returns the necessary authorization headers
    });


};




changePassword =(id,oldPassword,newPassword)=>{
 
  return axios.post(API_URL + "api/changePassword ",{id,oldPassword,newPassword}, {
   
    headers: authHeader() });
  

    
}


addVersion =(addVersions)=>{
  return axios.post(API_URL + "api/addVersion",addVersions,{ headers: authHeader() });
}

getVesions = () => {
  return axios.get(API_URL + "api/getVesions", { headers: authHeader() });
};


getDir = (versionId) => {
  return axios.get(API_URL + "api/getDir", {params: {
    VersionId: versionId // Use the passed dealer parameter here
}, headers: authHeader() });
};

getFilesByDirId = (Vid) => {
  return axios.get(API_URL + "api/getFilesByDirId",{params: {
    dirId:Vid // Use the passed dealer parameter here
}, headers: authHeader() });
};

uploadBulkFiles =(formData)=>{
  return axios.post(API_URL + "api/uploadBulkFiles",formData,{ headers: authHeader() });
}


}

export default new SuperAdminService();