import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import cookingImage from '../assets/pexels-zain-abba-116752359-17450215 1.png';

const Login = () => {
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log('تم النقر على زر التسجيل');
    };

    return (
        <div className={styles['page-wrapper']}>
            <div className={styles['login-card']}>
                <div className={styles['image-section']}>
                    <div className={styles['image-overlay']}></div>
                    <img src={cookingImage} alt="Cooking" />
                </div>
                <div className={styles['form-section']}>
                    <div className={styles['form-content']}>
                        <h1 className={styles.h1}>LOG IN</h1>
                        <p className={styles['welcome-text']}>
                            Welcome back to your kitchen. Log in to access your saved recipes, favorite dishes, and personal cooking space.
                        </p>

                        <form onSubmit={handleSignUp}>
                            <div className={styles['input-group']}>
                                <label>USERNAME</label>
                                <input type="text" placeholder="Enter your username" />
                            </div>

                            <div className={styles['input-group']}>
                                <label>PASSWORD</label>
                                <input type="password" placeholder="Enter your password" />
                            </div>

                            <button type="submit" className={styles['signup-btn']}>
                                SIGN UP NOW!
                            </button>
                        </form>

                        <div className={styles.divider}></div>
                        <p className={styles['footer-text']}>
                            DON'T HAVE AN ACCOUNT? <a href="/login">CREATE ONE NOW</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;