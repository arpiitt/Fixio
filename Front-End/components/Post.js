import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import moment from "moment";
import { Link } from "@mui/material";
import { useEffect, useState } from "react";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const loadLikes = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage["token"]}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(process.env.baseIp + `/posts/post-${post.id}/get-likes`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setLiked(result.liked);
        setLikes(result.likes);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadLikes();
  }, []);

  const handleLikeToggle = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage["token"]}`);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };
    let url = process.env.baseIp + `/posts/post-${post.id}/like`;
    if (liked) {
      url = process.env.baseIp + `/posts/post-${post.id}/unlike`;
    }
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        loadLikes();
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="post">
      <h3 className="post-title dark-blue">{post.title}</h3>
      <p className="post-author">
        {post.authorFirstName} {post.authorLastName}{" "}
      </p>
      <p className="post-date">{moment(post.publishedDate).format("LLL")} </p>
      <p className="likes">
        <Link onClick={handleLikeToggle} className="like-button">
          <FavoriteBorderIcon style={{ display: liked ? "none" : "initial" }} />
          <FavoriteIcon style={{ display: liked ? "initial" : "none" }} />
        </Link>{" "}
        {likes}
      </p>
      <p className="commentsCount">
        <CommentIcon /> {!post.comments ? "0" : post.comments.length}
      </p>
      <ul className="post-tags">
        {post.tags?.map((tag) => {
          return <li key={tag}>{tag}</li>;
        })}
      </ul>
      <p
        className="post-content"
        dangerouslySetInnerHTML={{
          __html: post.content.replace(/\n/g, "<br/>"),
        }}
      ></p>
    </div>
  );
};

export default Post;
