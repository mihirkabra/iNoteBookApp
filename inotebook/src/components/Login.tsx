import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/notes/alertContext";

const Login = () => {
  const alertCont = useContext(alertContext);
  const { alert, showAlert } = alertCont;
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5001/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
      await showAlert("Logged In Successfully", "success");
    } else {
      await showAlert("Invalid Credentials", "danger");
    }
  };
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.currentTarget.name]: e.currentTarget.value });
  };
  return (
    <div
      className="container card login"
      style={{
        backgroundImage: "linear-gradient(#00008099, #00008050)",
        color: "#ffffff",
      }}
    >
      <h4 className="mx-3 mt-4 text-center">LOGIN TO CONTINUE</h4>
      <hr />
      <form
        method="post"
        onSubmit={handleSubmit}
        className="container card-body mb-3"
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required
            onChange={onChange}
            value={credentials.email}
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paswword" className="form-label">
            Password
          </label>
          <input
            required
            minLength={5}
            onChange={onChange}
            value={credentials.password}
            type="password"
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
