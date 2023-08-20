import {useState} from 'react';
import { UserService } from '../services/userService';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // check username
        if (username.length < 3) {
            setError('Username must be at least 5 characters long');
            return;
        }
        // check email
        else if (!email.includes('@')) {
            setError('Invalid email');
            return;
        }
        // check password
        else if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        // check confirm password
        else if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        else
        {
            // if all checks pass, send data to server
            UserService.signup(username, password, email)
            .then((response) => {
                window.location.href = '/login';
            }).catch((error) => {
                setError(error.message);
            });
        }
            
    };

    return (
        <div>
            <section className='section'>
                <div className='box '>
                    <h1 className='title has-text-centered'>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        {
                            error !== ''
                            &&
                            <div className='field'>
                                <div className='notification is-danger'>
                                    {error}
                                </div>
                            </div>
                        }
                        <div className='field'>
                            <label className='label'>Username</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='field'>
                            <label className='label'>Email</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='field'>
                            <label className='label'>Password</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassowrd(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='field'>
                            <label className='label'>Confirm Password</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='password'
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='field has-text-centered'>
                            <div className='control'>
                                <button className='button is-link'>Create Account</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Signup;