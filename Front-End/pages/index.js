import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Landing from "../components/Landing";
import Nav from "../components/Nav";
import PostsList from "../components/PostsList";
import { isSignedIn } from "../utils";

const IndexPage = () => {

  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    isSignedIn().then((result) => {
      setSignedIn(result);
    })
  }, []);
  return (
    <>
      <Nav />
      {(signedIn ? <PostsList /> : <Landing />)}
      <Footer />
    </>
  );
};

export default IndexPage;
