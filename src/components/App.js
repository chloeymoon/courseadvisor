import Profile from './Profile';
import Register from './Register';
import Major from './Major';
import { BrowserRouter, Route } from 'react-router-dom';

var React = require('react');
var ReactDOM = require('react-dom');
// var Register = require('./Components/register')

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <div>
        {/* <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> */}
        {/* <Route path='/documentPortal' component={DocumentPortal} />
        <Route path='/editor/:docId' component={MyEditor} /> */}
        <Route path="/major" component={Major} />
        <Route path="/users" component={Profile} />
        <Route exact path="/" component={Profile} />
        {/* <Route path="/users" component={Profile} /> */}
      </div>
    </BrowserRouter>
  );
  }
}

export default App
