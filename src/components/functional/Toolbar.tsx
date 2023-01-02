import { Toolbar, Typography, AppBar, Button} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom'

interface ToolbarProps {
    label: string;
  }

const tb: React.FC<ToolbarProps> = ({ label }) => {

    return (
        <AppBar position="static">
        <Toolbar>
        <div style={{ display:'flex', justifyContent: 'left'}}>
            <Typography variant="h6" color="inherit" component="div">
                {label}
            </Typography>
        </div>
            <Link to="/logout" style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">Logout</Button>
            </Link>
        </Toolbar>
        </AppBar>
    )
}

export default tb