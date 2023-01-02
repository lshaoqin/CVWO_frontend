import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LogOut from './pages/LogOut';
import CreatePost from './pages/CreatePost';
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';
import PostGenerator from './components/posts/PostGenerator';


const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

// The router links each view to its corresponding path
const App: React.FC = () => {

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/logout" element={<LogOut />} />
                        <Route path="/newpost" element={<CreatePost />} />
                        <Route path="/posts/:postId" element={<PostGenerator />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};


export default App;
