
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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react'

function Homepage()
{

    const [chOpen, setChOpen] = useState(false);
    const [soOpen, setSoOpen] = useState(false);

    const handleChClick = () => { setChOpen(!chOpen); };
    const handleSoClick = () => { setSoOpen(!soOpen); };

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



      const itemData = [
        {
          img: './img/Flour.jpg',
          title: 'Flour',
          featured: true,
        },
        {
          img: './img/Sugar.jpg',
          title: 'Sugar',
    
        },
        {
          img: './img/Moong_Daal.jpg',
          title: 'Moong Daal',
        },
        {
          img: './img/Rice.jpg',
          title: 'Rice',
          cols: 2,
        },
        {
          img: './img/Chana_Daal.jpg',
          title: 'Chana Daal',
        },
        {
          img: './img/Kerosene.png',
          title: 'Kerosene',
          featured: true,
        },
      ];


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
                  <a href="#how_it_works">How It works</a>
                </li>
                <li>
                  {" "}
                  <a href="#ration_items">Ration Items Available</a>
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
            <a className="btn btn-ghost" href="#know_more">
              Know More
            </a>
          </div>
        </header>
        <section className="section-features" id="how_it_works">
          <div className="row">
            <h2>Rationing made easy</h2>
            <p style={{textAlign:'center'}}>
              eRation is a digital platform aimed to improve the current system of PDS by efficient management of ration.
            </p>
          </div>
          <br/>
          <br/>
          <div className="row">           
                <List 
                    sx={{ width: '70%', bgcolor: 'background.paper' }}
                    component="nav"
                >
                <ListItemButton onClick={handleChClick}>
                <ListItemIcon>
                    <CreditCardIcon color='orange'/>
                </ListItemIcon>
                <ListItemText primary="For Ration Card Holders" />
                {chOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={chOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemText primary="Step 1 : Login to the website by entering your ration card number and password." />
                    <ListItemText primary="Step 2 : Select the shop and the desired items." />
                    <ListItemText primary="Step 3 : Confirm the order and generate the order history." />
                    <ListItemText primary="Step 4 : Provide feedback. (Optional)" />       
                </List>
              </Collapse>
            </List>
            </div>
          <div className="row">
            <List 
                    sx={{ width: '70%', bgcolor: 'background.paper' }}
                    component="nav"
                >
                <ListItemButton onClick={handleSoClick}>
                <ListItemIcon>
                  <StorefrontIcon color='orange'/>
                </ListItemIcon>
                <ListItemText primary="For Shop-Owners" />
                {soOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={soOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemText primary="Step 1 : Login by entering your license number and password." />
                    <ListItemText primary="Step 2 : Update the shop timings and edit stock details." />
                    <ListItemText primary="Step 3 : Confirm the order received by the customer." />     
                </List>
              </Collapse>
            </List>
          </div>
        </section>
        <section className="section-meals" id="ration_items">
          <div className="row">
            <h2>Ration Items Available</h2>
          </div>
          <ImageList cols={3}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.author}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </section>
        <section className="summary" id="know_more">
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
            allocation of the ration cards is monitored by the state governments.
            However, there are concerns about the efficiency and transparency of the 
            distribution process. eRation portal aims to address these shortcomings. 
            Using this portal, any ration card holder can order his/her grocery items online
            and any shop owner can manage orders received and the inventory of ration items. 
          </p>
          <p />
        </section>
        <div className="footer">
              Created by Vaanar Sena | 2024 All rights reserved.
        </div>
        {/* Option 1: Bootstrap Bundle with Popper */}
        {/* Option 2: Separate Popper and Bootstrap JS */}
        </ThemeProvider>
        </>
      
    )
}

export default Homepage