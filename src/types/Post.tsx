import Tag from './Tag'

type Post = {
    title: string;
    body: string;
    author: string;
    tags: Array<Tag>;
    timestamp: Date;
};

export default Post;
