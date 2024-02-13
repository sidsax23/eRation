import React, { useState,useContext,useEffect } from 'react'
import Header from '../Header/Header.jsx'
import { Card, Grid, Typography, Rating} from '@mui/material'
import axios from 'axios'
import { userContext } from '../App.jsx'
import {Link} from 'react-router-dom';  
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';


const CustomerHome = () => 
{
  const [userId, userType, setUserType, setUserId] = useContext(userContext);

  const [totalOrdersCount, setTotalOrdersCount] = useState(0)
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0)
  const [lastOrderItems, setLastOrderItems] = useState("")
  const [lastOrderShopName, setLastOrderShopName] = useState("")
  const [lastOrder,setLastOrder] = useState({})
  const [correctUserType,setCorrectUserType] = useState(true)
  const [shops,setShops] = useState([])

  async function fetch_details()
  {
      const userTypeResponse = await axios.post(process.env.REACT_APP_USER_URL+"details/", JSON.stringify({'user_id':userId})) 
      if(JSON.parse(userTypeResponse.data.serealized_response)[0].fields.type != userType)
          setCorrectUserType(false)

      const ordersCountResponse = await axios.post(process.env.REACT_APP_ORDER_URL+"cnt_details/", JSON.stringify({'user_id':userId})) 
      if(ordersCountResponse.status==200)
      {
          setTotalOrdersCount(ordersCountResponse.data.Completed_orders_cnt+ordersCountResponse.data.Pending_orders_cnt)
          setPendingOrdersCount(ordersCountResponse.data.Pending_orders_cnt)
      }

      const lastOrderResponse = await axios.post(process.env.REACT_APP_ORDER_URL+"last_order/", JSON.stringify({'user_id':userId})) 
      if(lastOrderResponse.data.status==404)
        console.log("No orders")

      else
      {
        setLastOrder(lastOrderResponse.data.response)
        setLastOrderShopName(lastOrderResponse.data.shop_name)
        var orderItems=""
        lastOrderResponse.data.items_name.forEach(item_name => {
          orderItems+=item_name+","
        })
        // To remove last comma
        setLastOrderItems(orderItems.slice(0, -1))
      }

      const shopsResponse = await axios.post(process.env.REACT_APP_USER_URL+"shops/", JSON.stringify({'user_id':userId})) 
      setShops(shopsResponse.data.shops)
  }

  useEffect(() => {
    fetch_details()
  }, [])
  

  return (
    <div style={{backgroundColor:'var(--bgColor)', height:'100vh'}}>
      <Header/>
      <br/>
      {

        correctUserType
        ? 

      <Grid container rowSpacing={2} spacing={2} style={{backgroundColor:'var(--bgColor)'}}>
        <Grid item xs={8} >
          <Card sx={{minHeight:250}} style= {{padding:'1%',width:'99%',marginLeft:'1%'}}>
            <Typography variant="h4" style={{color:'var(--orange)'}}>
              Last Order :-            
            </Typography>
            <br/>
              {
                totalOrdersCount == 0
                ?
                <Typography variant="h6" style={{color:'var(--orange)'}}>
                  No orders placed
                </Typography>
                :
                
                <div>
                <Typography variant="h6" style={{color:'var(--orange)'}}>
                Shop : {lastOrderShopName}
                </Typography>
                <Typography variant="h6" style={{color:'var(--orange)'}}>
                Order Date : {lastOrder.creation_date}
                </Typography>
                <Typography variant="h6" style={{color:'var(--orange)'}}>
                Order Status : {lastOrder.status=='Pending' ? <span>{lastOrder.status}</span> : <span>{lastOrder.status} ({lastOrder.completion_date})</span>}
                </Typography>
                <Typography variant="h6" style={{color:'var(--orange)'}}>
                Items : {lastOrderItems}
                </Typography>
                </div>
              }
          </Card>
        </Grid>

        <Grid item xs={4}>
          <center>
            <Link to="/order_history" style={{textDecoration: 'none'}}>
              <Card sx={{minHeight:250}} style= {{padding:'1%',width:'98%',marginRight:'2%'}}>
                <Typography variant="h1" style={{color:'green'}}>
                  {totalOrdersCount}
                </Typography>
                <Typography variant="h5" style={{color:'green'}} >
                  Order{totalOrdersCount==1?'':'s'} Placed
                </Typography>
                <Typography variant="h6" style={{color:'green'}} >
                  ({pendingOrdersCount} Order{pendingOrdersCount==1?'':'s'} Pending)
                </Typography>
              </Card>
            </Link>
            </center>
        </Grid>

        <Grid item xs={12}>
          <center>
            <Card sx={{minHeight:'fit-content'}} style= {{padding:'1%',width:'98%',marginLeft:'1%',marginRight:'1%'}}>
              <Typography variant="h5" style={{color:'var(--orange)'}}>
                SHOPS LIST
              </Typography>
            </Card>
            </center>
        </Grid>

        {shops.map((shop)=>
        {
            return(
              <Grid item xs={4}>
                <Link to="/shop_page" state={{shop:shop}} style={{textDecoration: 'none'}}>
                <center>                  
                  <Card sx={{minHeight:'fit-content'}} style= {{padding:'1%',width:'95%',marginLeft:'2.5%',marginRight:'2.5%'}}>
                    <img src='shop_image_template.jpg' style={{width:'100%'}} alt='shop_placeholder_image'/>
                    <Typography variant="h5" style={{color:'var(--orange)'}}>
                      {shop.name}
                    </Typography>
                    <Rating name="read-only" value={shop.rating} precision={0.5} readOnly />
                  </Card>
                  </center>
                  </Link>
              </Grid>
            )
        })}
      
      <Grid item xs={12}/>
      
      </Grid>

      : 

      <Typography variant="h4" style={{color:'var(--orange)'}}>
          Incorrect User Type Homepage Access Attempted. Please login again.  
      </Typography>

      }
    </div>
  )
}

export default CustomerHome