import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton, Box, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import TicketService from '../../../Services/TicketService'; // Import your TicketService
import { toast,ToastContainer } from 'react-toastify'; // Import toast for notifications

const TicketDetail = ({ ticket, onClose, onWithdraw }) => {
  const [loading, setLoading] = useState(false); // State for loading

  const handleDownload = async () => {
    const UserId = sessionStorage.getItem('UserId'); // Retrieve UserId from session storage
    setLoading(true); // Set loading state
    try {
      // Await the response from the download method
      const response = await TicketService.downloadFile(ticket.id, UserId); // Use the retrieved UserId
    
      // Ensure the response is successful
      if (response.status === 200) {
        // Get Content-Disposition header
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'downloaded-file'; // Default filename if not specified
    
        if (contentDisposition) {
          // Extract filename from Content-Disposition header
          const filenameRegex = /filename[^;=\n]*=[\'"]?([^\'";\n]*)[\'"]?/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = decodeURIComponent(matches[1]); // Decode and use the filename
          }
        }
    
        // Create a Blob object with the correct Content-Type
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Use the extracted filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the URL object
    
        toast.success("File downloaded successfully");
      } else {
        throw new Error("File download failed: " + response.statusText);
      }
    } catch (error) {
      toast.error("File download failed: " + error.message);
      console.error('Error downloading file:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  
  
  return (
    <Box >
    <Dialog open={Boolean(ticket)} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {ticket?.subject}
        <IconButton onClick={onClose} color="inherit" aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="h6">Details:</Typography>
        <Typography variant="body2">Category: {ticket?.category}</Typography>
        <Typography variant="body1" style={{ wordWrap: 'break-word', maxWidth: '500px' }}>
  Description: {ticket?.description}
</Typography>
        
        <Typography variant="body2" sx={{ mt: 2 }}>
          Status: <strong>{ticket?.status || 'N/A'}</strong>
        </Typography>

        {ticket?.filename && (
          <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ marginRight: 1 }}>Attached File: {ticket.filename}</Typography>
            <Button 
              onClick={handleDownload}
              startIcon={loading ? <CircularProgress size={20} /> : <DownloadIcon />}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Downloading...' : 'Download'}
            </Button>
          </Box>
        )}

        <Typography variant="body2" sx={{ mt: 2, textAlign: 'right' }}>
          Created At: {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleString() : 'N/A'}
        </Typography>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onWithdraw} color="primary">Withdraw Ticket</Button>
      </DialogActions>
    </Dialog>
    <ToastContainer style={{ zIndex: "1000000" }} />
    </Box>
  );
};

export default TicketDetail;
