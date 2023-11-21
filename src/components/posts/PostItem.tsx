import React from 'react'
import { Link } from 'react-router-dom';

export interface IUser {
    _id: string;
    name: string;
}

export interface IPost {
    _id: string;
    title: string;
    content: string;
    user: IUser;
}

export interface PostItemProps {
    post: IPost;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
      <div>
          <p>{post.title} <span>by {post.user.name}</span></p>
          <Link to={`/posts/${post._id}`} >See Post</Link>
    </div>
  )
}

export default React.memo(PostItem)