import axios from "axios";
import authHeader from "./authHeader";
import config from "./config";

const API_URL = config.serverURL;

class TicketService {
    getAllTickets() {
    return axios.get(`${API_URL}tickets/getalltickets`, {
      headers: authHeader()
    });
  }

  getAllClosedTickets() {
    return axios.get(`${API_URL}tickets/closedtickets`, {
      headers: authHeader()
    });
  }

  resolveAndCloseTicket= (id) => {
    return axios.put(`${API_URL}tickets/resolveandclose`,null, {
        params: { id:id },// Pass Id as a query parameter
        headers: authHeader() 
    });
  }
}


export default new TicketService();