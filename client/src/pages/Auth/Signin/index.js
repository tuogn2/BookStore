import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import authSlice from '../authSlice';
import inforuserSlice from '../inforSlice';
import { URL } from '../../../api/index.js';
import { regexpass, regexuser } from '~/regex';

function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [repeap, setRepeap] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeapPassword, setShowRepeapPassword] = useState(false);
    const [notifiUser, setNotifiUser] = useState('');
    const [notifiPass, setNotifiPass] = useState('');
    const [notifiRepeap, setNotifiRepeap] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleArowLogin = () => {
        dispatch(authSlice.actions.arowlogin());
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowRepeapPassword = () => {
        setShowRepeapPassword(!showRepeapPassword);
    };

    const handleSignin = () => {
        if (regexuser(user) === false) {
            setNotifiUser('Tên phải lớn hơn 10 kí tự');
            setToastMessage('Tên phải lớn hơn 10 kí tự');
            setOpenToast(true);
            return;
        } else {
            setNotifiUser('');
        }

        if (regexpass(pass) === false) {
            setNotifiPass('Pass phải lớn hơn 8 kí tự');
            setToastMessage('Pass phải lớn hơn 8 kí tự');
            setOpenToast(true);
            return;
        } else {
            setNotifiPass('');
        }

        if (pass !== repeap) {
            setNotifiRepeap('No match');
            setToastMessage('No match');
            setOpenToast(true);
            return;
        } else {
            setNotifiRepeap('');
        }

        fetch(`${URL}/user/createuser`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                password: pass
            })
        })
            .then(res => {
                if (res.status === 400) {
                    throw new Error('Đã tạo rồi!!');
                }
                return res.json();
            })
            .then(value => {
                localStorage.setItem('id', `${value._id}`);
                dispatch(inforuserSlice.actions.login(value));
                navigate('/');
            })
            .catch(err => {
                if (err.message === 'Đã tạo rồi!!') {
                    setNotifiUser(err.message);
                    setToastMessage(err.message);
                    setOpenToast(true);
                }
            });
    };

    const handleToastClose = () => {
        setOpenToast(false);
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h4" align="center" color="primary" gutterBottom>
                Sign in
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary" paragraph>
                Books ignite minds, broaden horizons. They transport, inspire, enlighten. In their pages,
                worlds unfold, dreams take flight. Explore, discover, escape, within.
            </Typography>
            <Box
                sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'background.paper'
                }}
            >
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    error={Boolean(notifiUser)}
                    helperText={notifiUser}
                    sx={{ mb: 2 }}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    error={Boolean(notifiPass)}
                    helperText={notifiPass}
                    sx={{ mb: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    type={showRepeapPassword ? 'text' : 'password'}
                    label="Repeat Password"
                    value={repeap}
                    onChange={(e) => setRepeap(e.target.value)}
                    error={Boolean(notifiRepeap)}
                    helperText={notifiRepeap}
                    sx={{ mb: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClickShowRepeapPassword} edge="end">
                                    {showRepeapPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSignin}
                >
                    Sign in
                </Button>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="body2" color="primary" onClick={handleArowLogin} sx={{ cursor: 'pointer' }}>
                        Đăng Nhập 
                    </Typography>
                </Box>
            </Box>
            <Snackbar
                open={openToast}
                autoHideDuration={6000}
                onClose={handleToastClose}
                message={toastMessage}
            >
                <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Signin;
