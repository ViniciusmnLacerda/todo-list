import React, { Component } from 'react';
import MainCard from './components/MainCard';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <MainCard />
      </div>
    );
  }
}

export default App;
