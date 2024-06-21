import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { login, register } from "../services/api";

const UserLogin = () => {
  const [Login, SetIsLogin] = useState(true);
  const [error, seterror] = useState("");

  const onLoginHandler = () => {
    SetIsLogin(!Login);
  };

  const GetUserLoginSignupInfo = async (e) => {
    e.preventDefault();
    let Userinfo;
    if (!Login) {
      Userinfo = {
        email: e.target.email.value,
        password: e.target.password.value,
        username: e.target.username.value,
      };
    } else {
      Userinfo = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
    }

    console.log(Userinfo);
    if (Login) {
      const user = await login(Userinfo);
      if (user.message === "Invalid email or password") {
        seterror("Invalid email or password");
      } else {
        localStorage.setItem("token", user.token);
        window.location.reload();
      }

      e.target.email.value = "";
      e.target.password.value = "";
    } else {
      const user = await register(Userinfo);
      if (user.message === "User already exists") {
        seterror("User already exists");
      } else if (user.message === "Invalid user data") {
        seterror("Invalid user data");
      } else {
        localStorage.setItem("token", user.token);
        window.location.reload();
      }
      e.target.username.value = "";
      e.target.email.value = "";
      e.target.password.value = "";
    }
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle bg-warning rounded">
      <Form className="d-flex flex-column align-items-center text-center m-5" onSubmit={GetUserLoginSignupInfo}>
        <h1>{Login ? "LOGIN" : "SIGNUP"}</h1>
        {!Login && (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter email" required name="username" />
          </Form.Group>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required name="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required name="password" />
        </Form.Group>
        <Button variant="success" type="submit">
          {Login ? "LOGIN" : "SIGNUP"}
        </Button>
        {Login && (
          <Button variant="primary mt-2" type="submit" onClick={onLoginHandler}>
            CREATE ACCOUNT
          </Button>
        )}

        {!Login && (
          <Button variant="primary mt-2" type="submit" onClick={onLoginHandler}>
            BACK TO LOGIN
          </Button>
        )}
      </Form>
      <div className="text-danger text-center fw-bold">{error}</div>
    </div>
  );
};

export default UserLogin;
