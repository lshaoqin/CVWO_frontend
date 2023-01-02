import Snackbar from '@material-ui/core/Snackbar';

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