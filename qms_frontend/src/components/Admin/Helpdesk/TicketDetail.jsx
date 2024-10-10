import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton,Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';// Import your desired icon

// TicketDetail component for displaying ticket information
const TicketDetail = ({ ticket, onClose, onWithdraw }) => (
  <Dialog open={Boolean(ticket)} onClose={onClose} fullWidth maxWidth="md">
    {/* Dialog title showing the ticket subject */}
    <DialogTitle>
      {ticket?.subject} 
      <Typography variant="body2">Submitted By: {ticket?.name}</Typography>
      <Typography variant="body1">Email: {ticket?.email}</Typography>
      {/* Close button for the dialog */}
      <IconButton onClick={onClose} color="inherit" aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon /> {/* Icon for closing the dialog */}
      </IconButton>
    </DialogTitle>
    
    {/* Dialog content displaying ticket details */}
    <DialogContent>
      <Typography variant="h6">Details:</Typography>
      <Typography variant="body2">Category: {ticket?.category}</Typography>
      <Typography variant="body1">Description: {ticket?.description}</Typography>
      
      {/* If there is an attached file, show its details */}
      {ticket?.filename && (
        <Box display="flex" alignItems="center"> {/* Use Box for horizontal alignment */}
          <Typography variant="body1" sx={{ marginRight: 1 }}>Attached File: {ticket.filename}</Typography>
          <Button 
            onClick={() => {
              // Logic for downloading the file
              const url = ticket.filepath; // Use the path stored in the backend
              const a = document.createElement('a');
              a.href = url;
              a.download = ticket.filename; // Set the download filename
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            startIcon={<DownloadIcon />} // Replace with your desired icon
          >
            {/* Optionally, you can also display text here */}
            </Button>
        </Box>
      
      )}
    </DialogContent>
    
    {/* Dialog actions with a button to withdraw the ticket */}
    <DialogActions>
      <Button onClick={onClose} color="primary">Close Ticket</Button> {/* Withdraw button */}
    </DialogActions>
  </Dialog>
);

export default TicketDetail;
