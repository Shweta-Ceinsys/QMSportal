// Helpdesk.js
import React, { useState, useEffect } from 'react';
import { Box, ButtonGroup, Grid, Typography, Button } from '@mui/material';
import Topbar from "../Topbar"; // Importing the Topbar component
import TicketDetail from './TicketDetail'; // Component to display ticket details
import noTicketsImage from '../../../images/helpdesk.png'; // Image for no tickets available
import TicketService from '../../../Services/adminticketService'; // Import the ticket service

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

  const handleResolveAndClose = async (ticketId) => {
    try {
      await TicketService.resolveAndCloseTicket(ticketId);
      fetchTickets(); // Refresh the ticket list after resolving
      alert('Ticket resolved and closed successfully.');
    } catch (error) {
      console.error('Error resolving and closing ticket:', error);
      alert(error.response?.data || 'Error closing ticket');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', boxShadow: 1 }}>
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

        {/* Display tickets */}
        <Grid item sx={{ mt: 3 }}>
          <Grid item display="flex" justifyContent='center' sx={{ mb: 2, marginLeft: "290px" }}>
            <Box >
              {tickets.length === 0 ? (
                <img
                  src={noTicketsImage}
                  alt="No tickets"
                  style={{
                    maxWidth: '150%',
                    maxHeight: '400px',
                    marginBottom: '16px',
                    opacity: 0.3,
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                />
              ) : (
                tickets.slice().reverse().map(ticket => (
                  <Box
                    key={ticket.id}
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      p: 2,
                      mb: 2,
                      width: '400px',
                      cursor: 'pointer',
                      boxShadow: 1,
                    }}
                    onClick={() => handleTicketClick(ticket)} // Show ticket details on click
                  >
                    <Typography variant="h6">{ticket.subject}</Typography>
                    <Typography variant="body2" color="textSecondary">{ticket.category}</Typography>
                    <Typography variant="body2">Submitted By: {ticket?.name}</Typography>
                    {status === 'active' && (
                      <Button onClick={() => handleResolveAndClose(ticket.id)} variant="outlined" sx={{ mt: 1, textAlign: 'right' }}>
                        Resolve & Close
                      </Button>
                    )}
                  </Box>
                ))
              )}
              {tickets.length === 0 && (
                <Typography variant="h6" color="#888">
                  {status === 'active' ? "Looks like you're all caught up! No active tickets to display." : 'Uh-oh! Looks like you’ve got a clean slate. No closed tickets here!'}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Render ticket detail modal if a ticket is selected */}
        {selectedTicket && (
          <TicketDetail ticket={selectedTicket} onClose={handleTicketDetailClose} />
        )}
      </Box>
    </Box>
  );
};

export default Helpdesk;
