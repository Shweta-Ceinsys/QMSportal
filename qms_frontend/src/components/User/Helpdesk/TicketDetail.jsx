import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// TicketDetail component for displaying ticket information
const TicketDetail = ({ ticket, onClose, onWithdraw }) => (
  <Dialog open={Boolean(ticket)} onClose={onClose} fullWidth maxWidth="md">
    {/* Dialog title showing the ticket subject */}
    <DialogTitle>
      {ticket?.subject} {/* Optional chaining to safely access ticket subject */}
      {/* Close button for the dialog */}
      <IconButton onClick={onClose} color="inherit" aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon /> {/* Icon for closing the dialog */}
      </IconButton>
    </DialogTitle>
    
    {/* Dialog content displaying ticket details */}
    <DialogContent>
      <Typography variant="h6">Details:</Typography>
      <Typography variant="body2">Category: {ticket?.category}</Typography> {/* Display ticket category */}
      <Typography variant="body1">Description: {ticket?.description}</Typography> {/* Display ticket description */}
      
      {/* Display ticket status */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Status: <strong>{ticket?.status || 'N/A'}</strong> {/* Display ticket status */}
      </Typography>

      {/* If there is an attached file, show its details */}
      {ticket?.file && (
        <>
          <Typography variant="body1">Attached File: {ticket.file.name}</Typography> {/* Display the file name */}
          <Button variant="outlined" onClick={() => {
            // Create a URL for the file object and trigger download
            const url = URL.createObjectURL(ticket.file);
            const a = document.createElement('a');
            a.href = url;
            a.download = ticket.file.name; // Set the download filename
            document.body.appendChild(a); // Append the anchor to the body
            a.click(); // Trigger the click to download
            document.body.removeChild(a); // Clean up by removing the anchor
          }}>
            Download File
          </Button>
        </>
      )}
    </DialogContent>
    
    {/* Dialog actions with a button to withdraw the ticket */}
    <DialogActions>
      <Button onClick={onWithdraw} color="primary">Withdraw Ticket</Button> {/* Withdraw button */}
    </DialogActions>
  </Dialog>
);

export default TicketDetail;
