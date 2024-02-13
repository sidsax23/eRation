import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom' 
import LoginPage from './Login_Page.jsx'
import Homepage from './Homepage.jsx';
import CustomerHome from './Customer/CustomerHome.jsx';
import ShopKeeperHome from './ShopKeeper/ShopKeeperHome.jsx';
import ProfilePage from './Common Pages/ProfilePage.jsx';
import OrderHistory from './Common Pages/OrderHistory.jsx';
import ShopPage from './Customer/ShopPage.jsx';
import FeedbackPage from './ShopKeeper/FeedbackPage.jsx';
import { useState } from 'react'; 



function App()    
{

  const [userId, setUserId] = useState(loggedIn()?localStorage.getItem('user-id'):null);
  const [userType, setUserType] = useState(loggedIn()?localStorage.getItem('user-type'):null);

  function loggedIn()
  {
    const userId = localStorage.getItem('user-id');
    if(!userId || userId === 'undefined' || userId === null)
    {
      return false;
    }
    return true;
      
  }

  //Logging out the user across all tabs if the user logs out from any open tab.
  window.addEventListener("storage", async () => {
    if(!loggedIn())
    {
        //LOGOUT PROCESS
        setUserId(null);
        setUserType(null);
        localStorage.removeItem('user-id');
        localStorage.removeItem('user-type');
    }
  });
  


  return (
    <userContext.Provider value={[userId, userType, setUserType, setUserId]}>
    <Router>
      <Routes>
        <Route exact path="/" element = 
          {
            userId ? userType==='Customer' ? <CustomerHome/> : <ShopKeeperHome/> : <Homepage/>
          }
        />
        <Route exact path="/login" element =
          {
            userId ? userType==='Customer' ? <CustomerHome /> : <ShopKeeperHome/> : <LoginPage />
          }
        />
        <Route exact path="/profile" element =
          {
            userId ? <ProfilePage/> : <LoginPage />
          }
        />
        <Route exact path="/order_history" element =
          {
            userId ? <OrderHistory/> : <LoginPage />
          }
        />
        <Route exact path="/shop_page" element =
          {
            userId &&  userType==='Customer' ? <ShopPage/> : <LoginPage />
          }
        />
        <Route exact path="/feedback_page" element =
          {
            userId &&  userType!='Customer' ? <FeedbackPage/> : <LoginPage />
          }
        />
      </Routes>
    </Router>   
    </userContext.Provider>
  );
}

export default App;
export const userContext = React.createContext()
