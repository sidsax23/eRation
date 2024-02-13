import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Header from '../Header/Header'
import { userContext } from '../App'
import { Card, Typography } from '@mui/material'

const CustomerProfilePage = () => 
{

    const [userId, userType, setUserType, setUserId] = useContext(userContext);
    const [user,setUser] = useState({})

    async function fetch_user()
    {
        const response = await axios.post(process.env.REACT_APP_USER_URL+"details/", JSON.stringify({'user_id':userId})) 
        if(response.status==200)
            setUser(JSON.parse(response.data.serealized_response)[0].fields)
    }

    useEffect(() => {
        fetch_user() 
    }, [])
    
  return (
    <div style={{backgroundColor:'var(--bgColor)', height:'100vh'}}>
        <Header/>
        <br/>
        <Card sx={{minHeight:'fit-content'}} style= {{padding:'1%',width:'98%',marginLeft:'1%',marginRight:'1%'}}>
            <Typography variant="h6" style={{color:'var(--orange)'}}>
            {user.type=='Customer' ? 'Ration Card Number' : 'License Number'} : {userId}
            <br/>
            Name : {user.name}
            <br/>
            Email : {user.email}
            <br/>
            Mobile Number : {user.mobile}
            <br/>
            Address : {user.address}
            </Typography>
          </Card>
    </div>
  )
}

export default CustomerProfilePage