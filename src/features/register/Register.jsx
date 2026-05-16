// Register.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';
import cookingImage from '../../assets/pexels-zain-abba-116752359-17450215 1.png';

const Register = () => {
    const navigate = useNavigate();
    const [darkModeKey, setDarkModeKey] = useState(0); // ✅ أضيفي هذا الـ state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // ✅ استمع لتغييرات Dark Mode
    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.body.classList.contains('dark');
            console.log('Dark mode:', isDark);
            setDarkModeKey(prev => prev + 1); // إعادة التصيير
        };

        checkDarkMode();
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });
        
        observer.observe(document.body, { attributes: true });
        
        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
        if (successMsg) setSuccessMsg('');
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.username || 
            !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!usernameRegex.test(formData.username)) {
            setError('Username must be 3-20 characters (letters, numbers, underscore)');
            return false;
        }

        return true;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
            
            const userExists = existingUsers.some(u => 
                u.username === formData.username || u.email === formData.email
            );
            
            if (userExists) {
                setError('Username or email already exists. Please try another one.');
                setIsLoading(false);
                return;
            }
            
            const newUser = {
                id: Date.now(),
                username: formData.username,
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
                registeredAt: new Date().toISOString()
            };
            
            existingUsers.push(newUser);
            localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
            
            setSuccessMsg(`✅ Account created successfully! Please log in with "${formData.username}"`);
            
            setFormData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (err) {
            setError('An error occurred during registration');
            console.error('Register error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles['page-wrapper']} key={darkModeKey}> {/* ✅ أضيفي الـ key هنا */}
            <div className={styles['register-card']}>
                <div className={styles['image-section']}>
                    <div className={styles['image-overlay']}></div>
                    <img src={cookingImage} alt="Cooking" />
                </div>
                <div className={styles['form-section']}>
                    <div className={styles['form-content']}>
                        <h1 className={styles.h1}>SIGN UP</h1>
                        <p className={styles['welcome-text']}>
                            Join our cooking community! Create an account to save your favorite recipes and share your culinary adventures.
                        </p>

                        {successMsg && <div className={styles['success-message']}>{successMsg}</div>}
                        {error && !successMsg && <div className={styles['error-message']}>{error}</div>}

                        <form onSubmit={handleRegister}>
                            <div className={styles['row-group']}>
                                <div className={styles['input-group-half']}>
                                    <label>FIRST NAME</label>
                                    <input 
                                        type="text" 
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className={styles['input-group-half']}>
                                    <label>LAST NAME</label>
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className={styles['input-group']}>
                                <label>USERNAME</label>
                                <input 
                                    type="text" 
                                    name="username"
                                    placeholder="Choose a username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className={styles['input-group']}>
                                <label>EMAIL</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className={styles['row-group']}>
                                <div className={styles['input-group-half']}>
                                    <label>PASSWORD</label>
                                    <input 
                                        type="password" 
                                        name="password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className={styles['input-group-half']}>
                                    <label>CONFIRM PASSWORD</label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className={styles['signup-btn']}
                                disabled={isLoading}
                            >
                                {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP NOW!'}
                            </button>
                        </form>

                        <div className={styles.divider}></div>
                        <p className={styles['footer-text']}>
                            ALREADY HAVE AN ACCOUNT? 
                            <a href="/login" onClick={(e) => {
                                e.preventDefault();
                                navigate('/login');
                            }}> LOG IN HERE</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;