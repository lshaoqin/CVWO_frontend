import React from "react";
import getRequest from "../../services/request";
import PostModal from "./PostModal";
import Post from "../../types/Post";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";



const PostGenerator: React.FC = () => {
  const { postId } = useParams()

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRequest('posts/get_by_id', {id: postId})
      .then((value: object) => {
        const result = value as Post;
        setPost(result);
      })
      .catch((error: any) => {
        setError(error.message);
      });
  }, [postId]);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (post) {
    return <PostModal post={post} />;
  }

  return <h1>Loading...</h1>;
}

export default PostGenerator