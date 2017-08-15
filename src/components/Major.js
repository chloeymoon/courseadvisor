import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';

class Major extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
      <div>
        <h1>Major here</h1>
      </div>
    );
  }
}

export default Major;
