import React from 'react';
import './App.css';
import Box from '@mui/material/Box';

import ControlElement from './ControlElement';


function App (){
  
    return (
      <Box className="mainContainer">
        <Box className="titles">
          <h1 className="title">To-Do App</h1>
        </Box>
        <ControlElement />
      </Box>
    );
    
}

export default App;