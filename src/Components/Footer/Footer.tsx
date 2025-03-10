import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>

        <hr />

        <div className="footer-bootom">
            <p className="footer-bottom-left">@ 2024 Tharindu Madushanka.All rights reserved.</p>
            <div className="footer-bottom-right">
                <p>Term of Services</p>
                <p>Privacy Policy</p>
                <p>Connect with me</p>
            </div>
        </div>
      
    </div>
  )
}

export default Footer
