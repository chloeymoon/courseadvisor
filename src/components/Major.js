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
      testingmajor: 'Department',
      courses: {}
    };
  }

  //TESTINGMAJOR updated in this.state, onChange from dropdown
  majorSave(event, index, value){
    fetch('api/testingmajor', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courses: this.state.courses,
        testingmajor: value
      })
    }).then((response) => {
      console.log('majorSave() response here', response);
      return (response.json());
    }).then((obj)=>{
      this.setState({testingmajor: value});
      console.log('testing major saved, obj', obj);
    }).catch((err)=>{
      console.log('err saving testingmajor', err);
    });
  }
  //eventually reset testingmajor state

// getting from server, this is course but eventually get user and use coursesn
  componentDidMount(){
    fetch('/api/getuser', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courses: this.state.courses,
        testingmajor: this.state.testingmajor //no use b/c server side sents userobj.course
      })
    }).then((response)  => {
      console.log('from Major.js, resp for api/getuser here', response);
      return (response.json());
    }).then((obj)=>{
      console.log('Major.js api/getuserresp user obj here', obj);
      this.setState({courses: obj.courses, testingmajor: obj.testingmajor});
    });
  }

  render(){
    return (
      <div className="background">
      <div>
        {/* <Link to="/logout">Log Out</Link> */}
        <Link to="/users">Profile</Link>
        <h1>Major here</h1>
        <h3>Pick a major</h3>
        <MuiThemeProvider>
        <DropDownMenu
          value={this.state.testingmajor}
          onChange={this.majorSave.bind(this)}
          openImmediately={false}
          autoWidth={false}
          maxHeight={300}>
          <MenuItem value='Department' primaryText="Department" />
          <MenuItem value="ECON" primaryText="Economics" />
          <MenuItem value="CS" primaryText="Computer Science" />
          <MenuItem value="MATH" primaryText="Mathematics" />
        </DropDownMenu>
      </MuiThemeProvider>
      </div>
      <div>
          <UserCourses />
      </div>
      <h3>Courses to take to complete {this.state.testingmajor} major:</h3>
      </div>
    );
  }
}

module.exports={
  Major
};
