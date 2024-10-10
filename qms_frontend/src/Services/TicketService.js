import axios from "axios";
import authHeader from "./authHeader";
import config from "./config";

const API_URL = config.serverURL;

class TicketService {
  createTicket(formData) {
    return axios.post(`${API_URL}tickets/createticket`, formData,null, {
      headers: authHeader()
    });
  }

  getAllActiveTickets= (UserId) => {
    return axios.get(`${API_URL}tickets/gettickets`,{
      params:{
        userid:UserId
      },
      headers: authHeader() 
    });
  }
  getTicketHistory= (UserId) => {
    return axios.get(`${API_URL}tickets/history`, {
      params:{
        userid:UserId
      },
        headers: authHeader() // Send userId as a query parameter
    });
  }
  withdrawTicket= (id) => {
    return axios.put(`${API_URL}tickets/withdraw`, null, {
      params:{
        id:id
      },
        headers: authHeader() // Send userId as a query parameter
    });
  }

}

export default new TicketService();

  