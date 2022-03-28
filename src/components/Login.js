import React from 'react';
import { login } from "../firebase.js";

function Login(props) {
    async function handleSubmit(e) {
        e.preventDefault();
        const id = e.target[0].value;
        const password = e.target[1].value;
        const user = await login(id, password);
        props.onSubmit(user);

      }
    
    return (
        <div className="Login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">ID</label>
          <input type="email" id="id" name="id" required />
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" name="password" required />
          <input type="submit" value="login" />
        </form>
      </div>
    )
}

export default Login;