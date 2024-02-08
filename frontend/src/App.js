import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom' 
import LoginPage from './Login_Page.jsx'
import Homepage from './Homepage.jsx';


function App() {

  
  return (

    <Router>
      <Routes>
        <Route exact path="/" element ={<Homepage />}/>
        <Route exact path="/login" element ={<LoginPage />}/>
      </Routes>
    </Router>   
  );
}

export default App;
