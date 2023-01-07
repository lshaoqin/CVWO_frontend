import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { constants } from 'buffer';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
    postsAfter: string;
    setPostsAfter: (val: string) => void;
    filterByTag: string;
    setFilterByTag: (val: string) => void;
    sortBy: string;
    setSortBy: (val: string) => void;
}
const FilterPosts: React.FC<Props> = 
    ({ postsAfter, setPostsAfter, filterByTag, setFilterByTag, sortBy, setSortBy}) => {
  const classes = useStyles();
  const [filter, setFilter] = React.useState('');

  const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPostsAfter(event.target.value as string)
  };

  return (
    <FormControl className={classes.formControl}>
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
    </FormControl>
  );
}