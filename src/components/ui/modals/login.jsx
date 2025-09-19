'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { uselogin } from '@/hooks/auth';
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function Login({ children }) {
  const loginMutation = uselogin(); // api hoks login
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEmail('');
    setPassword('');
    setOpen(false);
  };

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      console.log("⚠️ Email va parol kiritilishi kerak!");
      return;
    }
    const formData = { email, password }

    loginMutation.mutate({
      formData, onSuccess: (data) => {
        router.push('/dashboard')
      }
    })
  };

  return (
    <div>
      <button onClick={handleOpen}>{children}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Box sx={style}>
          <Typography id="login-modal-title" variant="h6" component="h2" gutterBottom>
            Tizimga kirish
          </Typography>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Parol"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Bekor qilish
            </Button>
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
