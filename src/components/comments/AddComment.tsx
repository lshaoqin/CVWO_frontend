import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

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
    newComment: string;
    setNewComment: (val: string) => void;
    SubmitHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const EnterComment: React.FC<Props> = 
    ({ newComment, setNewComment, SubmitHandler }) => {
        const classes = useStyles()
        return (
        <Container>
            <div className={classes.paper}>
            <form className={classes.form} noValidate>
            <TextField
            fullWidth
            autoFocus
            label="Leave a comment"
            variant="outlined"
            margin='normal'
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
            />
            <Button variant="contained" color="primary" onClick={SubmitHandler}>
                Submit
            </Button>
            </form>
            </div>
        </Container>
        )
    }

export default EnterComment