import React from 'react';

type Post = {
    title: string;
    body: string;
    author: string;
    tags: Array<string>;
    timestamp: Date;
};

export default Post;
