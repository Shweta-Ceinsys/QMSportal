import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Slide,
  CircularProgress,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import TicketService from '../../../Services/TicketService'; 
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const TicketFormDialog = ({ open, onClose, setTickets }) => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    email: '',
    subject: '',
    description: '',
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const validateForm = () => {
    return formData.category && formData.name && formData.email && formData.subject && formData.description;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      await handleCreateticket(formData);
      toast.success("Ticket created successfully!");
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      toast.error(error.response?.data?.message || "Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  const navigates = useNavigate();
  const handleClickNavigateSPage = () => {
 
    setTimeout(() => {
      navigates(0);
    }, 3000);
  };
  const handleCreateticket = async (ticketData) => {
    const { category, name, email, subject, description, file } = ticketData;
    await TicketService.createTicket(category, name, email, subject, description, file);
    handleClickNavigateSPage();
  };

  const resetForm = () => {
    setFormData({
      category: '',
      name: '',
      email: '',
      subject: '',
      description: '',
      file: null,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" TransitionComponent={Transition}>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>New Ticket</Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ maxHeight: '80vh', overflow: 'hidden' }}>
        <form onSubmit={handleSubmit}>
          <Select 
            name="category" 
            value={formData.category} 
            onChange={handleInputChange} 
            displayEmpty 
            variant="outlined" 
            sx={{ mb: 2 }} 
            required
          >
            <MenuItem value="" disabled>Select Category</MenuItem>
            <MenuItem value="technical">Technical Query</MenuItem>
            <MenuItem value="template">Template Query</MenuItem>
            <MenuItem value="general">General Query</MenuItem>
          </Select>
          <TextField 
            margin="dense" 
            name="name" 
            label="Name" 
            type="text" 
            fullWidth 
            variant="outlined" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
            sx={{ mb: 2 }} 
          />
          <TextField 
            margin="dense" 
            name="email" 
            label="Email" 
            type="email" 
            fullWidth 
            variant="outlined" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
            sx={{ mb: 2 }} 
          />
          <TextField 
            margin="dense" 
            name="subject" 
            label="Subject" 
            type="text" 
            fullWidth 
            variant="outlined" 
            value={formData.subject} 
            onChange={handleInputChange} 
            required 
            sx={{ mb: 2 }} 
          />
          <TextField 
            margin="dense" 
            name="description" 
            label="Description" 
            type="text" 
            fullWidth 
            variant="outlined" 
            value={formData.description} 
            onChange={handleInputChange} 
            required 
            multiline 
            rows={4} 
            sx={{ mb: 2 }} 
          />
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '16px', padding: '4px', border: '1px dashed #ccc', borderRadius: '4px', backgroundColor: '#fafafa', cursor: 'pointer' }}>
            <input 
              type="file" 
              onChange={handleFileChange} 
              accept=".pdf,.xls,.xlsx,.doc,.docx,.txt,.ppt,.pptx,.gif,.jpg,.jpeg,.png" 
              style={{ display: 'none' }} 
              id="file-upload" 
            />
            <label htmlFor="file-upload" style={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <IconButton component="span" sx={{ fontSize: '1.25rem', color: '#42a5f5' }}>
                  <AttachFileIcon />
                </IconButton>
                <Typography variant="body1" sx={{ marginLeft: '8px' }}>{formData.file ? formData.file.name : 'Attach File'}</Typography>
              </Box>
            </label>
          </Box>
          <Typography variant="caption" sx={{ color: '#888', marginTop: '8px' }}>
            Allowed file types: .pdf, .xls, .xlsx, .doc, .docx, .txt, .ppt, .pptx, .gif, .jpg, .jpeg, .png
          </Typography>

          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#42a5f5', color: '#fff' }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TicketFormDialog;







