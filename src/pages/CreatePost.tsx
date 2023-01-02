import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '../components/functional/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TagSelector from '../components/tags/TagSelector';
import { postRequest } from '../services/request';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        },
    form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    },
}));

const CreatePost: React.FC = () => {
  const classes = useStyles();

  const [tags, setTags] = React.useState<Array<string>>([]);

  const handleChildStateChange = (state: string[]) => {
    setTags(state);
  }
  /*
  const SubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postRequest('users/login', {'name': name, 'password': password})
    .then((value: object) => {
      const result = value as Result
      localStorage.setItem('token', result.token)
      console.log(result);
      nav("/");
    })
    .catch((error: any) => {
      setErrorMsg(error.message)
      setErrorOpen(true)
      console.error(error.message);
    });
  }
  */ 
  return (
    <div>
    <CssBaseline />
    <Toolbar label= "Create post" />
    <Container component="main" maxWidth="lg">
    <div className={classes.paper}>
    <form className={classes.form} noValidate>
      <TextField
        required
        fullWidth
        autoFocus
        id="outlined-required"
        label="Post Title"
        variant="outlined"
        margin='normal'
        name='title'
      />
      <TextField
        id="outlined"
        label="Post Body"
        variant="outlined"
        fullWidth
        multiline
        minRows={4}
        margin='normal'
        name='body'
      />
      <TagSelector onStateChange={handleChildStateChange}/>
      <Button variant="contained" color="primary">
        Create Post
      </Button>
    </form>
    </div>
    </Container>
    </div>
  );
}

export default CreatePost;