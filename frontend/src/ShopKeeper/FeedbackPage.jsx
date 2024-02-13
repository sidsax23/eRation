import React, { useContext,useEffect,useState }from 'react'
import Header from '../Header/Header.jsx'
import { userContext } from '../App.jsx';
import axios from 'axios';
import { Card, Grid, Typography, Rating, TextField} from '@mui/material'

const FeedbackPage = () => 
{
  const [userId, userType, setUserType, setUserId] = useContext(userContext);
  const [feedbacks,setFeedbacks] = useState([]) 
  const [correctUserType,setCorrectUserType] = useState(true)


  async function fetch_feedbacks()
  {
      const userTypeResponse = await axios.post(process.env.REACT_APP_USER_URL+"details/", JSON.stringify({'user_id':userId})) 
      if(JSON.parse(userTypeResponse.data.serealized_response)[0].fields.type != userType)
          setCorrectUserType(false)

      const feedbacksResponse = await axios.post(process.env.REACT_APP_USER_URL+"shop_view_feedback/", JSON.stringify({'shop_id':userId})) 
      setFeedbacks(feedbacksResponse.data.feedbacks)

  }

  useEffect(() => {
    fetch_feedbacks()
  }, [])

  return (
    <div style={{backgroundColor:'var(--bgColor)', height:'100vh'}}>
      <Header/>
      <br/>
      {

        correctUserType
        ? 
        <Grid container rowSpacing={2} spacing={0} style={{backgroundColor:'var(--bgColor)'}}>

        <Grid item xs={12} >  
          <Card sx={{minHeight:'fit-content'}} style= {{padding:'1%',width:'98%',marginLeft:'1%',marginRight:'1%'}}>
          <div style={{margin:'auto', textAlign: 'center'}}>
          <Typography variant="h3" style={{color:'var(--orange)'}}>
              FEEDBACKS
          </Typography> 
          </div>
          </Card>
        </Grid>

        {feedbacks.map((feedback)=>{
              return(
          <Grid item xs={4} >  
          <Card sx={{minHeight:'fit-content', height:200, overflowY:'auto'}} style= {{padding:'1%',width:'96%',marginLeft:'2%',marginRight:"2%"}}>
          <div style={{margin:'auto', textAlign: 'center'}}>
          
          
                <div>
                <Typography variant="h4" style={{color:'var(--orange)'}}>
                {feedback.customer_name}
                <br/>
                </Typography> 
                <Rating name="read-only" value={feedback.rating} precision={0.5} readOnly />
                <br/>
                <br/>
                <TextField
                  id="outlined-read-only-input"
                  label="Comments"
                  defaultValue=""
                  value={feedback.comments}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <br/>
                </div>
                </div>
          </Card>
        </Grid>
              )
          })
          
          }
          

        </Grid>
        : 

        <Typography variant="h4" style={{color:'var(--orange)'}}>
            Incorrect User Type Homepage Access Attempted. Please login again.  
        </Typography>
  
        }
    </div>
  )
}

export default FeedbackPage