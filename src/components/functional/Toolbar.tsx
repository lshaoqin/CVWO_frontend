import { Toolbar, Typography, AppBar, Button} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'

interface ToolbarProps {
    label: string;
  }

const tb: React.FC<ToolbarProps> = ({ label }) => {

    return (
        <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display:'flex', justifyContent: 'left'}}>
            
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <Button color="inherit">
                    <Typography variant="h5" color="inherit" component="div" style={{ textTransform: 'none' }}>
                    {label}
                    </Typography>
                    </Button>
                </Link>

        </div>
        <div style={{ display:'flex'}}>
        <Typography variant="h6" color="inherit" component="div">
            Logged in as {localStorage.getItem('username')} - 
            <Link to="/logout" style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">
                <Typography variant="h6" color="inherit" component="div">Logout</Typography>
                </Button>
            </Link>
        </Typography>
        </div>
        </Toolbar>
        </AppBar>
    )
}

export default tb