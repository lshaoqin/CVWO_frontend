import Comment from '../../types/Comment';

import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

type Props = {
    comment: Comment;
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

const CommentItem: React.FC<Props> = ({ comment }) => {
    const classes = useStyles();

    const [editMode, setEditMode] = React.useState<boolean>(false);

    const EditComment: React.FC<Props> = ({ comment }) => {
        const [newComment, setNewComment] = React.useState<string>('');

    }

    return (
        <Card className={classes.commentCard}>
            <CardContent>
                <Typography variant="body2" color="textPrimary" className={classes.commentBody} component="p">
                    {comment.body}
                </Typography>
                <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                    {'Posted by ' + comment.author + ' on ' + comment.created_at.toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
    
};

export default CommentItem;
