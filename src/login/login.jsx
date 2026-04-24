
import './login.css';
//import logoIcon from '../../assets/Logo.svg';//

const Login = () => {
    return (
    <div className="page-wrapper">
    {/* <header className="brand-header">
        <img src={logoIcon} alt="Logo" className="logo-img" />
        <div className="brand-text">
            <strong>Cooks</strong><br/>
            <strong>Delight</strong>
        </div>
        </header>*/}
        <div className="login-card">
        <div className="image-section">
            <div className="image-overlay"></div>
            <img src="src/assets/pexels-zain-abba-116752359-17450215 1.png" alt="Cooking" />
        </div>
        <div className="form-section">
            <div className="form-content">
            <h1>LOG IN</h1>
            <p className="welcome-text">
                Welcome back to your kitchen. Log in to access your saved recipes, favorite dishes, and personal cooking space.
            </p>

            <form>
                <div className="input-group">
                <label>USERNAME</label>
                <input type="text" placeholder="Enter your username" />
                </div>

                <div className="input-group">
                <label>PASSWORD</label>
                <input type="password" placeholder="Enter your password" />
                </div>

                <button type="submit" className="signup-btn">SIGN UP NOW!</button>
            </form>

            <div className="divider"></div>
            <p className="footer-text">
                DON'T HAVE AN ACCOUNT? <a href="#">CREATE ONE NOW</a>
            </p>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Login;