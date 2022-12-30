import BasicThreadList from '../components/BasicThreadList';
import React from 'react';
import { Navigate } from "react-router-dom";

const Home: React.FC = () => {
    //If user is not logged in, bring them to the login page
    if(!localStorage.hasOwnProperty("token")) {
        return <Navigate to="/login" />;
    }

    else {
        return (
            <>
                <h3>
                    {"Welcome to CVWO's sample react app! Here's a basic list of forum threads for you to experiment with."}
                </h3>
                <br />
                <BasicThreadList />
            </>
        );
    }
    
};

export default Home;
