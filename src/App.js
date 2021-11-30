import React from 'react';
import './App.css';
import ControlElement from './ControlElement';
import Box from '@mui/material/Box';

class App extends React.Component {
  render(){
    return (
      <Box className="mainContainer">
        <Box className="titles">
          <h1 className="title">To-Do App</h1>
        </Box>
        <ControlElement />
      </Box>
    );
    }
}

export default App;