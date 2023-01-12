import Comment from '../../types/Comment';
import EditButton from '../functional/EditButton';
import React from 'react';
import { Button, Card, CardContent, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import { postRequest } from '../../services/request';
import DeleteConfirmation from '../functional/DeleteConfirmation';
import Box from '@mui/material/Box';

type Props = {
    commentData: Comment;
};

const useStyles = makeStyles({
    commentBody: {
        fontSize: 16,
        whiteSpace: 'pre-wrap',
        paddingBottom: '1em',
    },
    commentCard: {
        marginBottom: '1em',
        position: 'relative',
    },
    metadata: {
        fontSize: 14,
    },
});

const CommentItem: React.FC<Props> = ({ commentData }) => {
    const classes = useStyles();

    //Allows updating of comment data
    const [comment, setComment] = React.useState<Comment>(commentData);

    //Toggles between edit and viewing mode
    const [editMode, setEditMode] = React.useState<boolean>(false);

    const is_author = comment.author === localStorage.getItem('username')

    const token = localStorage.getItem('token')

    const created_at = new Date(comment.created_at)

    const EditComment: React.FC = () => {
        const [commentBody, setCommentBody] = React.useState<string>(comment.body);
        const [errorMsg, setErrorMsg] = React.useState<string>('');
        const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
 

        function SubmitHandler() {
            if (!commentBody.trim()) {
                setErrorMsg("Empty comments are not allowed.")
                return
              }
            setButtonDisabled(true);
            postRequest('comments/edit', {'token': token, 'body':commentBody, 'id':comment.id})
            .then((value: object) => {
                //Render updated comment
                const updatedComments = value as Comment
                setComment(updatedComments)
                setEditMode(false)
                setButtonDisabled(false)
            })
            .catch((error: any) => {
            setErrorMsg(error.message)
            setButtonDisabled(false)
            });
        }

        return (
            <Container>
            <TextField
            fullWidth
            autoFocus
            error={Boolean(errorMsg)}
            helperText={errorMsg}
            label="Enter your edited comment"
            variant="outlined"
            margin='normal'
            inputProps={{ maxLength: 3000 }}
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
            />
            <Button variant="contained" color="primary" onClick={SubmitHandler} disabled={buttonDisabled}>
                Submit
            </Button>
        </Container>
        )

    }

    //If state is 'default', show the comment
    //If state is 'hidden', hide the comment(the comment has been deleted)
    //If state is 'error', display an error message(the comment may have failed to be deleted)
    const [state, setState] = React.useState<string>('default');
    function deleteComment() {
        postRequest('comments/delete', {'token': token, 'comment_id':comment.id})
        .then(() => {
            setState('hidden')
        })
        .catch((error: any) => {
            setState('error')
        })
    }

    return (
        <Card className={classes.commentCard}>
            {state === 'default'
            ?   <CardContent>
                {editMode
                ? <EditComment />
                : <div>
                <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                    {comment.body}
                </Typography>
                <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                    {'Posted by ' + comment.author + ' on ' + created_at.toLocaleString()}
                </Typography>
                </div>
}
                {is_author && 
                <Box sx={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    display: 'flex',
                }}>
                <EditButton onClick={() => setEditMode(!editMode)}/>
                <DeleteConfirmation deleteFunc={deleteComment} />
                </Box>
                }
                </CardContent>
            :state === 'error'
            ?   <CardContent>
                <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                We may have encountered an error while deleting your comment. 
                </Typography>
                <Button onClick={deleteComment}>Try again</Button>
            </CardContent>
            : <CardContent>
                <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                Comment deleted successfully!
                </Typography>
            </CardContent>}
        </Card>
    );
    
};

export default CommentItem;
