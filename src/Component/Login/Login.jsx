import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {

    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setregisterSuccess] = useState('');
    const emailRef = useRef(null);


    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        setRegisterError('');
        setregisterSuccess('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setregisterSuccess('Login Success');
                }
                else{
                    alert('Please.. Verify Your email address')
                }
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message)
            })
    }


    const handlePasswordForget = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('provide and emai', emailRef.current.value)
            return;
        }
        else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email))
        {
            console.log('write a valid email')
            return;
        }

        sendPasswordResetEmail(auth,email)
        .then(() => {
            alert('check your email');
        })
        .catch(error => {
            console.log(error);
        })
    }



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" ref={emailRef} name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a onClick={handlePasswordForget} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            registerError && <p className='text-center text-red-600'>{registerError}</p>
                        }
                        {
                            registerSuccess && <p className='text-center text-green-600'>{registerSuccess}</p>
                        }

                        <p className='font-bold'>New to this website.? Please <Link className='underline' to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;