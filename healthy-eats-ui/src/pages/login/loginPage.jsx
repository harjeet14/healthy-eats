import { useNavigate } from 'react-router-dom'
import './loginPage.scss'



export function LoginPage() {
    var navigate = useNavigate();
    return <div className="login-page">
        <div className='login-page-login'>
            <div className="login-page-row">
                <input className="login-page-row-input" placeholder="Email" type="text" />
            </div>

            <div className="login-page-row">
                <input className="login-page-row-input" placeholder="Password" type="password" />
            </div>

            <button className="login-page-button" onClick={() => {
                sessionStorage.logedIn = true;
                navigate("/");

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