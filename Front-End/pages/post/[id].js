import { useRouter } from "next/router";
import { useEffect } from "react";
import CommentsList from "../../components/CommentsList";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Post from "../../components/Post";

export async function getServerSideProps({ params }) {
  const { id } = params;
  var myHeaders = new Headers();

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    process.env.baseIp + `/posts/post-${id}`,
    requestOptions
  );

  if (response.status != 200) return { props: {} };
  const result = await response.json();
  console.log(result);
  let post = result;
  return { props: { post } };
}

const PostPage = ({ post }) => {
  const router = useRouter();
  useEffect(() => {
    if (!post) router.push("/404");
  }, []);
  if (post)
    return (
      <>
        <Nav />
        <div className="post-page">
          <Post post={post} />
          <CommentsList post={post} />
        </div>
        <Footer />
      </>
    );
};

export default PostPage;
