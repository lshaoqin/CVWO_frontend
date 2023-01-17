import React from 'react';
import { getRequest } from "../services/request";
import PostCard from "../components/posts/PostCard";
import Post from '../types/Post';
import { useEffect, useState } from 'react';
import Toolbar from "../components/functional/Toolbar";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import FilterPosts from '../components/posts/PostFilter';
import { Box } from '@material-ui/core';

const Home: React.FC = () => {
  const [posts, setPosts] = useState([] as Array<Post>);
  const [error, setError] = useState(null as Error | null);
  //Display loading message while loadings posts
  const [loading, setLoading] = useState<boolean>(false);
  
  //States for filtering
  const [postsAfter, setPostsAfter] = useState<string>("One week")
  const [filterByTag, setFilterByTag] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>("date")

  function rewind_date(label: string) {
    //Get current time
    const date = new Date();
    //Find the Date which is x time period before the current time
    switch (label){
        case "One hour":
            date.setHours(date.getHours() - 1)
            return date
        case "One day":
            date.setDate(date.getDate() - 1)
            return date
        case "One week":
            date.setDate(date.getDate() - 7)
            return date
        case "One month":
            date.setDate(date.getDate() - 31)
            return date
        case "One year":
            date.setFullYear(date.getFullYear() - 1)
            return date
        case "All time":
            return new Date(0)
    }
  }

  useEffect(() => {
      setLoading(true)
      getRequest('posts/index', {posts_after:rewind_date(postsAfter),
                                filter_by_tag:filterByTag,
                                sort_by:sortBy})
      .then((value: object) => {
          setLoading(false)
          setPosts(value as Array<Post>);
      })
      .catch((error: any) => {
        setLoading(false)
          setError(error);
      });
  }, [postsAfter, filterByTag, sortBy]);

  if (error) {
    return <h3>{error.message}</h3>;
  }

  return (
      <>
          <Toolbar />
          <Box>
          <FilterPosts postsAfter={postsAfter}
                  setPostsAfter={setPostsAfter}
                  filterByTag={filterByTag}
                  setFilterByTag={setFilterByTag}
                  sortBy={sortBy}
                  setSortBy={setSortBy} />
          <br />
          {loading
          ?<div> Loading posts...</div>
          :posts.length === 0 
          ?<div> No posts were found based on your criteria. </div>
          :<div>
              {posts.map((post: Post) => (
                <a href={"/posts/" + post.id} style={{ textDecoration: 'none' }}>
                  <PostCard post={post} />
                </a>
              ))}
          </div>}
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
        </Box>
      </>
  );
};
export default Home;
