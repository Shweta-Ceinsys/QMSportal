import axios from "axios";
import authHeader from "./authHeader";
import config from "./config";
import { Component } from "react";

const API_URL = config.serverURL;

class TicketService extends Component{
  createticket =(ticketData)=>{
    return axios.post(API_URL + "tickets/createticket", ticketData,{ headers: authHeader() });
  }
  
  // createticket =(ticketData) => {
  //   const formData = new FormData();
  //   Object.keys(ticketData).forEach(key => {
  //     formData.append(key, ticketData[key]);
  //   });

    
  //     const response =axios.post(`${API_URL}/tickets/createticket`, formData, {
  //         header: authHeader() // Include authorization if needed
  //       },
  //     }
  //     return response.data; // Return the created ticket data
  //   } 

  // getAllTickets = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/tickets/gettickets`, {
  //       headers: authHeader() // Include authorization if needed
  //     });
  //     return response.data; // Return the list of tickets
  //   } catch (error) {
  //     console.error('Error fetching tickets:', error);
  //     throw error; // Propagate the error for further handling
  //   }
  // };

}

export default new TicketService();
