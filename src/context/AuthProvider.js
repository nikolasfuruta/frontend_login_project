import { createContext, useState } from 'react';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	//state for accessToken
	const [auth, setAuth] = useState({});
	
	
	//state for persistting data
	const [persist, setPersist] = useState(
		//the user save the local value 'true' if wants to persist
		localStorage.getItem('persist') 
		? JSON.parse(localStorage.getItem('persist'))
		: false
	);

	return (
		<AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
