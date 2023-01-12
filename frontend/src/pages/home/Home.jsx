import React from 'react'
import Topbar from '../../component/topbar/Topbar';
import Author from '../../component/Author/Author.jsx';
import Right from './right/Right';
import RenderPost from './center/RenderPost.js';
import Homeprofile from './left/Homeprofile.jsx';
import './Home.css';
import UploadNote from '../../component/uploadNote/UploadNote'
const Home = () => {
   

    return (
        <>
        <div className='home-container'>
        <div className='home-top'>
        <UploadNote/>
        <Author />
        </div>
           <div className='main'>
          <div className='left-container'>
          <Homeprofile />
           </div> 
           <div className='center-container'>
           <RenderPost /> 
           </div> 
           <div className='right-container'>
           <Right> </Right> 
           </div>
          </div>
          
        </div>
        </>
    )
}

export default Home
