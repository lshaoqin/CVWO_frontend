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
import EditButton from '../functional/EditButton';
import PostEdit from './PostEdit';
import { Box } from '@material-ui/core';

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

    //State variables for updating post on edit
    const [post, setPost] = React.useState<Post>(props.post);

    //State variables for switching to PostEdit view
    const [editMode, setEditMode] = React.useState<boolean>(false);

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

    const created_at = new Date(props.post.created_at)

    return (
        <div>
            <Toolbar/>
            <div className={classes.paper}>
            {editMode
            ?<PostEdit post={post}
                        setErrorOpen={setErrorOpen}
                        setErrorMsg={setErrorMsg}
                        setPost={setPost}
                        setEditMode={setEditMode} />
            :<div>
            <div style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
            <h2 id="post-title">{post.title}</h2> 
            {is_author && 
            <EditButton onClick={() => setEditMode(true)}/>
            }
            </div>
            <p id="post-description">
                {post.body}
            </p>
            <Typography color="textSecondary" className="post-metadata" gutterBottom>
                    {'Posted by ' + post.author + ' on ' + created_at.toLocaleString()}
            </Typography>
            </div>}
            <Typography variant="h6" color="inherit" component="div">Tags</Typography>
            <TagsDisplay></TagsDisplay>
            {token && 
            <div>
            <Typography variant="h6" color="inherit" component="div">Add new tags</Typography>
            <Box sx={{width: 300, height: 'auto', margin:'auto'}}>
            <TagAdder tags={tags} setTags={setTags} is_author={is_author} 
            post_id={post.id} setErrorMsg={setErrorMsg} setErrorOpen={setErrorOpen} />
            </Box>
            </div>}
            <hr></hr>
            {token && <EnterComment newComment={newComment}
                        setNewComment={setNewComment}
                        SubmitHandler={SubmitHandler}/>}
            <CommentList post_id={post.id} comments={comments} setComments={setComments} />
            </div>
            <ErrorDisplay errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            errorOpen={errorOpen}
                            setErrorOpen={setErrorOpen} />
        </div>
    );
}

export default PostInterface;
