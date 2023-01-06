import Post from '../../types/Post';
import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tag from '../../types/Tag';
import TagChip from '../tags/TagChip'
import Toolbar from '../functional/Toolbar'
import EnterComment from '../comments/AddComment';
import ErrorDisplay from '../functional/ErrorSnackbar';
import { postRequest } from '../../services/request';
import CommentList from '../comments/CommentList';
import Comment from '../../types/Comment';
import TagAdder from '../tags/TagAdder';

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

    //State variables for displaying comments
    const [comments, setComments] = React.useState<Comment[] | null>(null);

    //State variables for selecting new tags
    const [tags, setTags] = React.useState<Tag[]>(props.tags);

    const token = localStorage.getItem('token')
    const is_author = localStorage.getItem('username') === props.post.author

    const SubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setNewComment('');
        if (!newComment.trim()) {
          setErrorMsg("Empty comments are not allowed.")
          setErrorOpen(true)
          return
        }
        postRequest('comments/new', {'token': token, 'body':newComment, 'post_id':props.post.id})
        .then((value: object) => {
            //Render updated comments, which will be directly returned from backend
            const updatedComments = value as Comment[]
            setComments(updatedComments)
        })
        .catch((error: any) => {
          setErrorMsg(error.message)
          setErrorOpen(true)
        });
    }

    const TagsDisplay: React.FC = () => {

        return(
            <Container>
                {tags.map((tag: Tag, index) => 
                    (
                        <TagChip tag={tag} 
                                post_id = {props.post.id} 
                                is_author = {is_author} 
                                setErrorMsg = {setErrorMsg}
                                key={index}
                                setErrorOpen = {setErrorOpen}/>
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
            <Typography color="textSecondary" className="post-metadata" gutterBottom>
                    {'Posted by ' + props.post.author + ' on ' + props.post.created_at.toLocaleString()}
            </Typography>
            <Typography variant="h6" color="inherit" component="div">Tags</Typography>
            <TagsDisplay></TagsDisplay>
            <Typography variant="h6" color="inherit" component="div">Add new tags</Typography>
            {token && <TagAdder tags={tags} setTags={setTags} is_author={is_author} 
            post_id={props.post.id} setErrorMsg={setErrorMsg} setErrorOpen={setErrorOpen} />}
            <hr></hr>
            <EnterComment newComment={newComment}
                        setNewComment={setNewComment}
                        SubmitHandler={SubmitHandler}/>
            <CommentList post_id={props.post.id} comments={comments} setComments={setComments} />
            </div>
            <ErrorDisplay errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            errorOpen={errorOpen}
                            setErrorOpen={setErrorOpen} />
        </div>
    );
}

export default PostInterface;
