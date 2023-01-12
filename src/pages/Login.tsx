//Adapted from material-ui template at https://github.com/mui/material-ui/tree/v4.x/docs/src/pages/getting-started/templates/sign-in
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ErrorDisplay from '../components/functional/ErrorSnackbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { postRequest } from '../services/request';
import { Navigate, useNavigate } from "react-router-dom";




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

const LogIn: React.FC = () => {
  const classes = useStyles();

  //State variables for form fields
  const [name, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  //State variables for error message
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('Something went wrong. Please try again!')

  //State variables for button load
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);

  const nav = useNavigate();

  interface Result {
    token: string;
    username: string;
  }

  //Code to display an error snackbar when an error is returned
 
  const LoginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setButtonDisable(true);
    postRequest('users/login', {'name': name, 'password': password})
    .then((value: object) => {
      
      const result = value as Result
      localStorage.setItem('token', result.token)
      localStorage.setItem('username', result.username)
      setButtonDisable(false)
      nav("/");
    })
    .catch((error: any) => {
      setErrorMsg(error.message)
      setErrorOpen(true)
      setButtonDisable(false)
    });
  }
  if(localStorage.hasOwnProperty("token")) {
    return <Navigate to="/" />;
  } 
  else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Log In
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
              inputProps={{ maxLength: 16 }}
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
              inputProps={{ maxLength: 25 }}
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={buttonDisable}
              className={classes.submit}
              onClick={LoginHandler}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <ErrorDisplay 
        errorOpen={errorOpen}
        setErrorOpen={setErrorOpen}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}/>
      </Container>
    );

  }
}

export default LogIn