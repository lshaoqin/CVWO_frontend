import React from 'react';
import { useNavigate } from "react-router-dom";
import { getRequest } from "../services/request";
import PostCard from "../components/posts/PostCard";
import Post from '../types/Post';
import { useEffect, useState } from 'react';
import Toolbar from "../components/functional/Toolbar";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [posts, setPosts] = useState([] as Array<Post>);
  const [error, setError] = useState(null as Error | null);

  const navigate = useNavigate();

  useEffect(() => {
      if (!localStorage.hasOwnProperty('token')) {
          navigate('/login');
      }

      getRequest('posts/index', {})
      .then((value: object) => {
          console.log(value)
          setPosts(value as Array<Post>);
      })
      .catch((error: any) => {
          setError(error);
      });
  }, [navigate]);

  if (error) {
    return <h3>{error.message}</h3>;
  }

  return (
      <>
          <Toolbar label = "TagUp" />
          <br />
          <div>
              {posts.map((post: Post) => (
                <a href={"/posts/" + post.id} style={{ textDecoration: 'none' }}>
                  <PostCard post={post} />
                </a>
              ))}
          </div>
          <Link to="/newpost">
          <Fab color="primary" 
          aria-label="add" 
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2)
          }}>
            <AddIcon />
        </Fab>
        </Link>
      </>
  );
};
export default Home;
