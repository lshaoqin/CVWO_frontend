import Tag from './Tag'

type Post = {
    id: number
    title: string;
    body: string;
    author: string;
    tags: Array<Tag>;
    created_at: Date;
};

export default Post;
