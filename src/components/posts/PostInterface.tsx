import Post from '../../types/Post';
import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tag from '../../types/Tag';
import TagChip from '../tags/TagChip'
import Toolbar from '../functional/Toolbar'
import EnterComment from '../comments/AddComment';
import ErrorDisplay from '../functional/ErrorSnackbar';
import { postRequest } from '../../services/request';
import CommentList from '../comments/CommentList';

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

    //State variables for comment box
    const [newComment, setNewComment] = React.useState<string>("");

    //State variables for error message
    const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
    const [errorMsg, setErrorMsg] = React.useState<string>('Something went wrong. Please try again!')

    const token = localStorage.getItem('token')

    const SubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!newComment.trim) {
          setErrorMsg("Empty comments are not allowed.")
          setErrorOpen(true)
          return
        }
        postRequest('comments/new', {'token': token, 'body':newComment, 'post_id':props.post.id})
        .then((value: object) => {
          
        })
        .catch((error: any) => {
          setErrorMsg(error.message)
          setErrorOpen(true)
          console.error(error.message);
        });
    }

    //Generator for accordion of tags, which can be expanded if there are too many to be displayed in one line
    const TagsDisplay: React.FC = () => {

        return(
            <Container>
                {props.tags.map((tag: Tag, index) => 
                    (
                        <TagChip tag={tag} key={index}/>
                    ))}
            </Container>
        );
        
    }

    return (
        <div>
            <Toolbar label="TagUp"/>
            <div className={classes.paper}>
            <h2 id="post-title">{props.post.title}</h2>
            <p id="post-description">
                {props.post.body}
            </p>
            <TagsDisplay></TagsDisplay>
            <EnterComment newComment={newComment}
                        setNewComment={setNewComment}
                        SubmitHandler={SubmitHandler}/>
            <CommentList post_id={props.post.id} />
            </div>
            <ErrorDisplay errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            errorOpen={errorOpen}
                            setErrorOpen={setErrorOpen} />
        </div>
    );
}

export default PostInterface;
