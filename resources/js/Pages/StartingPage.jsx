//delete it not needed
import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import '../../css/StartingPage.css';
import Header from '../Layouts/Header';

function StartingPage() {

    const handleStartClick = () => {
        Inertia.visit('/boards');
    };

    return (
        <>  
           <Header/>
            <div className='containerbackground'>
                <p>Start Your Productivity Journey</p>
            </div>
            <div className='create_button'>
                <button onClick={handleStartClick} id='start_button' className='create'>Start</button>
            </div>
        </>
    );
}

export default StartingPage;