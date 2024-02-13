import React, { useContext, useState,useEffect }  from 'react'
import Header from '../Header/Header'
import { userContext } from '../App';
import {  Button, Card, Typography,  Box,Snackbar } from '@mui/material'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';


const OrderHistory = () => 
{
    const [userId, userType, setUserType, setUserId] = useContext(userContext);
    const [correctUserType,setCorrectUserType] = useState(true)
    const [orders,setOrders] = useState([])


    const [successSnackbar,setSuccessSnackbar] = useState(true)
    const [openSnackbar,setOpenSnackbar] = useState(false)
    const [snackbarMessage,setSnackbarMessage] = useState("")
    const [loading, setLoading] = useState(false);

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

    async function fetch_orders()
    {
        const userTypeResponse = await axios.post(process.env.REACT_APP_USER_URL+"details/", JSON.stringify({'user_id':userId})) 
        if(JSON.parse(userTypeResponse.data.serealized_response)[0].fields.type != userType)
          setCorrectUserType(false)
        else
        {
            const orderResponse = await axios.post(process.env.REACT_APP_ORDER_URL+"list/", JSON.stringify({'user_id':userId,'user_type':userType})) 
            setOrders(orderResponse.data.orders)
        }
        
    }


    useEffect(() => {
        fetch_orders()
      }, [])

    const customerColumns = [
        {
            name: 'S. No.',
            selector: row => row.sno,
            sortable: true,
        },
        {
            name: userType=='Customer'? 'Shop':'Customer',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => row.creation_date,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status=='Completed'?row.status+" ("+row.completion_date+")":row.status,
            sortable: true,
        },
        {
            name: 'Items',
            selector: row => row.items_name,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.total_amount,
            sortable: true,
        },
    ];

    const ShopkeeperColumns = customerColumns.concat({
        name: 'Complete Order',
        selector: row=> <Button disabled={row.status=='Completed'?true:false} variant="contained" color="success" onClick={()=>{completeOrder(row.id)}}>
                    <CheckCircleOutlineIcon/></Button>
                    ,
    })

    async function completeOrder(order_id)
    {
        setLoading(true)
        const orderResponse = await axios.post(process.env.REACT_APP_ORDER_URL+"updatestatus/", JSON.stringify({'order_id':order_id})) 
        setLoading(false)
        if(orderResponse.data.status==1)
        {
          setSuccessSnackbar(true);
        }
        else
        {
          setSuccessSnackbar(false);
        }
        setSnackbarMessage(orderResponse.data.message);
        setOpenSnackbar(true);
        fetch_orders()
    }
        

  return (
    <div style={{backgroundColor:'var(--bgColor)', height:'100vh'}}>
        <Header/>
        <br/>
        {
             correctUserType
             ?
             <div>
            <Card sx={{minHeight:'fit-content'}} style= {{padding:'1%',width:'98%',marginLeft:'1%',marginRight:'1%'}}>
                <div style={{margin: 'auto', textAlign: 'center'}}>
                <Typography variant="h4" style={{color:'var(--orange)'}}>
                    ORDER HISTORY 
                </Typography> 
                <br/>
                <DataTable
		        	columns={userType=="Customer"?customerColumns:ShopkeeperColumns}
		        	data={orders}
		        />

                </div>              
            </Card>

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
                Incorrect User Type Order History Access Attempted. Please login again.  
            </Typography>
        }

        

    </div>
  )
}

export default OrderHistory