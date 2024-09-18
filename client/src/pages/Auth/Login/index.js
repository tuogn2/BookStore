import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container, Grid, Box, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import authSlice from '../authSlice';
import inforuserSlice from '../inforSlice';
import { URL } from '../../../api';
import { regexpass, regexuser } from '~/regex';
import { auth, provider, signInWithPopup } from '../../../firebase'; // Import firebase setup

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [notifiUser, setNotifiUser] = useState('');
    const [notifiPass, setNotifiPass] = useState('');
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleLogin = () => {
        if (!regexuser(username)) {
            setNotifiUser('Tên phải lớn hơn 10 kí tự');
            setToastMessage('Tên phải lớn hơn 10 kí tự');
            setOpenToast(true);
            return;
        } else {
            setNotifiUser('');
        }

        if (!regexpass(pass)) {
            setNotifiPass('Pass phải lớn hơn 8 kí tự');
            setToastMessage('Pass phải lớn hơn 8 kí tự');
            setOpenToast(true);
            return;
        } else {
            setNotifiPass('');
        }

        fetch(`${URL}/user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                password: pass
            })
        })
        .then(res => {
            if (res.status === 401) throw new Error('Username not found');
            if (res.status === 403) throw new Error('Wrong password');
            return res.json();
        })
        .then(value => {
            localStorage.setItem('id', `${value._id}`);
            dispatch(inforuserSlice.actions.login(value));
            navigate('/');
        })
        .catch(err => {
            if (err.message === 'Username not found') {
                setNotifiUser(err.message);
                setToastMessage(err.message);
            }
            if (err.message === 'Wrong password') {
                setNotifiPass(err.message);
                setToastMessage(err.message);
            }
            setOpenToast(true);
        });
    };

    const handleHomeRedirect = () => {
        navigate('/');
    };

    const handleToastClose = () => {
        setOpenToast(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log(user);
            const response = await fetch(`${URL}/user/google-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email })
            });

            if (response.ok) {
                console.log('Login successful');
                const userData = await response.json();
                localStorage.setItem('id', `${userData._id}`);
                dispatch(inforuserSlice.actions.login(userData));
                navigate('/');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error("Error signing in with Google: ", error.message);
            setToastMessage("Đăng nhập bằng Google thất bại");
            setOpenToast(true);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4, position: 'relative' }}>
            <Button
                variant="text"
                color="primary"
                sx={{ position: 'fixed', top: 16, left: 16 }}
                onClick={handleHomeRedirect}
            >
                Back to Home
            </Button>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" color="primary" gutterBottom>
                    Login
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    Books ignite minds, broaden horizons. They transport, inspire, enlighten. In their pages,
                    worlds unfold, dreams take flight. Explore, discover, escape, within.
                </Typography>
            </Box>
            <Box
                sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'background.paper'
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={Boolean(notifiUser)}
                            helperText={notifiUser}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            error={Boolean(notifiPass)}
                            helperText={notifiPass}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} container alignItems="center">
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Remember me"
                            sx={{ mr: 2 }}
                        />
                        <Typography variant="body2" color="primary" sx={{ ml: 'auto', cursor: 'pointer' }} onClick={() => dispatch(authSlice.actions.arowlogout())}>
                            Don't have an account?
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            sx={{ mt: 2 }}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={handleGoogleSignIn}
                            sx={{ mt: 2 }}
                        >
                            Sign in with Google
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={openToast}
                autoHideDuration={6000}
                onClose={handleToastClose}
            >
                <Alert onClose={handleToastClose} severity="error" sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;
