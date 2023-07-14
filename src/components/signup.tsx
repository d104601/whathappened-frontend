const Signup = () => {
    return (
        <div>
            <section className='section'>
                <div className='box '>
                    <h1 className='title has-text-centered'>Sign Up</h1>
                    <form>
                        <div className='field'>
                            <label className='label'>Username</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Username'
                                />
                            </div>
                        </div>
                        <div className='field'>
                            <label className='label'>Email</label>
                            <div className='control'>
                                <input
                                    className='input'
                                    type='email'
                                    placeholder='Username'
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
                        <div className='field'>
                            <label className='label'>Confirm Password</label>
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