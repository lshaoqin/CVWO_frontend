import React from 'react';
import { Chip } from '@material-ui/core';
import { Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import TagSearcher from './TagSearcher';

//For the create post form - add multiple tags at once
const TagSelector: React.FC<{ tags:string[], setTags: (val: string[]) => void }> = 
    ({tags, setTags}) => {

    const handleRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
      };

    const onChange = (newValue: string) => {
        if (tags.length<20 && !tags.includes(newValue)) {
            setTags([...tags, newValue]);
        }
    }
    
    return (
        <Container component="main" maxWidth="lg">
            <Grid container spacing={2}>
            <Grid item xs={4}>
            <TagSearcher onChange={onChange} />
            </Grid>
            <Grid item xs={8}>
                  {tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        onClick={() => handleRemove(tag)}
                        clickable
                        color="secondary" 
                        variant="outlined"
                    />
                  ))}
            </Grid>
            </Grid>        
        </Container>
    );
}

export default TagSelector