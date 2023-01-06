import { Navigate } from 'react-router-dom';

function logout (){
    // Log out the user and redirect to the login page
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return <Navigate to="/login" />;
    } 

export default logout;