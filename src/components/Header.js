import React from 'react';
import './header.css';
import image from './Standard-It_V2_B.png';

const Header = () => {
    return (
        <div>
            <img className='logo' src={image} alt="" />
        </div>
    );
};

export default Header;