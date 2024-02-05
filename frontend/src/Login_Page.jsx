import React, {useState} from 'react';
import Card from '@mui/material/Card';
import {TextField,FormControl, CardContent,Typography,
        InputLabel,OutlinedInput, InputAdornment,IconButton,Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Link} from 'react-router-dom';
import axios from 'axios'

function LoginPage()
{

    const [showPassword, setShowPassword] = useState(false);
    const [forgotPassword,setForgotPassword] = useState(false)
    const [user,setUser] = useState({
        email:null,
        pass:null
    }) 

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function handleChange(e) 
    {
        setUser(user => ({
             ...user,
             [e.target.name]:e.target.value
           }));
    }

    function login(e)
    {
        e.preventDefault();
        //axios.post("http://localhost:8000/user/login",JSON.stringify(user));
        alert(JSON.stringify(user));
    }

    function recoverPassword(e)
    {
        e.preventDefault();
        alert("Please check email");
    }

    return(
        
        <Card sx={{ minWidth: 400 }}>
            <CardContent>
                <img src='eRation.png' height='150'/>
                <Typography sx={{ fontSize: 25 }} color="text.primary" gutterBottom>
                 Sign in                
                </Typography>
                <br/>
                {

                    forgotPassword

                    ?
                    
                    <form id='recoverPasswordForm' onSubmit={recoverPassword}>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <TextField required type='email' name="email" onChange={handleChange} id="outlined-required"  label="Email" defaultValue=""/>
                    </FormControl>
                    <br/>
                    <br/>
                    <Button style={{textDecoration:'none',color:'blue',textAlign:'left'}} onClick={()=>{setForgotPassword(false)}}>Back to login</Button>
                    <br/>
                    <br/>
                    <Button type="submit" variant="contained">Recover Password</Button>
                    </form>

                    :

                    <form id='loginForm' onSubmit={login}>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <TextField required type='email' name="email" onChange={handleChange} id="outlined-required"  label="Email" defaultValue=""/>
                    </FormControl>
                    <br/>
                    <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput required name="pass" onChange={handleChange} id="outlined-adornment-password"
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
                    <Button style={{textDecoration:'none',color:'blue',textAlign:'left'}} onClick={()=>{setForgotPassword(true)}}>Forgot Password?</Button>
                    <br/>
                    <br/>
                    <Button type="submit" variant="contained">Login</Button>
                    </form>   

                }
            </CardContent>
        </Card>
    )
}

export default LoginPage