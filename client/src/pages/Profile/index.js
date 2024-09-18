import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Grid, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem, InputLabel, Avatar, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import avt from '~/Images/avtstore.jpg';
import { infouser } from '~/reudx/selectors';
import google from '~/Images/google.png';
import facebook from '~/Images/face.png';

function Profile() {
  const infor = useSelector(infouser);
  const [user, setuser] = useState({});

  useEffect(() => {
    setuser(infor.infor);
  }, [infor.infor]);

  return (
    <Grid container spacing={3} sx={{ padding: { xs: '10px', }, display: 'flex' }}>
      
      {/* Personal Info Section */}
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Thông tin cá nhân
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: '20px' }}>
              <Grid item xs={4}>
                <Avatar src={avt} alt="avt" sx={{ width: 120, height: 120, margin: 'auto' }} />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="ID"
                  value={user._id ? user._id : 'No ID'}
                  fullWidth
                  disabled
                  margin="normal"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
                <TextField
                  label="Họ & Tên"
                  value={user.name ? user.name : 'No name'}
                  fullWidth
                  disabled
                  margin="normal"
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>
            </Grid>
          </div>

          <div>
            {/* Birthday Section */}
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Ngày</InputLabel>
                  <Select defaultValue="">
                    {[...Array(30)].map((_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Tháng</InputLabel>
                  <Select defaultValue="">
                    {[...Array(12)].map((_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Năm</InputLabel>
                  <Select defaultValue="">
                    {[...Array(34)].map((_, index) => (
                      <MenuItem key={2023 - index} value={2023 - index}>
                        {2023 - index}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Gender Section */}
            <FormControl component="fieldset" sx={{ marginTop: '20px' }}>
              <FormLabel component="legend" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Giới tính
              </FormLabel>
              <RadioGroup row defaultValue="male" name="gender">
                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                <FormControlLabel value="other" control={<Radio />} label="Khác" />
              </RadioGroup>
            </FormControl>

            {/* Nationality Section */}
            <TextField
              label="Quốc tịch"
              value="Viet Nam"
              fullWidth
              disabled
              margin="normal"
              sx={{ backgroundColor: '#f9f9f9', marginTop: '20px', borderRadius: '5px' }}
            />

            <Button variant="contained" color="primary" fullWidth disabled sx={{ marginTop: '20px', padding: '10px' }}>
              Lưu thay đổi
            </Button>
          </div>
        </Paper>
      </Grid>

      {/* Contact Info Section */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Số điện thoại và email
            </Typography>

            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <FontAwesomeIcon icon={faPhone} />
              </Grid>
              <Grid item>
                <Typography>Số điện thoại: 0976474170</Typography>
              </Grid>
            </Grid>
            <Button variant="outlined" fullWidth disabled sx={{ marginTop: '10px' }}>
              Cập nhật
            </Button>

            <Grid container alignItems="center" spacing={1} sx={{ marginTop: '20px' }}>
              <Grid item>
                <FontAwesomeIcon icon={faEnvelope} />
              </Grid>
              <Grid item>
                <Typography>Địa chỉ email: dctuong021203@gmail.com</Typography>
              </Grid>
            </Grid>
            <Button variant="outlined" fullWidth disabled sx={{ marginTop: '10px' }}>
              Cập nhật
            </Button>
          </div>

          {/* Social Media Section */}
          <div>
            <Typography variant="h6" gutterBottom sx={{ marginTop: '20px', fontWeight: 'bold' }}>
              Liên kết mạng xã hội
            </Typography>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <img style={{ width: 20 }} alt="facebook" src={facebook} />
              </Grid>
              <Grid item>
                <Typography>Facebook</Typography>
              </Grid>
            </Grid>
            <Button variant="outlined" fullWidth disabled sx={{ marginTop: '10px' }}>
              Cập nhật
            </Button>

            <Grid container alignItems="center" spacing={1} sx={{ marginTop: '20px' }}>
              <Grid item>
                <img style={{ width: 20 }} alt="google" src={google} />
              </Grid>
              <Grid item>
                <Typography>Google</Typography>
              </Grid>
            </Grid>
            <Button variant="outlined" fullWidth disabled sx={{ marginTop: '10px' }}>
              Cập nhật
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Profile;
