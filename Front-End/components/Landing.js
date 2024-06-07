import { Button, Link } from "@mui/material";

const Landing = () => {
  return (
    <div className="landing">
      <h1>Fixio: Fix Code Together</h1>
      <div className="landing-buttons-container">
        <Button variant={"contained"} className="register-button" href="/register">Register</Button>
        <Button variant={"outlined"} className="login-button" href="/login">Login</Button>
      </div>
    </div>
  );
};

export default Landing;
