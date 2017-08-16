import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';
import UserCourses from './UserCourses';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

require('../css/profile.css');

class Major extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: "Department"
    };
  }
  render(){
    return (
      <div className="background">
      <div>
        <h1>Major here</h1>
        <h3>Changing Major to:</h3>
        <MuiThemeProvider>
        <DropDownMenu
          value={this.state.value}
          onChange={(else)=> {}}
          openImmediately={false}
          autoWidth={false}
          maxHeight={300}>
          <MenuItem value="Department" primaryText="Department" />
          <MenuItem value="ECON" primaryText="Economics" />
          <MenuItem value="CS" primaryText="Computer Science" />
          <MenuItem value="MATH" primaryText="Mathematics" />
        </DropDownMenu>
      </MuiThemeProvider>
      </div>
      <div>
          <UserCourses />
      </div>
      </div>
    );
  }
}

module.exports={
  Major
};
