import React,{ useState,useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from '../App';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { Grid, Typography, Box  } from '@mui/material'
import Card from '@mui/material/Card';
import axios from 'axios';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Header = () => 
{
    const [userId, userType, setUserType, setUserId] = useContext(userContext);
    const [userFirstName, setUserFirstName] = useState(null)

    const navigate = useNavigate();

    const logout = () => 
    {
        setUserType(null)
        setUserId(null);
        localStorage.clear();
        navigate('/',{replace:true});
    }

    async function fetchUser()
    {
        const response = await axios.post(process.env.REACT_APP_USER_URL+"details/", JSON.stringify({'user_id':userId}))      
        const name = JSON.parse(response.data.serealized_response)[0].fields.name
        if(response.status==200) 
            setUserFirstName(name.split(" ")[0]) 
    }

    useEffect(() => {
          
       fetchUser()
    }, [])
    

  return (
    <Grid container rowSpacing={1} spacing={2} style={{backgroundColor:'var(--bgColor)'}}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
            <Card sx={{ minWidth: 400 }} style={{width:'99%', margin: 'auto'}}>
                <Grid container spacing={6} alignItems="center" justifyContent="center">

                    <Grid item xs={3}>                      
                        <Link to="/" >
                            <img src='eRation.png' height={50} style={{margin:'2px'}} alt="eRation_logo"/>
                        </Link>  
                    </Grid> 

                    <Grid item xs={6} style={{margin:'auto'}}> 
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Typography variant="h4" style={{color:'var(--orange)'}}> 
                                Welcome {userFirstName}!
                            </Typography>   
                        </Box>
                    </Grid> 


                    <Grid item xs={3}> 
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <Link to={{pathname:"/profile",user_id:userId}} style={{transform: 'scale(1.8)', float: 'right', paddingTop:'10%',color: 'var(--orange)' }}>
                                <AccountCircleRoundedIcon/>
                            </Link>
                        </Grid>
                        <Grid item xs={8}>
                            <Button style={{ float: 'right', backgroundColor:'var(--orange)' , margin: '5px'}} variant="contained" onClick={logout}>
                                Logout
                            </Button>
                        </Grid>
                    </Grid> 
                    </Grid>

                </Grid>
            </Card>
        </Grid>
    </Grid>
  )
}

export default Header