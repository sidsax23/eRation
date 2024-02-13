import React, { useContext,useEffect,useState }from 'react'
import Header from '../Header/Header.jsx'
import { userContext } from '../App.jsx';
import axios from 'axios';
import { Card, Grid, Typography, Rating} from '@mui/material'
import {Link} from 'react-router-dom';  
import DataTable from 'react-data-table-component';

const ShopKeeperHome = () => 
{
  const [userId, userType, setUserType, setUserId] = useContext(userContext);

  const [correctUserType,setCorrectUserType] = useState(true)
  const [shop,setShop] = useState([])
  const [rating,setRating] = useState(0)
  const [inventory,setInventory] = useState([])

  async function fetch_details()
  {
      const userTypeResponse = await axios.post(process.env.REACT_APP_USER_URL+"details/", JSON.stringify({'user_id':userId})) 
      if(JSON.parse(userTypeResponse.data.serealized_response)[0].fields.type != userType)
          setCorrectUserType(false)

      const shopsResponse = await axios.post(process.env.REACT_APP_USER_URL+"shop_details/", JSON.stringify({'shop_id':userId})) 
      setShop(shopsResponse.data.shop)
      try{
        setRating(parseFloat(shopsResponse.data.shop.rating).toFixed(1))
      }
      catch
      {
        setRating(0)
      }
      setInventory(shopsResponse.data.items)
  }

  useEffect(() => {
    fetch_details()
  }, [])

  const columns = [
    {
        name: 'S. No.',
        selector: row => row.sno,
        sortable: true,
    },
    {
        name: 'Item',
        selector: row => row.item_name,
        sortable: true,
    },
    {
        name: 'Quantity',
        selector: row => row.quantity,
        sortable: true,
    },
    {
        name: 'Selling Price (₹)',
        selector: row => row.selling_price,
        sortable: true,
    },
];
  

  return (
    <div style={{backgroundColor:'var(--bgColor)', height:'100vh'}}>
      <Header/>
      <br/>
      {

        correctUserType
        ? 

      <Grid container rowSpacing={2} spacing={2} style={{backgroundColor:'var(--bgColor)'}}>
        
        <Grid item xs={6} >  
          <Card sx={{minHeight:'fit-content', height:300, overflow:'auto'}} style= {{padding:'1%',width:'99%',marginLeft:'1%'}}>
          <div style={{margin:'auto', textAlign: 'center'}}>
          <Typography variant="h5" style={{color:'var(--orange)'}}>
              INVENTORY
          </Typography> 
          <br/>
          </div>

          <DataTable
		        	columns={columns}
		        	data={inventory}
		        />
          
          </Card>
 
        </Grid>

        <Grid item xs={3} >
        <div style={{margin:'auto', textAlign: 'center'}}>
          <Link to="/feedback_page" style={{textDecoration: 'none'}}>
          <Card sx={{minHeight:'fit-content', height:300, overflow:'auto'}} style= {{padding:'1%',width:'99%',marginLeft:'1%'}}>
          <Typography variant="h5" style={{color:'var(--orange)'}}>
              {shop.name} 
          </Typography> 
          <Typography variant="h1" style={{color:'var(--orange)'}}>
              {rating}/5 
          </Typography>   
          <Rating name="read-only" value={rating} precision={0.5} readOnly /> 
          <br/>
          <Typography variant="h6" style={{color:'var(--orange)'}}>
          ({shop.reviewCount} review{shop.reviewCount==1?'':'s'})
          </Typography>
          </Card>
          </Link>
          </div>
        </Grid>

        <Grid item xs={3}>
          <div style={{margin:'auto', textAlign: 'center'}}>
            <Link to="/order_history" style={{textDecoration: 'none'}}>
              <Card sx={{minHeight:'fit-content', height:300, overflow:'auto'}} style= {{padding:'1%',width:'98%',marginRight:'2%'}}>
                <Typography variant="h1" style={{color:'green'}}>
                  {shop.totalOrdersCount}
                </Typography>
                <Typography variant="h5" style={{color:'green'}} >
                  Order{shop.totalOrdersCount==1?'':'s'} Received
                </Typography>
                <Typography variant="h6" style={{color:'green'}} >
                  ({shop.pendingOrdersCount} Order{shop.pendingOrdersCount==1?'':'s'} Pending)
                </Typography>
              </Card>
            </Link>
            </div>
        </Grid>

       
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

export default ShopKeeperHome