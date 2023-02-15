import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
	const [users, setUsers] = useState();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		//new AbortController is for cancel the pending req.
		const controller = new AbortController();
		//fetch data from backend
		const getUsers = async () => {
			try {
				const response = await axiosPrivate.get('/users', {
					signal: controller.signal, //cancel req in case of failure
				});
				//filter data to get only usernames
				const userNames = response?.data.map(user => user.username)
				isMounted && setUsers(userNames);
			} catch (e) {
				console.error(e);
				//"state:{ from:location }, replace:true" set the page to return after login
				navigate('/login', { state:{ from:location }, replace:true })
			}
		};
		//call the function
		getUsers();
		//cleanUp function - it runs when the component unMount
		return () => {
			isMounted = false;
			//abort any pending request
			controller.abort();
		};
	}, [axiosPrivate, location, navigate]);

	return (
		<article>
			<h2>Users List</h2>
			{users?.length 
			? (
				<ul>
					{users.map((user, i) => (
						<li key={i}>{user}</li>
					))}
				</ul>
			) : (
				<p>No users to display</p>
			)}
			<br />
		</article>
	);
};

export default Users;
