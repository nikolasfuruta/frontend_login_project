/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
//CONDITIONS FOR MATCHING
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {
	const userRef = useRef();
	const errRef = useRef();

	//STATES
	//username
	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	//password
	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	//confirm password
	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	//error or success
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	//EFFECTS
	useEffect(() => {
		userRef.current.focus(); //activate focus
	}, []);

	useEffect(() => {
		const result = USER_REGEX.test(user);
		setValidName(result);
	}, [user]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));

		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd, matchPwd]);

	//HANDLES
	const handleSubmit = async (e) => {
		e.preventDefault();
		//if btn enabled with js hack (for precaution)
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg('Invalid Entry');
			return;
		}
		//send data to the backend
		try {
			const response = await axios.post(
				'/register', //baseUrl + REGISTER_URL
				JSON.stringify({
					//payLoad
					username: user,
					password: pwd,
				})
			);
			// console.log(response.data);
			// console.log(response.accessToken);
			// console.log(JSON.stringify(response));

			setSuccess(true);

			//clear input fileds
			setUser('');
			setPwd('');
			setMatchPwd('');
		} catch (err) {
			if (!err?.response) setErrMsg('No Server Response');
			else if (err.response?.status === 409) setErrMsg('Username Taken');
			else setErrMsg('Registration Failed');

			//set focus to the err msg
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<section>
					<h1>Success!</h1>
					<p>
						<Link to='/login'>Sign In</Link>
					</p>
				</section>
			) : (
				<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live='assertive'>
						{errMsg}
					</p>

					<h1>Register</h1>
					<form onSubmit={handleSubmit}>
						{/* USERNAME */}
						<label htmlFor='username'>
							Username:
							<span className={validName ? 'valid' : 'hide'}>
								<FontAwesomeIcon icon={faCheck} />
							</span>
							<span className={validName || !user ? 'hide' : 'invalid'}>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</label>
						<input
							type='text'
							id='username'
							ref={userRef}
							autoComplete='off'
							required
							aria-invalid={validName ? 'false' : 'true'}
							aria-describedby='uidnote'
							value={user}
							onChange={(e) => setUser(e.target.value)}
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>
						<p
							id='uidnote'
							className={
								userFocus && user && !validName ? 'instructions' : 'offscreen'
							}>
							<FontAwesomeIcon icon={faInfoCircle} />
							4 to 24 characters.
							<br />
							Must begin with a letter.
							<br />
							Letters, numbers, underscores, hyphens allowed.
						</p>
						{/* PASSWORD */}
						<label htmlFor='password'>
							Password:
							<span className={validPwd ? 'valid' : 'hide'}>
								<FontAwesomeIcon icon={faCheck} />
							</span>
							<span className={validPwd || !pwd ? 'hide' : 'invalid'}>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</label>
						<input
							type='password'
							id='password'
							required
							aria-invalid={validPwd ? 'false' : 'true'}
							aria-describedby='pwdnote'
							value={pwd}
							onChange={(e) => setPwd(e.target.value)}
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>
						<p
							id='pwdnote'
							className={
								pwdFocus && pwd && !validPwd ? 'instructions' : 'offscreen'
							}>
							<FontAwesomeIcon icon={faInfoCircle} />
							8 to 24 characters.
							<br />
							Must include uppercase and lowercase letters, a number and a
							special character.
							<br />
							Allowed special characters:{' '}
							<span aria-label='exclamation mark'>!</span>
							<span aria-label='at symbol'>@</span>{' '}
							<span aria-label='hashtag'>#</span>
							<span aria-label='dollar sign'>$</span>{' '}
							<span aria-label='percent'>%</span>
						</p>
						{/*CONFIRM PASSWORD*/}
						<label htmlFor='confirm_pwd'>
							Confirm Password:
							<span className={validMatch && matchPwd ? 'valid' : 'hide'}>
								<FontAwesomeIcon icon={faCheck} />
							</span>
							<span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
								<FontAwesomeIcon icon={faTimes} />
							</span>
						</label>
						<input
							id='confirm_pwd'
							type='password'
							required
							aria-invalid={validMatch ? 'false' : 'true'}
							aria-describedby='confirmnote'
							value={matchPwd}
							onChange={(e) => setMatchPwd(e.target.value)}
							onFocus={() => setMatchFocus(true)}
							onBlur={() => setMatchFocus(false)}
						/>
						<p
							id='confirmnote'
							className={
								matchFocus && matchPwd && !validMatch
									? 'instructions'
									: 'offscreen'
							}>
							<FontAwesomeIcon icon={faInfoCircle} />
							Must match the first password input field.
						</p>
						{/*SUBMIT BUTTON*/}
						<button
							disabled={!validName || !validPwd || !validMatch ? true : false}>
							Sign Up
						</button>
						{/*INFO*/}
						Already registered?
						<br />
						<span className='line'>
							<Link to='/login'>Sign in</Link>
						</span>
					</form>
				</section>
			)}
		</>
	);
};

export default Register;
