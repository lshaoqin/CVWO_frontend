{/* A post modal is a popover that appears when the post card is clicked */}
import Post from '../../types/Post';
import React from 'react';
import { Typography, Modal, Chip, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
    post: Post;
};

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const PostModal: React.FC<Props> = ({post}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Modal
            aria-labelledby="post-modal-title"
            aria-describedby="post-modal-description"
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.paper}>
            <h2 id="post-modal-title">{post.title}</h2>
            <p id="post-modal-description">
                {post.body}
            </p>
            </div>
        </Modal>
        </div>
    );
}

export default PostModal;
