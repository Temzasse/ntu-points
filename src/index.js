import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBJYW4aj13uzGlnJWpOfZpVq5dC1SlFL94",
  authDomain: "ntu-points.firebaseapp.com",
  databaseURL: "https://ntu-points.firebaseio.com",
  projectId: "ntu-points",
  storageBucket: "ntu-points.appspot.com",
  messagingSenderId: "405623504994"
};

firebase.initializeApp(config);

// localStorage.setItem('authStatus', 'false');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
