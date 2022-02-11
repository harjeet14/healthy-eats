import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import UserService from '../../services/userService';
import './loginPage.scss'



export function LoginPage() {
    var navigate = useNavigate();
    var [loginEmail, setLoginEmail] = useState('');
    var [loginPass, setLoginPass] = useState('');
    return <div className="login-page">
        <div className='login-page-login'>
            <div className="login-page-row">
                <input onChange={(e) => setLoginEmail(e.target.value)} value={loginEmail} className="login-page-row-input" placeholder="Email" type="text" />
            </div>

            <div className="login-page-row">
                <input onChange={(e) => setLoginPass(e.target.value)} value={loginPass} className="login-page-row-input" placeholder="Password" type="password" />
            </div>

            <button className="login-page-button" onClick={async () => {
                if (loginEmail && loginPass) {
                    const user = await UserService.authenticateUser(loginEmail, loginPass);

                    if (user) {
                        sessionStorage.sessionUser = user.firstName + ' ' + user.lastName;
                        setLoginPass('');
                        setLoginEmail('');
                        navigate("/");
                        return;
                    }
                }

                setLoginPass('');
                setLoginEmail('');
                alert('invalid credential')


            }}>
                Login
            </button>

        </div>
        <div className='login-page-signin'>
            <div className="login-page-row">
                <input className="login-page-row-input" placeholder="First Name" type="text" />
            </div>

            <div className="login-page-row">
                <input className="login-page-row-input" placeholder="Last Name" type="text" />
            </div>

            <div className="login-page-row">
                <input className="login-page-row-input" placeholder="Email" type="text" />
            </div>

            <div className="login-page-row">
                <input className="login-page-row-input" placeholder="Password" type="password" />
            </div>

            <button className="login-page-button">
                Sign in
            </button>
        </div>
    </div>
}