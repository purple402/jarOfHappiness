import React, {useState} from "react";
import { login } from "../firebase.js";
import Alert from './Alert'
import "./Login.css";

function Login(props) {
    const [error, setError] = useState(null)
    async function handleSubmit(e) {
        e.preventDefault();
        const id = e.target[0].value;
        const password = e.target[1].value;
        const user = await login(id, password);
        if (typeof user !== "string") {
            props.onSubmit(user);
        } else {
            setError(user);
        }
    }

    function handleSignupBtn() {
        props.onSignup();
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">이메일주소</label>
                    <input type="email" id="id" name="id" required />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
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
                <input type="button" value="회원가입" onClick={handleSignupBtn}/>
            </div>
            {error && <Alert code={error} finishAlert={(error) => setError(error)}/>}
            
        </div>
    );
}

export default Login;
