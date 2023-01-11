import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import tagOptions from './tagOptions'
import TextField from '@material-ui/core/TextField';

type Props = {
    onChange: (val: string) => void;
}

const TagSearcher: React.FC<Props> =
    ({onChange}) => {
        const [value, setValue] = React.useState<string>('');

        return(
        <Autocomplete
                freeSolo
                options={tagOptions}
                renderInput={(params) => 
                    <TextField {...params} 
                    label="Enter tags here" 
                    variant="outlined" 
                    inputProps={{ maxLength: 16 }}
                    value={value}
                    />
                }
                onChange={(event: any, newValue: string | null) => {
                    if (newValue){
                        onChange(newValue)
                        setValue("")
                    }
                  }}
                //TODO: Properly clear text input on adding tag

                inputValue={value}
                onInputChange={(event: any, newInputValue: string, reason: string) => {
                    //Prevent overwriting the setValue call in onChange
                    if (reason === "input") {
                        setValue(newInputValue)
                    }
                }}  
            />)
    }
export default TagSearcher