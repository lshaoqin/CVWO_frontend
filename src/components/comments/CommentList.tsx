import CommentItem from './CommentItem';
import Comment from '../../types/Comment';

import React from 'react';

type Props = {
    styled: boolean;
    comments: Comment[];
};

const BasicCommentList: React.FC<Props> = ({ styled, comments }: Props) => {

    return (
        <ul>
            {comments.map((comment, index) => (
                <CommentItem comment={comment} styled={styled} key={index} />
            ))}
        </ul>
    );
};

export default BasicCommentList;
