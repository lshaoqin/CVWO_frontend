import Snackbar from '@material-ui/core/Snackbar';
import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'

//Source: MUI Docs - creates a stylised alert snackbar
function Alert(props:any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Props = {
  errorOpen: boolean;
  setErrorOpen: (val: boolean) => void;
  errorMsg: string;
  setErrorMsg: (val: string) => void;
}



const ErrorDisplay: React.FC<Props> = (
  {
    errorOpen, setErrorOpen, errorMsg, setErrorMsg
  }
) => {
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

  export default ErrorDisplay;