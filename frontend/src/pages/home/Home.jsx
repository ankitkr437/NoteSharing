import React from 'react'
import Topbar from '../../component/topbar/Topbar';
import Author from '../../component/Author/Author.jsx';
import RenderPost from './center/RenderPost.js';
import Homeprofile from './left/Homeprofile.jsx';
import './Home.css';
import UploadNote from '../../component/uploadNote/UploadNote'
import Navbar from '../../component/Navbar';
import Footer from '../../component/footer/Footer'
import BuildConversation from '../../component/BuildConversation/BuildConversation'
const Home = () => {

    return (
        <>
        <Navbar />
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
            <BuildConversation />
           </div>
          </div>
          
        </div>
        <Footer />
        </>
    )
}

export default Home
