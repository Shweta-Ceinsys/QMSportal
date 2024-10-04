import React, { useState, useEffect } from 'react';
import { Box, ButtonGroup, Grid, Typography, Button } from '@mui/material';
import Topbar from "../Topbar"; // Importing the Topbar component
import TicketDetail from './TicketDetail'; // Component to display ticket details
import noTicketsImage from '../../../images/helpdesk.jpeg'; // Image for no tickets available

const Helpdesk = () => {
  const [status, setStatus] = useState('active'); // Current status (active or closed)
  const [tickets, setTickets] = useState([]); // List of tickets
  const [selectedTicket, setSelectedTicket] = useState(null); // Selected ticket details

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/tickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleTicketDetailClose = () => {
    setSelectedTicket(null);
  };

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', boxShadow: 1 }}>
      <Topbar /> {/* Render the Topbar component */}
      <Box sx={{ mt: 15, mb: 5, p: 2 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {/* Status selection buttons */}
          <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
            <Grid item display="flex" justifyContent='center' sx={{ mb: 2 , marginLeft:"290px"}}>
              <ButtonGroup>
                <Button
                  onClick={() => handleStatusChange('active')}
                  variant={status === 'active' ? 'contained' : 'outlined'}
                  sx={{
                    backgroundColor: status === 'active' ? '#91b3ec' : 'transparent',
                    color: status === 'active' ? '#fff' : '#91b3ec',
                    '&:hover': {
                      backgroundColor: status === 'active' ? '#2196f3' : '#e3f2fd',
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
                    backgroundColor: status === 'closed' ? '#91b3ec' : 'transparent',
                    color: status === 'closed' ? '#fff' : '#91b3ec',
                    '&:hover': {
                      backgroundColor: status === 'closed' ? '#2196f3' : '#e3f2fd',
                    },
                    px: 4
                  }}
                >
                  History
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>

        {/* Display tickets */}
        <Grid item sx={{ mt: 3 }}>
          <Grid item display="flex" justifyContent='center' sx={{ mb: 2 , marginLeft:"290px"}}>
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '1px',
                padding: '32px',
                height: '600px',
                width: '100%',
                maxWidth: '1200px',
                backgroundColor: '#ffffff',
                boxShadow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'left',
                overflow: 'hidden',
              }}
            >
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
                tickets.slice().reverse().map(ticket => (
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
              {tickets.length === 0 && (
                <Typography variant="h6" color="#888">
                  {status === 'active' ? "Looks like there are no active tickets." : 'Uh-oh! No closed tickets found.'}
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
