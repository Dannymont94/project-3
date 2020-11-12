import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup() {
  const state = useSelector(state => state);

  if (state.searchSubmitted) {
    state.searchSubmitted = false;
  }

  const [formState, setFormState] = useState({ username: "", email: "", password: "" });

  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: formState.username,
        email: formState.email.toLowerCase(),
        password: formState.password
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="credentials-form-container">
      <p className="call-to-action">Signup today to track your favorite TV shows, find new ones, and decide what to watch next!</p>
      <div className="column-2">
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              type="username"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
