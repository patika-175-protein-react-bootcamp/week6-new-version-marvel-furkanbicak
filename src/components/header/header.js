import React from 'react';
import './header.css'

const Header = () => {
    return(
        <div className="headerContainer">
            <div id="image1">
                <img 
                        src = { 'images/image1.svg' }  
                        alt = 'Logo'
                />
            </div>

            <div id="marvelLogo">
                <img 
                        src = { 'images/image2.svg' } 
                        alt = 'Logo'
                />
            </div>
        </div>
    )
}
export default Header;