const Login = () => {
    return (
        <div>
            <section className='section is-medium'>
                <div className='box '>
                    <h1 className='title has-text-centered'>Sign In</h1>
                    <form>
                        <div className='field'>
                            <label className='label'>Username or Email</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Username or Email'
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