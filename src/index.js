import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Profile from './components/Profile'
import Semester from './components/Semester'

ReactDOM.render(<Semester />, document.getElementById('root'));
registerServiceWorker();
