import Tag from './Tag'

type Post = {
    id: number
    title: string;
    body: string;
    author: string;
    score: number;
    created_at: Date;
};

export default Post;
