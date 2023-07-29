import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/notes/alertContext";

const Signup = () => {
  const alertCont = useContext(alertContext);
  const { alert, showAlert } = alertCont;
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (user.password !== user.cpassword) {
      await showAlert("Password do not match", "danger");
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      const response = await fetch(
        `http://localhost:5001/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        navigate("/");
        await showAlert("Account Created Successfully", "success");
      } else {
        await showAlert("Invalid Details! Please Try Again", "danger");
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.currentTarget.name]: e.currentTarget.value });
  };
  return (
    <div
      className="container card signup"
      style={{
        backgroundImage: "linear-gradient(#00008099, #00008050)",
        color: "#ffffff",
      }}
    >
      <h4 className="mx-3 mt-4 text-center">SIGN UP AT iNotebook</h4>
      <hr />
      <form
        method="post"
        onSubmit={handleSubmit}
        className="container card-body mb-3"
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            required
            minLength={3}
            onChange={onChange}
            value={user.name}
            type="text"
            className="form-control"
            id="name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required
            onChange={onChange}
            value={user.email}
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            minLength={5}
            onChange={onChange}
            value={user.password}
            type="password"
            className="form-control"
            name="password"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            required
            minLength={5}
            onChange={onChange}
            value={user.cpassword}
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
