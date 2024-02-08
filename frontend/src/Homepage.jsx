
import './Static/vendors/css/2cols.css'
import './Static/vendors/css/3cols.css'
import './Static/vendors/css/4cols.css'
import './Static/vendors/css/5cols.css'
import './Static/vendors/css/6cols.css'
import './Static/vendors/css/7cols.css'
import './Static/vendors/css/8cols.css'
import './Static/vendors/css/9cols.css'
import './Static/vendors/css/10cols.css'
import './Static/vendors/css/11cols.css'
import './Static/vendors/css/12cols.css'
import './Static/vendors/css/col.css'
import './Static/vendors/css/html5reset.css'
import './Static/vendors/css/normalize.css'
import './Static/resources/css/style.css'
import { Link } from "react-router-dom";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useState } from 'react'

function Homepage()
{

    const [open, setOpen] = useState(true);

    const handleClick = () => { setOpen(!open); };

    const theme = createTheme(
      {
        palette: 
        {
          orange: 
          {
            main: 'var(--orange)',
          },
        },
      });

    return(
        <>
        <ThemeProvider theme={theme}>
        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300&family=Open+Sans+Condensed:wght@300&display=swap"
          rel="stylesheet"
        />
        <header>
          <nav>
            <div className="row">
            <Link to="/"><img src='eRation.png' height='150' alt="eRation_logo"/></Link>                    
              <ul className="main-nav">
                <li>
                  {" "}
                  <a href="#section-feat">How It works</a>
                </li>
                <li>
                  {" "}
                  <a href="#section-meal">Ration Items</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="hero-text-box">
            <h1>
              One Nation
              <br /> One Ration Card{" "}
            </h1>
            <Link to="login" className="btn btn-full" >
              Log In
            </Link>
            <a className="btn btn-ghost" href="#summaryy">
              Know More
            </a>
          </div>
        </header>
        <section className="section-features" id="section-feat">
          <div className="row">
            <h2>Rationing made easy</h2>
            <p style={{textAlign:'center'}}>
              eRation is a digital platform aimed to improve the current system of PDS by efficient management of ration.
            </p>
          </div>
          <br/>
          <br/>
          <div className="row">
            <div className="span_1_of_2 box" >            
                <List 
                    sx={{ width: '150%', bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader=
                    {
                        <ListSubheader component="div" id="nested-list-subheader">
                            HOW IT WORKS :
                        </ListSubheader>
                    }
                >
                <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <CreditCardIcon color='orange'/>
                </ListItemIcon>
                <ListItemText primary="For Ration Card Holders" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemText primary="Step 1 : Login to the website by entering the mobile number and ration card number." />
                    <ListItemText primary="Step 2 : Select the shop and the desired items." />
                    <ListItemText primary="Step 3 : Confirm the order and generate the order history." />
                    <ListItemText primary="Step 4 : Provide feedback. (Optional)" />       
                </List>
              </Collapse>
            </List>
            </div>
          </div>
          <div className="row">
            <div className="span_2_of_2 box">
              
              <h3><StorefrontIcon color='orange'/> For Shop-Owners :</h3>
              <p>
                Step1: Login by entering the mobile number as login-Id and license
                number as password.
              </p>
              <p>Step2: Update the shop timings and edit stock details.</p>
              <p>Step3: Confirm the order received by the customer.</p>
            </div>
          </div>
        </section>
        <section className="section-meals" id="section-meal">
          <ul className="meals-showcase clearfix">
            <li>
              <div className="container">
                <figure className="meal-photo" id="photo1">
                  <img src="./Static/resources/img/food1.jpeg" alt="food-image" />
                  <div className="middle">
                    <div className="text">Flour</div>
                  </div>
                </figure>
              </div>
            </li>
            <li>
              <figure className="meal-photo">
                <img src="./Static/resources/img/food8.jpeg" alt="food-image" />
                <div className="middle">
                  <div className="text">Sugar</div>
                </div>
              </figure>
            </li>
            <li>
              <figure className="meal-photo">
                <img src="./Static/resources\img\moong-dal-chhilke (1).png" alt="food-image" />
                <div className="middle">
                  <div className="text">Moong Dal</div>
                </div>
              </figure>
            </li>
          </ul>
          <ul className="meals-showcase clearfix">
            <li>
              <figure className="meal-photo">
                <img src="./Static/resources/img/food4.png" alt="shop-image" />
                <div className="middle">
                  <div className="text">Rice</div>
                </div>
              </figure>
            </li>
            <li>
              <figure className="meal-photo">
                <img src="./Static/resources/img/food10.png" alt="shop-image" />
                <div className="middle">
                  <div className="text">Chana Dal</div>
                </div>
              </figure>
            </li>
            <li>
              <figure className="meal-photo">
                <img src="./Static/resources\img\food14 (1).png" alt="shop-image" />
                <div className="middle">
                  <div className="text">Kerosene</div>
                </div>
              </figure>
            </li>
          </ul>
        </section>
        <section className="summary" id="summaryy">
          <br />
          <p></p>
          <div className="row">
            <h2>Know More</h2>
          </div>
          <p className="sec-text">
            Public Distribution System (PDS) is an Indian food security system. It is
            established by the Government of India under Ministry of Consumer Affairs,
            Food, and Public Distribution and managed jointly with state governments
            in India. The traditional PDS is used to distribute grocery items to
            India's poor who are valid ration card holders. The validity and the
            allocation of the ration cards is monitored by the state governments. A
            ration card holder should be given 35 kg of food grain as per the norms of
            PDS.However, there are concerns about the efficiency of the distribution
            process. In order to make it efficient and improve the current system of
            PDS we are implementing e-Ration Shop. Here we are going to make a website
            for shopping purpose. Using this website ration card holder can order
            his/her grocery items from the FPS online. The main reason for using this
            website is making this process computerized and to remove the drawbacks of
            the present way of issuing products based on ration card.
          </p>
          <p />
        </section>
        <div className="footer">
          <span>
            <p className="txt">
              Created by <a href="ASK.html"> Team Tech ASK</a> |{" "}
              <span className="far fa-copyright" /> 2021 All rights reserved.{" "}
            </p>{" "}
          </span>
        </div>
        {/* Option 1: Bootstrap Bundle with Popper */}
        {/* Option 2: Separate Popper and Bootstrap JS */}
        </ThemeProvider>
        </>
      
    )
}

export default Homepage