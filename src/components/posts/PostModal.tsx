// A post modal is a popover that appears when the post card is clicked
import Post from '../../types/Post';
import React from 'react';
import { Typography, Modal, Chip, Card, CardContent } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tag from '../../types/Post';
import TagChip from './TagChip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    accordion: {

    }
  }));

const PostModal: React.FC<Props> = ({post}) => {
    const classes = useStyles();

    //Handlers for opening and closing the modal
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Generator for accordion of tags, which can be expanded if there are too many to be displayed in one line
    const TagsAccordion: React.FC = () => {
        const tagsList = post.tags.map((tag) => 
        {TagChip(tag)})

        return(
        <Accordion className = {classes.accordion} disabled={tagsList.length > 5}>
            {/* disable accordion expansion if there are less than 5 tags */}
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {tagsList.slice(0,5)}
            </AccordionSummary>
            <AccordionDetails>
                {tagsList}
            </AccordionDetails>
        </Accordion>
        );
        
    }

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
            <TagsAccordion></TagsAccordion>
            </div>
        </Modal>
        </div>
    );
}

export default PostModal;
