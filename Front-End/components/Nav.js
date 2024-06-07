import { Button, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
import { isSignedIn } from "../utils";

const Nav = () => {
  const { push } = useRouter();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    isSignedIn().then((result) => {
      if (!result) {
        setSignedIn(false);
      } else setSignedIn(true);
    });
  }, []);

  const handleLogout = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage["token"]}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(process.env.baseIp + "/auth/logout", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        localStorage.removeItem("token");
        window.location = "/";
      })
      .catch((error) => console.log("error", error));
  };

  const handleWritePost = () => {
    push("/add-post");
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <a href={"/"}>
          <h3 className="nav-title">Fixio</h3>
        </a>
        <div>
          <Button
            onClick={handleWritePost}
            style={{ display: signedIn ? "inline-block" : "none" }}
          >
            <CreateIcon /> Write A Post
          </Button>
        </div>
      </div>
      <div className="nav-right">
        <Button
          onClick={handleLogout}
          style={{ display: signedIn ? "inline-block" : "none" }}
        >
          Logout
        </Button>
        <Button style={{ display: signedIn ? "none" : "inline-block" }}>
          <Link href={"/register"}>Register</Link>
        </Button>
        <Button style={{ display: signedIn ? "none" : "inline-block" }}>
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Nav;
