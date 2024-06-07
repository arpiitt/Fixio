import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const RegisterPage = () => {
  const { push } = useRouter();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const handleInputChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(registerData);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(process.env.baseIp + "/auth/register", requestOptions)
      .then((response) => {
        if (response.status == 200) {
          return response.text();
        } else {
          setMsg("Email Already Exists");
        }
      })
      .then((result) => {
        const token = JSON.parse(result).token;
        localStorage["token"] = token;
        setMsg("");
        push("/");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Nav />
      <div className="register-page">
        <h2 className="dark-blue">Create An Account</h2>
        <Stack
          component={"form"}
          sx={{
            "& .MuiTextField-root": { m: 2 },
          }}
          className="register-form"
          onSubmit={handleSubmit}
        >
          <TextField
            type={"text"}
            label={"First Name"}
            variant={"outlined"}
            name={"firstName"}
            value={registerData.firstName}
            onChange={handleInputChange}
            required
          />
          <TextField
            type={"text"}
            label={"Last Name"}
            variant={"outlined"}
            name={"lastName"}
            value={registerData.lastName}
            onChange={handleInputChange}
            required
          />
          <TextField
            type={"email"}
            label={"Email"}
            variant={"outlined"}
            name={"email"}
            value={registerData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            type={"password"}
            label={"Password"}
            variant={"outlined"}
            name={"password"}
            value={registerData.password}
            onChange={handleInputChange}
            required
          />
          <Button variant={"contained"} type="submit">
            Sign Up
          </Button>
        </Stack>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        <p className="text-danger">{msg}</p>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
