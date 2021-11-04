import React from 'react';
import './App.css';
import ControlElement from './ControlElement';

class App extends React.Component {
  render(){
    return (
      <div className="mainContainer">
        <div className="titles">
          <h1 className="title">To-Do App</h1>
        </div>
        <ControlElement />
      </div>
    );
    }
}

export default App;