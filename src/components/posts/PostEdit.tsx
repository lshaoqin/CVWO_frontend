import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { postRequest } from '../../services/request';
import Post from '../../types/Post';
import { Box } from '@material-ui/core';

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
    setErrorOpen: (val:boolean) => void;
    setErrorMsg: (val:string) => void;
    setPost: (val:Post) => void;
    setEditMode: (val:boolean) => void;
}

const PostEdit: React.FC<Props> = ({post, setErrorOpen, setErrorMsg, setPost, setEditMode}) => {
  const classes = useStyles();

  //State variables for form fields
  const [title, setTitle] = React.useState<string>(post.title);
  const [body, setBody] = React.useState<string>(post.body);
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);
  
  const token = localStorage.getItem('token')

  const SubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!title.trim) {
      setErrorMsg("Title must not be empty!")
      setErrorOpen(true)
      return
    }
    setButtonDisable(true)
    postRequest('posts/edit', {'token': token, 'title': title, 'body':body, 'id':post.id})
    .then((value: object) => {
      setPost(value as Post)
      setButtonDisable(false)
      setEditMode(false)
    })
    .catch((error: any) => {
      setErrorMsg(error.message)
      setErrorOpen(true)
      setButtonDisable(false)
    });
  }

  
  return (
    <div>
    <Container component="main" maxWidth="lg">
    <div className={classes.paper}>
    <Typography variant='h5' color="inherit" component="div">Edit post</Typography>
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
      <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
      <Box m={1}>
      <Button variant="contained" color="default" onClick={() => setEditMode(false)} disabled={buttonDisable}>
        Cancel
      </Button>
      </Box>
      <Box m={1}>
      <Button variant="contained" color="primary" onClick={SubmitHandler} disabled={buttonDisable}>
        Edit Post
      </Button>
      </Box>
      </div>
    </form>
    </div>
    </Container>
    </div>
  );
}

export default PostEdit