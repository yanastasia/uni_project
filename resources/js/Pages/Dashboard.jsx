import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import '../../css/StartingPage.css';


export default function Dashboard({ auth }) {
    const handleStartClick = () => {
        Inertia.visit('/boards');
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Welcome" />

            <div>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-teal-50">Stay Informed, Stay Ahead!</h1>
                        <p className="mt-4 text-teal-100">Keep being updated and never miss something important. Your success journey begins with UniNotes.</p>
                        <div className="mt-6">
                            <blockquote className="italic text-teal-50">
                                "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
                            </blockquote>
                        </div>
                        <div className="mt-8">
                            <button onClick={handleStartClick} id='start_button' className='create'>Get Started</button>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
