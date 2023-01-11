import Comment from '../../types/Comment';
import EditButton from '../functional/EditButton';
import React from 'react';
import { Button, Card, CardContent, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import { postRequest } from '../../services/request';

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
        const [errorMsg, setErrorMsg] = React.useState<string>('')



        function SubmitHandler() {
            if (!commentBody.trim()) {
                setErrorMsg("Empty comments are not allowed.")
                return
              }
              postRequest('comments/edit', {'token': token, 'body':commentBody, 'id':comment.id})
              .then((value: object) => {
                    console.log(value)
                  //Render updated comment
                  const updatedComments = value as Comment
                  setComment(updatedComments)
                  setEditMode(false)
              })
              .catch((error: any) => {
                setErrorMsg(error.message)
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
            <Button variant="contained" color="primary" onClick={SubmitHandler}>
                Submit
            </Button>
        </Container>
        )

    }

    return (
        <Card className={classes.commentCard}>
            <CardContent>
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
            <EditButton onClick={() => setEditMode(!editMode)}/>
                }
            </CardContent>
        </Card>
    );
    
};

export default CommentItem;
