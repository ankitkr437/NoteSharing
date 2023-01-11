import React from 'react'
import Topbar from '../../component/topbar/Topbar';
import Author from '../../component/Author/Author.jsx';
import Right from './right/Right';
import RenderPost from './left/RenderPost.js';
import Footer from '../../component/footer/Footer';
import Profile from '../profile/Profile';
import Homeprofile from './leftmost/Homeprofile.jsx';
import './Home.css';

import SellHome from '../../component/sellhome/SellHome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
const Home = () => {
   

    return (
        <>
        <div className='home-top'>
        <SellHome/>
        <p className="featured-authors-text">Featured authors</p>
        <Author />
        </div>
           <div className='main'>
          <div className='leftmost-container'>
          <Homeprofile />
           </div> 
           <div className='left-container'>
          <RenderPost />
           </div> 
           <div className='right-container'>
           <Right> </Right> 
           </div>
           </div>
          
        </>
    )
}

export default Home
