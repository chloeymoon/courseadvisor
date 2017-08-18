import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
// require('../css/profile.css');

const styles = {
  errorStyle: {
    color: '#01579B',
  },
  underlineStyle: {
    borderColor: '#01579B',
  },
  floatingLabelStyle: {
    color: 'white',
  },
  floatingLabelFocusStyle: {
    color: '#01579B',
  },
  underlineStyle: {
    borderColor: 'white',
  },
  underlineFocusStyle: {
    borderColor: '#01579B',
  },
  buttons: {
    width: '100px',
    margin: '2px',
    color: 'black',
    backgroundColor: 'white'
  }
};

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: '', password: ''}
  }

  handleUsernameChange(e) {
  this.setState({username: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value})
  }

  handleSubmit() {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    this.setState({username: '', password: ''})
  }

  render(){
    return (
      <div>this is actually a homepage from react app</div>
    //   <div className = "background">
    //     <div className="container" style={{textAlign: 'center'}}>
    //       <div className="login">
    //         <h1>This is actually a homepage</h1>
    //       <div className="username">
    //         <MuiThemeProvider>
    //           <TextField
    //             type="text"
    //             onChange={(e) => this.handleUsernameChange(e)}
    //             value={this.state.username}
    //             floatingLabelText="username"
    //             floatingLabelStyle={styles.floatingLabelStyle}
    //             floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    //             // underlineStyle={styles.underlineStyle}
    //             underlineFocusStyle={styles.underlineFocusStyle}
    //         />
    //         </MuiThemeProvider>
    //       </div>
    //       <div className="password">
    //         <MuiThemeProvider>
    //           <TextField
    //             type="password"
    //             onChange={(e) => this.handlePasswordChange(e)}
    //             value={this.state.password}
    //             floatingLabelText="password"
    //             floatingLabelStyle={styles.floatingLabelStyle}
    //             floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
    //             // underlineStyle={styles.underlineStyle}
    //             underlineFocusStyle={styles.underlineFocusStyle}
    //           />
    //         </MuiThemeProvider>
    //       </div>
    //       <div className="registerbutton">
    //         <MuiThemeProvider>
    //           <FlatButton
    //             style={styles.buttons}
    //             label="REGISTER"
    //             onClick={() => this.handleSubmit()}
    //             hoverColor={'#01579B'}
    //           />
    //         </MuiThemeProvider>
    //       </div>
    //       <div className="loginbutton">
    //         <Link to="/login">
    //         <MuiThemeProvider>
    //           <FlatButton
    //             style={styles.buttons}
    //             label="LOGIN"
    //             hoverColor={'#01579B'}
    //           />
    //         </MuiThemeProvider>
    //       </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    )
  }
}

export default Register
