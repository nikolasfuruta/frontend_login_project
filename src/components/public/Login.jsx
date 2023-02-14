import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';


const Login = () => {
	const { setAuth } = useAuth(); //persist, setPersist
	const navigate = useNavigate();
	const location = useLocation();
	//set the path to turn back after login
	const from = location.state?.from?.pathname || '/';

	//reference
	const userRef = useRef();
	const errRef = useRef();

	//states
	const [user, resetUser, userAttr] = useInput('user','')//useLocalStorage('user','');//useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [check, toggleCheck] = useToggle('persist', false);

	//Effects
	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	//handle
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			//send username and pwd to authenticate at backend
			const response = await axios.post(
				'/login',
				JSON.stringify({ username: user, password: pwd }) //send data
			);

			//get response accessToken
			const accessToken = response?.data?.accessToken;
			//set auth state
			setAuth({ user, accessToken });

			//cleaning the states
			//setUser('');
			resetUser();
			setPwd('');

			//this is for turn back to the previous page after login
			navigate(from, {replace:true});

		} catch (err) {
			if (!err?.response) setErrMsg('No server response');
			else if (err?.response?.status === 400)	setErrMsg('Mising username or password');
			else if (err?.response?.status === 401) setErrMsg('Unauthorized');
			else setErrMsg('Login failed');
			errRef.current.focus();
		}
	};

	return (
		<section>
			<p
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live='assertive'>
				{errMsg}
			</p>
			
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username: </label>
				<input
					type='text'
					id='username'
					ref={userRef}
					autoComplete='off'
					required
					{ ...userAttr }
				/>

				<label htmlFor='password'>Password: </label>
				<input
					type='password'
					id='password'
					value={pwd}
					onChange={(e) => setPwd(e.target.value)}
					required
				/>
				<button>Sign In</button>
				
				{/* check if trust */}
				<div className="persistCheck">
					<input type="checkbox" 
						id="persist"
						checked={ check }
						onChange={ toggleCheck }
					/>
					<label htmlFor="persist">Trust this divice</label>
				</div>
			</form>
			<p>
				Need an Account <br />
				<span className='line'>
					<Link to='/register'>Sign Up</Link>
				</span>
			</p>
		</section>
	);
};

export default Login;
