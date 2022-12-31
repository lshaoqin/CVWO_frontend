import { Toolbar, Typography } from '@material-ui/core';
import React from 'react';

const tb: React.FC<string> = (label:string) => {
    return (
        <Toolbar>
            <Typography variant="h6" color="inherit" component="div">
                {label}
            </Typography>
        </Toolbar>
    )
}
//TODO: Add logout
export default tb