import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import { useToast } from "@chakra-ui/toast";

function SignupBody() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();
  const successToast = () => {
    toast({
      title: `Successfully registered, please login`,
      position: "top",
      isClosable: true,
    });
  };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = {
      username: userName,
      password: password,
      email: email,
    };

    // Use the environment variable for the API URL
    fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          successToast();
          setTimeout(() => {
            navigate("/");
          }, 600);
        }
      })
      .then(() => {
        setUserName("");
        setPassword("");
        setEmail("");
      });
  };

  return (
    <div className="container">
      <div className="homeContainer">
        <div className="homeContainer-logo">
          <BsTwitter />
        </div>
        <br />
        <div className="homeContainer-header">
          <h2>Join Twitter today</h2>
        </div>

        <a className="googleSignIn" href="#">
          <FcGoogle style={{ fontSize: "1.3rem" }} />
          <div> Sign up with Google</div>
        </a>
        <div className="homeContainer-hr">
          <hr />
          <span>or</span>
          <hr />
        </div>
        <form
          className="homeContainer-form"
          action={`${process.env.REACT_APP_API_URL}/signup`}
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            required
            className="homeContainer-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChangeEmail}
          />
          <br />
          <input
            required
            className="homeContainer-input"
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={handleChangeUserName}
          />
          <br />
          <input
            required
            className="homeContainer-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleChangePassword}
          />
          <br />
          <button className="homeContainer-btn" type="submit">
            Sign up
          </button>
        </form>
        <div className="homeContainer-signup">
          Already have an account? <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupBody;
