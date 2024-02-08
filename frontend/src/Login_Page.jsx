import React, {useState} from 'react';
import Card from '@mui/material/Card';
import {TextField,FormControl, CardContent,Typography,
        InputLabel,OutlinedInput, InputAdornment,IconButton,Button,Box } from '@mui/material';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Link} from 'react-router-dom';
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import './index.css'

function LoginPage()
{

    // Loading Screen
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: 'center'
      };

    // Theme for input bars
    const theme = createTheme({
        palette: {
          orange: {
            main: 'var(--orange)',
          },
        },
      });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forgotPassword,setForgotPassword] = useState(false);
    const [user,setUser] = useState({
        email:null,
        password:null
    }) ;

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function handleChange(e) 
    {
        setUser(user => ({
             ...user,
             [e.target.name]:e.target.value
           }));
    }

    async function login(e)
    {
        e.preventDefault();
        setLoading(true);
        const response = await axios.post(process.env.REACT_APP_USER_URL+"login/", JSON.stringify(user));
        setLoading(false);
        alert(response.data.message);
    }

    function recoverPassword(e)
    {
        e.preventDefault();
        alert("Please check email");
    }

    return(
        <body style={{textAlign:'center', backgroundColor:'var(--bgColor)'}}>        
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <ThemeProvider theme={theme}>
            <Card sx={{ minWidth: 400 }}>
                <CardContent>
                    <Link to="/"><img src='eRation.png' height='150' alt="eRation_logo"/></Link>
                    <Typography sx={{ fontSize: 25 }} color="var(--orange)" gutterBottom>
                     Sign in                
                    </Typography>
                    <br/>
                    {

                        forgotPassword

                        ?

                        <form id='recoverPasswordForm' onSubmit={recoverPassword}>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <TextField color="orange" required  type='email' name="email" onChange={handleChange} id="outlined-required"  label="Email" defaultValue=""/>
                        </FormControl>
                        <br/>
                        <br/>
                        <Button style={{textDecoration:'none',color:'var(--orange)',textAlign:'left'}} onClick={()=>{setForgotPassword(false)}}>Back to login</Button>
                        <br/>
                        <br/>
                        <Button style={{backgroundColor:'var(--orange)'}} type="submit" variant="contained">Recover Password</Button>
                        </form>

                        :

                        <form id='loginForm' onSubmit={login}>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <TextField color="orange" required type='email' name="email" onChange={handleChange} id="outlined-required"  label="Email" defaultValue=""/>
                        </FormControl>
                        <br/>
                        <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                            <InputLabel color="orange" htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput color="orange" required name="password" onChange={handleChange} id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment=
                                {
                                    <InputAdornment position="end"> 
                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <br/>
                        <Button style={{textDecoration:'none',color:'var(--orange)',textAlign:'left'}} onClick={()=>{setForgotPassword(true)}}>Forgot Password?</Button>
                        <br/>
                        <br/>
                        <Button style={{backgroundColor:'var(--orange)'}} type="submit" variant="contained">Login</Button>
                        </form>  
                    }
                </CardContent>
            </Card>
            </ThemeProvider>
        </Box>

        {/* Loading Popup */}
        <Modal open={loading} onClose={()=>{setLoading(false)}} aria-labelledby="loading-modal">
          <Box sx={style}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>
              Please wait.
            </Typography>
          </Box>
        </Modal>

        </body>

        

    )
}

export default LoginPage