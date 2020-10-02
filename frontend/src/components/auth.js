import React, {useState, useEffect} from 'react';
import {API} from '../api-service';
import {useCookies} from 'react-cookie';

function Auth() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView, setIsLoginView] = useState(true);

    const [token, setToken] = useCookies(['mr-token']);

    useEffect(() => {
        if (token['mr-token']) window.location.href = '/todos';
    }, [token])
    
    const loginClicked = () => {
        API.loginUser({email, password})
            .then(resp => setToken('mr-token', resp.jwtToken))
            .catch(error => console.log(error))
    }

    const registerClicked = () => {
        API.registerUser({email, password})
            .then(() => loginClicked())
            .catch(error => console.log(error))
    }

    const isDisabled = email.length === 0 || password.length === 0;

    return (
        <div className="App">
            <header className="App-header">
                {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
            </header>
            <div className="login-container">
                <label htmlFor="email">Email</label><br />
                <input id="email" type="email" placeholder="Email" value={email}
                    onChange={evt => setEmail(evt.target.value)}
                /><br />
                <label htmlFor="password">Password</label><br />
                <input id="password" type="password" placeholder="Password" value={password}
                onChange={evt => setPassword(evt.target.value)} /><br />
                {isLoginView ?
                    <button onClick={loginClicked} disabled={isDisabled}>Login</button> :
                    <button onClick={registerClicked} disabled={isDisabled}>Register</button>
                }
                {isLoginView ?
                    <p onClick={() => setIsLoginView(false)}>You don't have an account, Register here!</p>
                    : <p onClick={() => setIsLoginView(true)}>You already have an account, Login here!</p>
                }
            </div>
        </div>
    )
}

export default Auth;