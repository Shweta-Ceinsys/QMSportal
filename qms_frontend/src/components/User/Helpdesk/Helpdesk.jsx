import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import Topbar from "../Topbar";
import TicketDetail from './TicketDetail';
import TicketFormDialog from './TicketFormDialog';
import noTicketsImage from '../../../images/helpdesk.png';
import { toast } from 'react-toastify';
import TicketService from '../../../Services/TicketService'; 

const Helpdesk = () => {
  const [status, setStatus] = useState('active');
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const fetchActiveTickets = async () => {
    const UserId = sessionStorage.getItem('UserId');
    try {
      const response = await TicketService.getAllActiveTickets(UserId);
      setTickets(response.data || []);
    } catch (error) {
      console.error('Error fetching active tickets:', error);
      toast.error("Error fetching active tickets.");
      setTickets([]);
    }
  };

  const fetchTicketHistory = async () => {
    const UserId = sessionStorage.getItem('UserId');
    try {
      const response = await TicketService.getTicketHistory(UserId);
      setTickets(response.data);
      // const closedTickets = response.data?.filter(ticket =>
      //   ticket.status === 'Closed' || ticket.status === 'Withdrawn'
      // ) || [];
      // setTickets(closedTickets);
    } catch (error) {
      console.error('Error fetching ticket history:', error);
      toast.error("Error fetching ticket history.");
      setTickets([]);
    }
  };
  useEffect(() => {
    if (status === 'active') {
      fetchActiveTickets();
    } else {
      fetchTicketHistory();
    }
  }, [status]);
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleTicketDetailClose = () => {
    setSelectedTicket(null);
  };

  const handleWithdrawTicket = async () => {
    try {
      await TicketService.withdrawTicket(selectedTicket.id);
      setHistory([...history, selectedTicket]);
      setTickets(tickets.filter(ticket => ticket.id !== selectedTicket.id));
      setSelectedTicket(null);
      toast.success("Ticket withdrawn successfully.");
    } catch (error) {
      console.error('Error withdrawing ticket:', error);
      toast.error("Failed to withdraw ticket.");
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', boxShadow: 1 }}>
      <Topbar />
      <Box sx={{ mt: 10, mb: 5, p: 2 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#E6E6FA', color: '#000', '&:hover': { backgroundColor: '#D8BFD8' } }} 
              onClick={handleClickOpen}
            >
              + New Request
            </Button>
          </Grid>
          <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
            <Grid item display="flex" justifyContent='center' sx={{ mb: 2, marginLeft: "290px" }}>
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

        <Grid item sx={{ mt: 3 }}>
          <Grid item display="flex" justifyContent='center' sx={{ mb: 2, marginLeft: "290px" }}>
            <Box>
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
                    onClick={() => handleTicketClick(ticket)}
                  >
                    <Typography variant="h6">{ticket.subject}</Typography>
                    <Typography variant="body2" color="textSecondary">{ticket.category}</Typography>
                    <Typography variant='body2' color="textSecondary" sx={{ mt: 2, textAlign: 'right' }}>{ticket.status}</Typography>
                  </Box>
                ))
              )}
              {tickets.length === 0 && (
                <Typography variant="h6" color="#888">
                  {status === 'active' ? "Looks like you're all caught up! No active tickets to display." : 'Uh-oh! Looks like you’ve got a clean slate. No history here!'}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {selectedTicket && (
          <TicketDetail ticket={selectedTicket} onClose={handleTicketDetailClose} onWithdraw={handleWithdrawTicket} />
        )}

        <TicketFormDialog open={open} onClose={handleClose} setTickets={setTickets} />
      </Box>
    </Box>
  );
};

export default Helpdesk;
