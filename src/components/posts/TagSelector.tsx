import React from 'react';
import { Chip } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Container } from '@material-ui/core';
import tagOptions from './tagOptions'
import TextField from '@material-ui/core/TextField';
import Grid from '@mui/material/Grid';

const TagSelector: React.FC = () => {
    const [tags, setTags] = React.useState<Array<string>>([]);

    const handleRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
      };
    
    return (
        <Container component="main" maxWidth="md">
            <Grid item xs={4}>
            <Autocomplete
            freeSolo
                options={tagOptions}
                renderInput={(params) => 
                    <TextField {...params} label="Search for text" variant="outlined" />
                }
                onChange={(event: any, newValue: string | null) => {
                    if (newValue){
                        setTags([...tags, newValue]);
                    }
                  }}
            />
            </Grid>
            <Grid item xs={8}>
                  {tags.map(tag => (
                    <Chip
                        label={tag}
                        onClick={() => handleRemove(tag)}
                        clickable
                        color="primary" 
                        variant="outlined"
                    />
                  ))}
            </Grid>

        </Container>
    );
}

export default TagSelector