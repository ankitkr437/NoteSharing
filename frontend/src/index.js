import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"; 
import { AuthContextProvider } from "./context/AuthContext.js";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
cookies.set('SameSite', 'None', { path: '/' });
ReactDOM.render(
  <Router>
  <AuthContextProvider>
  <App />
  </AuthContextProvider>
  </Router>,
  document.getElementById('root')
);
 
 
