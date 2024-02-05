import {Box} from '@mui/material';
import './App.css';
import LoginPage from './Login_Page'

function App() {
  return (
    <div className="App">
      <body>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <LoginPage/>
        </Box>      
      </body>
    </div>
  );
}

export default App;
