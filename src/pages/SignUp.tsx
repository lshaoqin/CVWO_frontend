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

const SignUp: React.FC = () => {
  const classes = useStyles();

  //State variables for form fields
  const [name, setName] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  //State variables for error message
  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('Something went wrong. Please try again!')

  //State variables for button load
  const [buttonDisable, setButtonDisable] = React.useState<boolean>(false);

  interface Result {
    token: string;
    username: string;
  }

  const nav = useNavigate();
  const SignUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setButtonDisable(true);
    postRequest('users/create', {'name': name, 'password': password})
    .then((value: object) => {
      const result = value as Result
      //Log the user in
      localStorage.setItem('token', result.token)
      localStorage.setItem('username', result.username)
      setButtonDisable(false);
      nav("/");
    })
    .catch((error: any) => {
      setButtonDisable(false);
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
              inputProps={{ maxLength: 25 }}
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={buttonDisable}
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
        <ErrorDisplay 
        errorOpen={errorOpen}
        setErrorOpen={setErrorOpen}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}/>
      </Container>
    );
  }

}

export default SignUp