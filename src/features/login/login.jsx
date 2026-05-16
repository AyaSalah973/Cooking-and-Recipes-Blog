// login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import cookingImage from '../../assets/pexels-zain-abba-116752359-17450215 1.png';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
        setError('Please enter both username and password');
        setIsLoading(false);
        return;
    }

    try {
        // 🔍 الخطوة 1: البحث في المستخدمين المسجلين محلياً (mockUsers)
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const mockUser = mockUsers.find(
            u => (u.username === username || u.email === username) && u.password === password
        );

        if (mockUser) {
            // ✅ تسجيل دخول ناجح من المستخدمين المحليين
            console.log('Login successful (local user):', mockUser);
            
            localStorage.setItem('user', JSON.stringify({
                id: mockUser.id,
                username: mockUser.username,
                email: mockUser.email,
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                image: 'https://dummyjson.com/icon/no-photo/128'
            }));
            localStorage.setItem('accessToken', 'mock-token-' + mockUser.id);
            localStorage.setItem('isLoggedIn', 'true');
            
            navigate('/tips');
            setIsLoading(false);
            return;
        }

        // 🔍 الخطوة 2: البحث في DummyJSON (للمستخدمين الافتراضيين)
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 30,
            }),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed. Please check your credentials.');
        }

        // ✅ تسجيل دخول ناجح من DummyJSON
        console.log('Login successful (DummyJSON user):', data);
        
        localStorage.setItem('user', JSON.stringify({
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            image: data.image
        }));
        
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        
        navigate('/tips');
        
    } catch (err) {
        setError(err.message || 'Invalid username or password');
        console.error('Login error:', err);
    } finally {
        setIsLoading(false);
    }
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

                        {error && <div className={styles['error-message']}>{error}</div>}

                        <form onSubmit={handleLogin}>
                            <div className={styles['input-group']}>
                                <label>USERNAME</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className={styles['input-group']}>
                                <label>PASSWORD</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className={styles['signup-btn']}
                                disabled={isLoading}
                            >
                                {isLoading ? 'LOGGING IN...' : 'LOG IN'}
                            </button>
                        </form>

                        <div className={styles.divider}></div>
                        <p className={styles['footer-text']}>
    DON'T HAVE AN ACCOUNT? 
    <a href="/register" onClick={(e) => {
        e.preventDefault();
        navigate('/register');
    }}>CREATE ONE NOW</a>
</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;