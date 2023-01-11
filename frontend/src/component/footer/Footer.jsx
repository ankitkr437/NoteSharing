import React from 'react'
import './Footer.css';

const Footer = () => {
    return (
        <>
         <div className='footer-complete-container' style={{marginTop:"5vh"}}> 
         <div className='footer-container'>
              <div className='contact-upper'>
              <p style={{fontSize:"17x"}}>all rights reserved</p>
              <p style={{fontSize:"17x"}}>contact us</p>
              </div>
              <div className='contact-text'>
              <a href="mailto:ankitloharshi@gmail.com">  <img src="https://img.icons8.com/ios/50/000000/email-open.png" className='contact-img'/>
             </a>
              <a href="https://github.com/ankitkr437/Handnotes"> <img src="https://img.icons8.com/ios-glyphs/50/000000/github.png" className='contact-img'/></a>
              </div>
         </div>  
         </div>
        </>
    )
}

export default Footer
