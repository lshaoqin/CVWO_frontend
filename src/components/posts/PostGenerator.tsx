import React from "react";
import getRequest from "../../services/request";
import PostInterface from "./PostInterface";
import Post from "../../types/Post";
import Tag from '../../types/Tag';
import { TagEntry } from "../tags/ProcessTags";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ProcessTags from "../tags/ProcessTags";

type Props = {
    post: Post;
    tags: Array<TagEntry>;
};

type ProcessedProps = {
  post: Post;
  tags: Array<Tag>;
}

const token = localStorage.getItem('token')

const PostGenerator: React.FC = () => {
  const { postId } = useParams()

  const [post, setPost] = useState<ProcessedProps | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRequest('posts/get_by_id', {id: postId, token: token})
      .then((value: object) => {
        const result = value as Props;
        const processedResults: ProcessedProps = {post: result.post, 
                                                  tags: ProcessTags(result.tags)}
        setPost(processedResults);
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