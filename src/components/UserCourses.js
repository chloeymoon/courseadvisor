import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

require('../css/profile.css');

const styles = {
  nopadding :{
    padding: 0
  }
};

class UserCourses extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      courses: {}
    };
  }
  componentDidMount(){
    // axios call
    // .then( this.setState({courses: something here ) )
    fetch('/api/getcourse', {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courses: this.state.courses
      })
    }).then((response)  => {
      console.log('resp for api/getcourse here', response);
      return (response.json());
    }).then((obj)=>{
      console.log('api/getcourse resp courses obj here', obj);
      this.setState({courses: obj});
    });
  }


  render(){
    return(
      <div>
        <h3>Courses you've taken</h3>
        <div>
        <ul style={styles.nopadding}>
          {Object.keys(this.state.courses).map((key)=>
            <p key={key}>{this.state.courses[key].dept} {this.state.courses[key].number}</p>
          )}
        </ul>
        </div>
      </div>
    );
  }
}


export default UserCourses;
