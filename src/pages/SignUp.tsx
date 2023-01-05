//Adapted from material-ui template at https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates/sign-in
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { postRequest } from '../services/request';
import { Navigate, useNavigate } from "react-router-dom";

//Source: MUI Docs - creates a stylised alert snackbar
function Alert(props:any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        TagUp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();

  //State variables for form fields
  const [name, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  //State variables for error message
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('Something went wrong. Please try again!')



  interface Result {
    token: string;
    username: string;
  }

  //Code to display an error snackbar when an error is returned
  function ErrorDisplay (props:any){
    const handleClose = (event: any, reason: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setErrorOpen(false);
    };

    return (
    <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
      {errorMsg}
      </Alert>
    </Snackbar>
    )
  }

  const nav = useNavigate();
  const SignUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postRequest('users/create', {'name': name, 'password': password})
    .then((value: object) => {
      const result = value as Result
      //Log the user in
      localStorage.setItem('token', result.token)
      localStorage.setItem('username', result.username)
      nav("/");
    })
    .catch((error: any) => {
      setErrorMsg(error.message)
      setErrorOpen(true)
      console.error(error.message);
    });
  }
  if(localStorage.hasOwnProperty("token")) {
    return <Navigate to="/" />;
  } 

  else{
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={event => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={SignUpHandler}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already signed up? Log In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <ErrorDisplay />
      </Container>
    );
  }

}

export default SignUp