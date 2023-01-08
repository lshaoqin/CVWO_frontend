import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TagSearcher from '../tags/TagSearcher';
import { Typography } from '@material-ui/core';
import { Grid } from '@mui/material';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

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

  const clearTagFilter = () => {
    setFilterByTag(null)
  }

  const handleSortBy = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string)
  };

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
      <Typography variant='subtitle2'>Filter by tag: </Typography>
      <TagSearcher onChange={onChange} />
      {filterByTag &&
      <div>
      <Typography variant='subtitle2'>(Currently filtering by tag '{filterByTag}')</Typography>
      <IconButton size="small" onClick={clearTagFilter}>
        <Close />
        </IconButton>
        </div>}

      </Grid>
      <Grid item xs={12} sm={6}>
      <InputLabel id="sort-label">Sort by</InputLabel>
      <Select
        labelId="sort-label"
        id="sort-select"
        value={sortBy}
        onChange={handleSortBy}
      >
        <MenuItem value="date">Date posted</MenuItem>
        {filterByTag &&
        <MenuItem value="votes">Tag votes</MenuItem>}
      </Select>
      </Grid>
      </Grid>
    </FormControl>
  );
}

export default FilterPosts