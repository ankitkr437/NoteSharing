import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom"; 
import Cookies from 'universal-cookie';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
const cookies = new Cookies();
cookies.set('SameSite', 'None', { path: '/' });
ReactDOM.render(
  <Router>
 <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  </Router>,
  document.getElementById('root')
);
 
 
