import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Comment from "./Comment";

const CommentsList = (props) => {
  const [post, setPost] = useState(props.post);
  const [comment, setComment] = useState("");

  const loadPostComments = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage["token"]}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.baseIp + "/comments/post-1", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setPost({...post, comments: result});
      })
      .catch((error) => console.log("error", error));
  };

  const handleAddComment = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ` + localStorage["token"]);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      comment: comment,
      postId: post.id,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(process.env.baseIp + "/comments/add-comment", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        loadPostComments();
        setComment("");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="comments-container">
      <h5>Comments:</h5>
      <div className="comments-list">
        {post.comments?.map((comment) => {
          return <Comment key={comment.id} comment={comment} post={post} />;
        })}
      </div>
      <Stack className="add-comment-container">
        <TextField
          value={comment}
          name={"comment"}
          type={"text"}
          label={"Comment"}
          placeholder={"Give your thoughts on the post"}
          variant={"outlined"}
          className="add-comment-input"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          variant={"contained"}
          className={"add-comment-button"}
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </Stack>
    </div>
  );
};

export default CommentsList;
