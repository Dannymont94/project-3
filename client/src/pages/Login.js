import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../utils/mutations";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <Link to="/signup">Go to Signup</Link>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-forw space-betweeen">
          <label htmlFor="email">Email Addres</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text"> What you have provided is incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
