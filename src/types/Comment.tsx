type Comment = {
    id: number;
    body: string;
    post_id: number;
    author: string;
    created_at: Date;
    updated_at: Date;
};

export default Comment;
