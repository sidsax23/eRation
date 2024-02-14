import React, { useContext, useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import { userContext } from '../App'
import axios from 'axios'
import Header from '../Header/Header'
import { Card, Typography,Rating,Grid, TextField, Button, Box,Snackbar } from '@mui/material'
import {createTheme,ThemeProvider} from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';

const ShopPage = () => 
{
  const location=useLocation()
  const shop = location.state.shop
  const [shopRating,setShopRating] = useState(0)
  const [userId, userType, setUserType, setUserId] = useContext(userContext);
  const [correctUserType,setCorrectUserType] = useState(true)
  const [shopItems,setShopItems] = useState([])
  const [feedback,setFeedback] = useState({
    rating:0,
    comments:null,
  })

  const [successSnackbar,setSuccessSnackbar] = useState(true)
  const [openSnackbar,setOpenSnackbar] = useState(false)
  const [snackbarMessage,setSnackbarMessage] = useState("")
  const [loading, setLoading] = useState(false);

  async function fetch_shops()
  {
      const userTypeResponse = await axios.post(process.env.REACT_APP_USER_URL+"details/", JSON.stringify({'user_id':userId})) 
      if(JSON.parse(userTypeResponse.data.serealized_response)[0].fields.type != userType)
        setCorrectUserType(false)

      const shopsResponse = await axios.post(process.env.REACT_APP_USER_URL+"shop_details/", JSON.stringify({'shop_id':shop.shop_id})) 
      try{
        setShopRating(shopsResponse.data.shop.rating)
        console.log(shopsResponse.data.shop)
      }
      catch
      {
        setShopRating(0)
      }

      const shopItemsResponse = await axios.post(process.env.REACT_APP_INVENTORY_URL+"show_shop_stock/", JSON.stringify({'shop_id':shop.shop_id})) 
      setShopItems(shopItemsResponse.data.shopItems) 
  }


  useEffect(() => {
    fetch_shops()
    }, [])


  // Theme for input bar
  const theme = createTheme({
   palette: {
     green: {
       main: 'green',
     },
   },
  });

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

  async function placeOrder()
  {
    var items = []
    shopItems.forEach((item)=>{
      items.push({'item_id':item.item_id,'quantity':1,'price':item.price})
    })
    setLoading(true);
    const placeOrderResponse = await axios.post(process.env.REACT_APP_ORDER_URL+"place_order/", JSON.stringify({'shop_id':shop.shop_id,'cust_id':userId,'items':items})) 
    setLoading(false);
    if(placeOrderResponse.status==200)
    {
      setSuccessSnackbar(true);
      setSnackbarMessage(placeOrderResponse.data.message);
      setOpenSnackbar(true);
    }
    else
    {
      setSuccessSnackbar(false);
      setSnackbarMessage("Error occurred while placing order. Please try again later.");
      setOpenSnackbar(true);
    }
  }

    function handleChange(e)
    {
      setFeedback(feedback => ({
        ...feedback,
        [e.target.name]:e.target.value
      }));
    }

    async function submitFeedback()
    {
      setLoading(true);
      const feedbackResponse = await axios.post(process.env.REACT_APP_USER_URL+"post_feedback/", JSON.stringify({'shopkeeper_id':shop.shop_id,'customer_id':userId,'rating':feedback.rating,'comments':feedback.comments})) 
      setLoading(false);
      if(feedbackResponse.data.status==200)
      {
        setSuccessSnackbar(true);
      }
      else
      {
        setSuccessSnackbar(false);
      }
      setSnackbarMessage(feedbackResponse.data.message);
      setOpenSnackbar(true);
      setFeedback({
        rating:0,
        comments:"",
      })
      fetch_shops()
    }

  return (
    <div style={{backgroundColor:'var(--bgColor)', height:'100vh'}}>
        <Header/>
        <br/>
        {
             correctUserType
             ?
              <div>
               <Grid container rowSpacing={2} spacing={2} style={{backgroundColor:'var(--bgColor)'}}>

                <Grid item xs={2} >
                  <Card sx={{minHeight:'fit-content', height:250, overflowY:'auto'}} style= {{padding:'1%',width:'98%',marginLeft:'2%'}}>
                    <div style={{margin: 'auto', textAlign: 'center'}}>
                    <img src='shop_image_template.jpg' style={{padding:'1%',width:'98%',marginLeft:'1%',marginRight:'1%'}} alt='shop_placeholder_image'/>
                    <Typography variant="h5" style={{color:'var(--orange)'}}>
                        {shop.name} 
                    </Typography> 
                    <Rating name="read-only" value={shopRating} precision={0.5} readOnly />
                    <br/>
                    </div>              
                  </Card>
                </Grid>

                <Grid item xs={5} >
                  <Card sx={{minHeight:'fit-content', height:250, overflowY:'auto'}} style= {{padding:'1%'}}>
                      <div style={{margin: 'auto', textAlign: 'center'}}>
                      <Typography variant="h4" style={{color:'var(--orange)'}}>
                          Items Available :
                      </Typography> 
                      </div>
                      {shopItems.map((shopItem) =>
                      {
                        return(
                        <Typography variant="h6" style={{color:'var(--orange)', padding:'1%'}}>
                          {shopItem.name} - ₹{shopItem.price} 
                        </Typography> )
                      })}                 
                      <br/>    
                  </Card>
                </Grid>

                <Grid item xs={5} >
                  <Card sx={{minHeight:'fit-content', height:250, overflowY:'auto'}} style= {{padding:'1%',width:'98%',marginRight:'2%'}}>
                    <div style={{margin: 'auto', textAlign: 'center'}}>
                    <Typography variant="h6" style={{color:'green'}}>
                        Give Feedback 
                    </Typography> 
                    <Rating name='rating' value={feedback.rating} onChange={handleChange} />
                    <br/>   
                    <br/>
                    <ThemeProvider theme={theme}>
                    <TextField color="green" name='comments' value={feedback.comments} onChange={handleChange} style={{width:'80%'}} label="Comments" multiline/>
                    </ThemeProvider>
                    <br/>
                    <br/>
                    <Button variant='contained' onClick={submitFeedback} color='success'>Submit</Button>
                    </div>              
                  </Card>
                </Grid>

              </Grid>
              <br/>
                    
              <div style={{margin: 'auto', textAlign: 'center'}}>
              <Button style={{backgroundColor:'var(--orange)'}} onClick={placeOrder} variant='contained'>Place Order</Button>
              </div>


              {/* Loading Popup */}
              <Modal open={loading} onClose={()=>{setLoading(false)}} aria-labelledby="loading-modal">
                <Box sx={style}>
                  <CircularProgress />
                  <Typography sx={{ mt: 2 }}>
                    Please wait
                  </Typography>
                </Box>
              </Modal> 

              {/* Alert Popup */}
              <Snackbar open={openSnackbar} autoHideDuration={5000}>
                  <Alert  sx={{width:'fit-content' }} variant="filled" severity={successSnackbar?"success":"error"} onClose={()=>{setOpenSnackbar(false)}}>
                      {snackbarMessage}
                  </Alert>
              </Snackbar>
            
            </div>
            
            : 

            <Typography variant="h4" style={{color:'var(--orange)'}}>
                Incorrect User Type Access Attempted. Please login again.  
            </Typography>
        }
    </div>
  )
}

export default ShopPage