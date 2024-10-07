import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import Topbar from "../Topbar"; // Importing the Topbar component
import TicketDetail from './TicketDetail'; // Component to display ticket details
import TicketFormDialog from './TicketFormDialog'; // Component for ticket creation form
import noTicketsImage from '../../../images/helpdesk.png'; // Image for no tickets available

const Helpdesk = () => {
  // State to manage the current status (active or closed)
  const [status, setStatus] = useState('active');

  // State to manage the dialog for creating a new ticket
  const [open, setOpen] = useState(false);

  // State to hold the list of tickets
  const [tickets, setTickets] = useState([]);

  // State to hold the selected ticket details for viewing
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Effect to initialize user data on component mount
  useEffect(() => {
    const userName = sessionStorage.getItem('userName') || ''; // Get user name from session storage
    const userEmail = sessionStorage.getItem('userEmail') || ''; // Get user email from session storage
    // Additional initialization logic can go here
  }, []);

  // Function to handle status change (active or closed)
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus); // Update the status state
  };

  // Function to open the new ticket dialog
  const handleClickOpen = () => {
    setOpen(true); // Set the open state to true
  };

  // Function to close the ticket dialog
  const handleClose = () => {
    setOpen(false); // Set the open state to false
  };

  // Function to handle ticket click and set the selected ticket
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket); // Update the selected ticket state
  };

  // Function to close the ticket detail dialog
  const handleTicketDetailClose = () => {
    setSelectedTicket(null); // Reset selected ticket state
  };

  // Function to withdraw a ticket
  const handleWithdrawTicket = () => {
    setTickets((prev) => prev.filter(ticket => ticket.id !== selectedTicket.id)); // Remove the selected ticket from the list
    handleTicketDetailClose(); // Close the ticket detail dialog
  };

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', boxShadow: 1 }}>
      <Topbar /> {/* Render the Topbar component */}
      <Box sx={{ mt: 10, mb: 5, p: 2 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {/* Button to create a new ticket */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
          <Button 
        variant="contained" 
        sx={{ backgroundColor: '#E6E6FA', color: '#000', '&:hover': { backgroundColor: '#D8BFD8' } }} 
        onClick={handleClickOpen}
    >
        + New Request
    </Button>
          </Grid>

          {/* Status selection buttons */}
          <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
            <Grid item display="flex" justifyContent='center' sx={{ mb: 2, marginLeft:"290px"  }}>
              <ButtonGroup>
                <Button
                  onClick={() => handleStatusChange('active')}
                  variant={status === 'active' ? 'contained' : 'outlined'}
                  sx={{ minWidth: '150px', backgroundColor: status === 'active' ? '#babded' : 'transparent', color: status === 'active' ? '#fff' : '#babded', '&:hover': { backgroundColor: status === 'active' ? '#babded' : '#e3f2fd', }, px: 4 }}
                >
                  Active
                </Button>
                <Button
                  onClick={() => handleStatusChange('closed')}
                  variant={status === 'closed' ? 'contained' : 'outlined'}
                  sx={{ minWidth: '150px', backgroundColor: status === 'closed' ? '#babded' : 'transparent', color: status === 'closed' ? '#fff' : '#babded', '&:hover': { backgroundColor: status === 'closed' ? '#babded' : '#e3f2fd', }, px: 4 }}
                >
                  History
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>

        {/* Display tickets */}
        <Grid item sx={{ mt: 3 }}>
          <Grid item display="flex" justifyContent='center' sx={{ mb: 2 , marginLeft:"290px"  }}>
            <Box>
              {/* Check if there are tickets to display */}
              {tickets.length === 0 ? (
                <img
                  src={noTicketsImage}
                  alt="No tickets"
                  style={{
                    maxWidth: '150%',
                    maxHeight: '300px',
                    marginBottom: '16px',
                    opacity: 0.3,
                    filter: 'grayscale(100%)',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                />
              ) : (
                tickets.slice().reverse().map(ticket => ( // Reverse the order here for latest first
                  <Box
                    key={ticket.id}
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      p: 2,
                      mb: 2,
                      width: '100%',
                      cursor: 'pointer',
                      boxShadow: 1,
                    }}
                    onClick={() => handleTicketClick(ticket)} // Show ticket details on click
                  >
                    <Typography variant="h6">{ticket.subject}</Typography>
                    <Typography variant="body2" color="textSecondary">{ticket.category}</Typography>
                  </Box>
                ))
              )}
              {/* Message if there are no tickets */}
              {tickets.length === 0 && (
                <Typography variant="h6" color="#888">
                  {status === 'active' ? "Looks like you're all caught up! No active tickets to display." : 'Uh-oh! Looks like you’ve got a clean slate. No history here!'}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Render ticket detail modal if a ticket is selected */}
        {selectedTicket && (
          <TicketDetail ticket={selectedTicket} onClose={handleTicketDetailClose} onWithdraw={handleWithdrawTicket} />
        )}

        {/* Render ticket form dialog for creating a new ticket */}
        <TicketFormDialog open={open} onClose={handleClose} setTickets={setTickets} />
      </Box>
    </Box>
  );
};

export default Helpdesk;
