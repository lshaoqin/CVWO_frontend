import React from 'react';
import { Chip } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Container } from '@material-ui/core';
import tagOptions from './tagOptions'
import TextField from '@material-ui/core/TextField';
import Grid from '@mui/material/Grid';

//For the create post form - add multiple tags at once
const TagSelector: React.FC<{ tags:string[], setTags: (val: string[]) => void }> = 
    ({tags, setTags}) => {
    const [value, setValue] = React.useState<string>('');

    const handleRemove = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
      };
    
    return (
        <Container component="main" maxWidth="lg">
            <Grid container spacing={2}>
            <Grid item xs={4}>
            <Autocomplete
                freeSolo
                options={tagOptions}
                renderInput={(params) => 
                    <TextField {...params} 
                    label="Enter tags here" 
                    variant="outlined" 
                   
                    />
                }
                onChange={(event: any, newValue: string | null) => {
                    if (newValue){
                        //Max number of tags is 20, and doesn't include duplicate tags.
                        if (tags.length<20 && !tags.includes(newValue)) {
                        setTags([...tags, newValue]);
                        setValue("");
                        }
                    }
                  }}
                //TODO: Properly clear text input on adding tag
                inputValue={value}
                onInputChange={(event: any, newInputValue: string) => {
                    setValue(newInputValue)
                }}
                
                
            />
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