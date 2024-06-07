import { useEffect } from "react";
import { useState } from "react";
import PostPreview from "./PostPreview";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage["token"]}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.baseIp + "/posts/all", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setPosts(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="posts-list">
      {posts.map((post) => {
        return (
          <PostPreview key={post.id} post={post} />
        )
      })}
    </div>
  );
};

export default PostsList;
