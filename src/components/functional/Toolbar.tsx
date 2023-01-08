import { Toolbar, Typography, AppBar, Button} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'

const tb: React.FC = () => {

    return (
        <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between", verticalAlign: "middle"}}>
        <div style={{ display:'flex', justifyContent: 'left'}}>
            
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <Button color="inherit">
                    <Typography variant="h5" color="inherit" component="div" style={{ textTransform: 'none' }}>
                    TagUp
                    </Typography>
                    </Button>
                </Link>

        </div>
        <div style={{ display:'flex'}}>
        {localStorage.getItem('token') 
        ? <Typography variant="h6" color="inherit" component="div">
            Logged in as {localStorage.getItem('username')} - 
            <Link to="/logout" style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">
                <Typography variant="h6" color="inherit" component="div">Logout</Typography>
                </Button>
            </Link>
        </Typography>
        :<Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
        <Button color="inherit">
        <Typography variant="h6" color="inherit" component="div">Log in</Typography>
        </Button>
        </Link>}
        </div>
        </Toolbar>
        </AppBar>
    )
}

export default tb