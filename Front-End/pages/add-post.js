import { Box, Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { isSignedIn } from "../utils";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const AddPostPage = () => {
  const { push } = useRouter();
  const [post, setPost] = useState({
    title: "",
    content: "",
    tags: [],
  });

  const [tagsString, setTagsString] = useState("");

  useEffect(() => {
    isSignedIn().then((result) => {
      if (!result) push("/login");
    });
  }, []);

  const handleInputChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeTags = (e) => {
    setTagsString(e.target.value);
    setPost({ ...post, tags: e.target.value.split(",") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage["token"]}`);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(post);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(process.env.baseIp + "/posts/add-post", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        push("/");
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <Nav />
      <div className="add-post-page">
        <h2 className="dark-blue">Write a new Post</h2>
        <Stack
          component={"form"}
          autoComplete={"off"}
          className="add-post-form"
          sx={{ "& .MuiTextField-root": { m: 3 } }}
          onSubmit={handleSubmit}
        >
          <TextField
            type={"text"}
            label={"Post Title"}
            variant={"standard"}
            name={"title"}
            placeholder={"Enter the title of the post"}
            value={post.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            type={"text"}
            label={"Post Content"}
            variant={"outlined"}
            name={"content"}
            multiline
            placeholder={"Enter the content of the post"}
            rows={15}
            value={post.content}
            onChange={handleInputChange}
            required
          />
          <TextField
            type={"text"}
            label={"Tags (Optional)"}
            variant={"outlined"}
            name={"tag"}
            placeholder={'Enter tags separated with commas ","'}
            value={tagsString}
            onChange={handleChangeTags}
          />
          <Button variant={"contained"} type={"submit"} size={"large"}>
            Publish Post
          </Button>
        </Stack>
      </div>
      <Footer />
    </>
  );
};

export default AddPostPage;
