import React from 'react';
import { useNavigate } from "react-router-dom";
import { getRequest } from "../services/request";
import PostCard from "../components/posts/PostCard";
import Post from '../types/Post';
import { useEffect, useState } from 'react';
import Toolbar from "../components/Toolbar"

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
  }, []);

  if (error) {
    return <h3>{error.message}</h3>;
  }

  return (
      <>
          <Toolbar label = "TagUp" />
          <br />
          <div>
              {posts.map((post: Post) => (
                  <PostCard post={post} />
              ))}
          </div>
      </>
  );
};
export default Home;
