import React from "react";
import getRequest from "../../services/request";
import PostInterface from "./PostInterface";
import Post from "../../types/Post";
import Tag from '../../types/Tag';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

type Props = {
    post: Post;
    tags: Array<Tag>;
};

const PostGenerator: React.FC = () => {
  const { postId } = useParams()

  const [post, setPost] = useState<Props | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRequest('posts/get_by_id', {id: postId})
      .then((value: object) => {
        const result = value as Props;
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
    return <PostInterface {...post} />;
  }

  return <h1>Loading...</h1>;
}

export default PostGenerator