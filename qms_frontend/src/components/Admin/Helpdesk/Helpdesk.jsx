import React, { useState, useEffect } from 'react';
import { Box, ButtonGroup, Grid, Typography, Button } from '@mui/material';
import Topbar from "../Topbar"; // Importing the Topbar component
import TicketDetail from './TicketDetail'; // Component to display ticket details
import noTicketsImage from '../../../images/helpdesk.png'; // Image for no tickets available
import TicketService from '../../../Services/adminticketService'; // Import the ticket service
import { toast,ToastContainer } from 'react-toastify';
const Helpdesk = () => {
  const [status, setStatus] = useState('active'); // Current status (active or closed)
  const [tickets, setTickets] = useState([]); // List of tickets
  const [selectedTicket, setSelectedTicket] = useState(null); // Selected ticket details

  useEffect(() => {
    fetchTickets();
  }, [status]); // Fetch tickets based on the current status

  const fetchTickets = async () => {
    try {
      const response = status === 'active'
        ? await TicketService.getAllTickets()
        : await TicketService.getAllClosedTickets();
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleTicketDetailClose = () => {
    setSelectedTicket(null);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return '#4caf50'; // Green for open tickets
      case 'WITHDRAWN':
        return '#000000'; // Orange for in-progress tickets
      case 'CLOSED':
        return '#f44336'; // Red for closed tickets
      default:
        return '#000'; // Default color
    }
  };
  const handleResolveAndClose = async (ticketId) => {
    try {
      await TicketService.resolveAndCloseTicket(ticketId);
      fetchTickets(); // Refresh the ticket list after resolving
      toast.success('Ticket resolved and closed successfully.'); // Use toast for success notification
    } catch (error) {
      console.error('Error resolving and closing ticket:', error);
      toast.error(error.response?.data || 'Error closing ticket'); // Use toast for error notification
    }
  };
  

  return (
    <Box sx={{ minHeight: '100vh', boxShadow: 1 }}backgroundColor = "#eef0f6">
      <Topbar /> {/* Render the Topbar component */}
      <Box sx={{ mt: 15, mb: 5, p: 2 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {/* Status selection buttons */}
          <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
            <Grid item display="flex" justifyContent='center' sx={{ mb: 2, marginLeft: "290px" }}>
              <ButtonGroup>
                <Button
                  onClick={() => handleStatusChange('active')}
                  variant={status === 'active' ? 'contained' : 'outlined'}
                  sx={{
                    backgroundColor: status === 'active' ? '#babded' : 'transparent',
                    color: status === 'active' ? '#fff' : '#91b3ec',
                    '&:hover': {
                      backgroundColor: status === 'active' ? '#babded' : '#e3f2fd',
                    },
                    px: 4
                  }}
                >
                  Active
                </Button>
                <Button
                  onClick={() => handleStatusChange('closed')}
                  variant={status === 'closed' ? 'contained' : 'outlined'}
                  sx={{
                    backgroundColor: status === 'closed' ? '#babded' : 'transparent',
                    color: status === 'closed' ? '#fff' : '#babded',
                    '&:hover': {
                      backgroundColor: status === 'closed' ? '#babded' : '#e3f2fd',
                    },
                    px: 4
                  }}
                >
                  Closed
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>

        <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} justifyContent="center" sx={{ mt: 3 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {/* Grid for no tickets image */}
            {tickets.length === 0 && (
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2, marginLeft: "290px"}}>
                <img
                  src={noTicketsImage}
                  alt="No tickets"
                  style={{
                    maxWidth: '150%',
                    maxHeight: '400px',
                    opacity: 0.3,
                    display: 'block',
                  }}
                />
              </Grid>
            )}

            {/* Grid for displaying tickets */}
            <Grid item xs={12} sx={{ px: 2, marginLeft: '290px'}}>
  <Box>
    {tickets.length > 0 ? (
     <Grid container spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
     {tickets.slice().reverse().map(ticket => (
       <Grid item key={ticket.id} xs={12} sm={6} md={4} lg={3}>
         <Box
           sx={{
             border: '1px solid #ccc',
             borderRadius: '4px',
             p: 1, // Reduced padding
             mb: 1, // Reduced bottom margin
             cursor: 'pointer',
             boxShadow: 2, // Adjust shadow to make it lighter
             width: '90%', // Maintain width
             maxWidth: '350px', // Maintain maximum width
             mx: 'auto', // Center the box horizontally
             backgroundColor: 'whitesmoke'
           }}
           onClick={() => handleTicketClick(ticket)} // Show ticket details on click
         >
                          <Typography variant="h6">{ticket.subject}</Typography>
                          <Typography variant="body2" color="textSecondary">{ticket.category}</Typography>
                          
                          <Typography variant="body2">Submitted By: {ticket?.name}</Typography>
                          
                          {status === 'active' && (
                            <Button onClick={() => handleResolveAndClose(ticket.id)} variant="outlined" sx={{ mt: 1 }}>
                              Resolve & Close
                            </Button>
                          )}
                           <Typography variant='body2' color="textSecondary" sx={{ mt: 2, textAlign: 'right', color: getStatusColor(ticket.status)  }}>{ticket.status}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="h6" color="#888" sx={{ textAlign: 'center', mt: 3 }}>
                    {status === 'active' ? "Looks like you're all caught up! No active tickets to display." : 'Uh-oh! Looks like you’ve got a clean slate. No closed tickets here!'}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Render ticket detail modal if a ticket is selected */}
        {selectedTicket && (
          <TicketDetail ticket={selectedTicket} onClose={handleTicketDetailClose} />
        )}
      </Box>
      <ToastContainer style={{ zIndex: "1000000" }} />
    </Box>
  );
};

export default Helpdesk;
