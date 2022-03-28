import React from "react";
import { login } from "../firebase.js";
import "./Login.css";

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
                <div>
                    <label htmlFor="id">ID</label>
                    <input type="email" id="id" name="id" required />
                </div>
                <div>
                    <label htmlFor="password">PASSWORD</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <input type="submit" value="로그인" />
            </form>
            <div className="signup">
                <span>회원이 아니신가요?</span>
                <input type="button" value="회원가입" />
            </div>
        </div>
    );
}

export default Login;
