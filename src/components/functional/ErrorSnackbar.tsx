import Snackbar from '@material-ui/core/Snackbar';
import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'

//Source: MUI Docs - creates a stylised alert snackbar
function Alert(props:any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ErrorDisplay(props: { errorMsg: string }) {

    return (
      <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error">
          {props.errorMsg}
        </Alert>
      </Snackbar>
    );
  };

  export default ErrorDisplay;