import { useState } from 'react';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e: any) => {

    }

    return (
        <div>
            <section className='section'>
                <div className='box '>
                    <h1 className='title has-text-centered'>Sign In</h1>
                    <form onSubmit={submit}>
                        <div className='field'>
                            <label className='label'>Username or Email</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Username or Email'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='field has-text-centered'>
                            <div className='control'>
                                <button className='button is-link'>Sign In</button>
                            </div>
                        </div>
                        <div>
                            <p className='has-text-centered'>Don't have an account? <a href='/signup'>Sign up</a></p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Login;