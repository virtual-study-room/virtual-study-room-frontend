import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <div>
            Login Page
            <Link to="/register">Create Account</Link>
            <Link to="/main">Sign in</Link>
        </div>
    )
}