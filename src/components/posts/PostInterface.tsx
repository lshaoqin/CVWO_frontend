// A post modal is a popover that appears when the post card is clicked
import Post from '../../types/Post';
import React from 'react';
import { Typography, Modal, Chip, Card, CardContent } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tag from '../../types/Tag';
import TagChip from '../tags/TagChip'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Toolbar from '../functional/Toolbar'

type Props = {
    post: Post,
    tags: Array<Tag>,
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

const PostInterface: React.FC<Props> = (props) => {
    const classes = useStyles();

    //Generator for accordion of tags, which can be expanded if there are too many to be displayed in one line
    const TagsAccordion: React.FC = () => {

        return(
        <Accordion className = {classes.accordion} disabled={props.tags.length < 6}>
            {/* disable accordion expansion if there are less than 6 tags, since all will be displayed */}
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {props.tags.map((tag: Tag) => 
                    (
                        <TagChip tag={tag} />
                    ))}
            </AccordionSummary>
            <AccordionDetails>
                {props.tags.map((tag: Tag) => 
                    (
                        <TagChip tag={tag} />
                    ))}
            </AccordionDetails>
        </Accordion>
        );
        
    }

    return (
        <div>
            <div className={classes.paper}>
            <h2 id="post-title">{props.post.title}</h2>
            <p id="post-description">
                {props.post.body}
            </p>
            <TagsAccordion></TagsAccordion>
            </div>

        </div>
    );
}

export default PostInterface;
