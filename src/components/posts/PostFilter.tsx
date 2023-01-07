import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TagSearcher from '../tags/TagSearcher';
import { Typography } from '@material-ui/core';
import { Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
    postsAfter: string;
    setPostsAfter: (val: string) => void;
    filterByTag: string | null;
    setFilterByTag: (val: string | null) => void;
    sortBy: string;
    setSortBy: (val: string) => void;
}
const FilterPosts: React.FC<Props> = 
    ({ postsAfter, setPostsAfter, filterByTag, setFilterByTag, sortBy, setSortBy}) => {
  const classes = useStyles();

  const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPostsAfter(event.target.value as string)
  };

  const onChange = (newValue:string) => {
    setFilterByTag(newValue)
  }

  return (
    <FormControl className={classes.formControl}>
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
      <InputLabel id="time-label">Time</InputLabel>
      <Select
        labelId="time-label"
        id="time-select"
        value={postsAfter}
        onChange={handleTimeChange}
      >
        <MenuItem value="One hour">One hour</MenuItem>
        <MenuItem value="One day">One day</MenuItem>
        <MenuItem value="One week">One week</MenuItem>
        <MenuItem value="One month">One month</MenuItem>
        <MenuItem value="All time">All time</MenuItem>
      </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Typography>Filter by tag: </Typography>
      <TagSearcher onChange={onChange} />
      </Grid>
      </Grid>
    </FormControl>
  );
}

export default FilterPosts