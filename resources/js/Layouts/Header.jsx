import React from "react";
import '../../css/StartingPage.css';

function Header({ children }) {
    return (
        <>
            <div className='background'>
                <div className='text'>Lets get things done</div>
            </div>
            <hr />
        </>
    );
}

export default Header;