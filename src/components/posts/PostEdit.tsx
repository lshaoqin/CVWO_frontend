import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Toolbar from '../functional/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { postRequest } from '../../services/request';
import { useNavigate } from 'react-router-dom';
import ErrorDisplay from '../functional/ErrorSnackbar';
import Post from '../../types/Post';

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

type Props = {
    post: Post;
}

const PostEdit: React.FC<Props> = ({post}) => {
  const classes = useStyles();

  //State variables for form fields
  const [title, setTitle] = React.useState<string>("");
  const [body, setBody] = React.useState<string>("");

  //State variables for error message
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('Something went wrong. Please try again!')

  const nav = useNavigate()
  //Redirect user if not logged in
  useEffect(() => {
    if (!localStorage.hasOwnProperty('token')) {
        nav('/login');
    }
  })
  
  const token = localStorage.getItem('token')
  
  interface Result {
    id: string;
  }

  const SubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!title.trim) {
      setErrorMsg("Title must not be empty!")
      setErrorOpen(true)
      return
    }
    postRequest('posts/edit', {'token': token, 'title': title, 'body':body})
    .then((value: object) => {
      const result = value as Result
      nav(`/posts/${result.id}`);
    })
    .catch((error: any) => {
      setErrorMsg(error.message)
      setErrorOpen(true)
      console.error(error.message);
    });
  }
  
  return (
    <div>
    <CssBaseline />
    <Toolbar />
    <Container component="main" maxWidth="lg">
    <div className={classes.paper}>
    <Typography variant='h2' color="inherit" component="div">Create post</Typography>
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
        value={title}
        onChange={(event) => setTitle(event.target.value)}
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
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={SubmitHandler}>
        Edit Post
      </Button>
    </form>
    </div>
    </Container>
    <ErrorDisplay 
        errorOpen={errorOpen}
        setErrorOpen={setErrorOpen}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}/>
    </div>
  );
}

export default PostEdit