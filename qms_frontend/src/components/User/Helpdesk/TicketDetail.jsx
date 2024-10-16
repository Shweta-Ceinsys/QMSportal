import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import TicketService from '../../../Services/TicketService';
import { toast, ToastContainer } from 'react-toastify';

const TicketDetail = ({ ticket, onClose, onWithdraw }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const UserId = sessionStorage.getItem('UserId');
    setLoading(true);
    try {
      const response = await TicketService.downloadFile(ticket.id, UserId);
      if (response.status === 200) {
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'downloaded-file';

        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=[\'"]?([^\'";\n]*)[\'"]?/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = decodeURIComponent(matches[1]);
          }
        }

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success("File downloaded successfully");
      } else {
        throw new Error("File download failed: " + response.statusText);
      }
    } catch (error) {
      toast.error("File download failed: " + error.message);
      console.error('Error downloading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Dialog open={Boolean(ticket)} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
          {ticket?.subject}
          <IconButton onClick={onClose} color="inherit" aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography variant="h6">Details:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2">Category: {ticket?.category}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  maxWidth: '500px',
                }}
              >
                Description: {ticket?.description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Status: <strong>{ticket?.status || 'N/A'}</strong>
              </Typography>
            </Grid>
            {ticket?.filename && (
              <Grid item xs={12} display="flex" alignItems="center" sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                  Attached File: {ticket.filename}
                </Typography>
                <Button
                  onClick={handleDownload}
                  startIcon={loading ? <CircularProgress size={20} /> : <DownloadIcon />}
                  disabled={loading}
                >
                  {loading ? 'Downloading...' : 'Download'}
                </Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'right' }}>
                Created At: {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleString() : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
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
