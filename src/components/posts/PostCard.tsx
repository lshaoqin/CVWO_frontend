// Template for each post in Thread view.

import Post from '../../types/Post';
import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';

type Props = {
    post: Post;
};

const useStyles = makeStyles({
    titleBody: {
        fontSize: 20,
        whiteSpace: 'pre-wrap',
        paddingBottom: '1em',
    },
    postCard: {
        marginBottom: '1em',
    },
    metadata: {
        fontSize: 12,
    },
});

const PostDisplayItem: React.FC<Props> = ({ post }) => {
    const classes = useStyles();

    return (
        <Card className={classes.titleBody} variant="outlined">
            <CardContent>
                <Typography variant="body2" color="textPrimary" className={classes.titleBody} component="p">
                    {post.title}
                </Typography>
                <Typography color="textSecondary" className={classes.metadata} gutterBottom>
                    {'Posted by ' + post.author + ' on ' + post.created_at.toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
  


};

export default PostDisplayItem;
