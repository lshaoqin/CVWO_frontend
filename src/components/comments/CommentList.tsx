import CommentItem from './CommentItem';
import Comment from '../../types/Comment';
import getRequest from '../../services/request';
import { useState, useEffect } from 'react';

import React from 'react';

type Props = {
    post_id: number;
};

const CommentList: React.FC<Props> = ({ post_id }: Props) => {
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRequest('comments/fetch', {post_id: post_id})
          .then((value: object) => {
            const comments = value as Comment[];
            
            setComments(comments);
          })
          .catch((error: any) => {
            setError(error.message);
          });
      }, [post_id]);

    if (error) {
    return <h1>{error}</h1>;
    }

    if (comments) {
    return (
        <ul>
            {comments.map((comment, index) => (
                <CommentItem comment={comment} key={index} />
            ))}
        </ul>
    );
    }

    return <h1>Loading comments...</h1>;
};

export default CommentList;
