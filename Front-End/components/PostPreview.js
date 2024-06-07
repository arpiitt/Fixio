import Link from "next/link";
import { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import moment from "moment";

const PostPreview = (props) => {

  const [post, setPost] = useState(props.post);

  useEffect(() => {
    if (post.content.length > 300) {
      let trimmedContent = post.content.substring(0, 300) + " .....";
      setPost({...post, content: trimmedContent});
    }
  }, []);

  return (
    <Link href={`/post/${post.id}`} className="post-preview-link">
      <div className="post-preview">
        <h3 className="post-preview-title dark-blue">{post.title}</h3>
        <p className="post-preview-author">
          {post.authorFirstName} {post.authorLastName}{" "}
        </p>
        <p className="post-preview-date">
          {moment(post.publishedDate).format("LLL")}{" "}
        </p>
        <p className="post-preview-content">{post.content}</p>
        <ul className="post-preview-tags">
          {post.tags?.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
        <p className="likes"><FavoriteBorderIcon /> {post.likes}</p>
        <p className="commentsCount"><CommentIcon /> {post.comments.length} </p>
      </div>
    </Link>
  );
};

export default PostPreview;
