import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/firebase.config';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';


const Register = () => {


    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setregisterSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const eventHandle = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password);

        setRegisterError(''); //for clear error message
        setregisterSuccess('');

        if (password.length < 6) {
            setRegisterError('Password is less than 6 charecter')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password must be contain at least one Alphabetic charecter')
            return;
        }
        else if (!accepted) {
            setRegisterError('Please, Accept Our Terms & Condition')
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setregisterSuccess('Register Success');

                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                } )
                .then(() => {
                    console.log('Pro updated')
                })
                .catch()
                // email verification 
                sendEmailVerification(result.user)
                    .then(() => {
                        setregisterSuccess('Verify Your Email')
                    })
            })
            .catch(error => {
                console.error(error)
                setRegisterError(error.message);
            })

    }

    return (
        <div>
            <div className='mx-auto md:w-1/3 border-black bg-slate-200 rounded' >
                <h3 className='text-4xl mb-8 pt-6 text-center'>Register <span className='text-teal-600'>Here</span> </h3>
                <form className='text-center' onSubmit={eventHandle} >
                    <input type="text" name="name" placeholder='Name' className='border-black mx-4 py-2 px-4 mb-5 rounded w-3/4' />
                    <br />
                    <input type="email" name="email" placeholder='Email' className='border-black mx-4 py-2 px-4 mb-5 rounded w-3/4' />
                    <br />
                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder='Password'
                            className='border-black mx-4 py-2 px-4 mb-5 rounded w-3/4'
                        />
                        <span className='absolute top-3 left-[350px]' onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiFillEye></AiFillEye>
                            }
                        </span>
                    </div>
                    <br />
                    <div className='mb-4'>
                        <input type="checkbox" name="terms" id='terms' />
                        <label htmlFor="terms">Accept Terms and Condition </label>
                    </div>
                    <input type="submit" name="Register" className='btn btn-accent border-black mx-4 py-2 px-4 mb-5 rounded w-3/4' />

                </form>

                {
                    registerError && <p className='text-center text-red-600'>{registerError}</p>
                }
                {
                    registerSuccess && <p className='text-center text-green-600'>{registerSuccess}</p>
                }
                <p className='text-center font-bold pb-3'>Already Have an account.? Please <Link className='underline' to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;