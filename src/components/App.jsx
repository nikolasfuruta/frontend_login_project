import React from 'react';
import Register from './public/Register';
import Login from './public/Login';
import Home from './protected/Home';
import Layout from './Layout';
import Editor from './protected/Editor';
import Admin from './protected/Admin';
import Missing from './Missing';
import Unauthorized from './public/Unauthorized';
import Lounge from './protected/Lounge';
import LinkPage from './public/LinkPage';
import RequireAuth from './public/RequireAuth';
import PersistLogin from './PersistLogin';

import { Routes, Route } from 'react-router-dom';

const ROLES = {
	'User': 2001,
	'Editor':1984,
	'Admin':5150
}

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{/*Public Routes*/}
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='linkpage' element={<LinkPage />} />
				<Route path='unauthorized' element={<Unauthorized />} />

				{/*Routes protected by roles*/}
				{/*PersistLogin component validate if user has persist*/}
				<Route element={<PersistLogin/>}>
					{/*RequireAuth component validate if user has permission to the route*/}
					{/*User role*/}
					<Route element={ <RequireAuth allowedRoles={[ROLES.User]}/> }>
						<Route path='/' element={<Home />} />
					</Route>

					{/*Editor role*/}
					<Route element={ <RequireAuth allowedRoles={[ROLES.Editor]}/> }>
						<Route path='editor' element={<Editor />} />
					</Route>

					{/*Admin role*/}
					<Route element={ <RequireAuth allowedRoles={[ROLES.Admin]}/> }>
						<Route path='admin' element={<Admin />} />
					</Route>

					{/*Admin and Editor role*/}
					<Route element={ <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]}/> }>
						<Route path='lounge' element={<Lounge />} />
					</Route>
				</Route>

				{/*404 Route*/}
				<Route path='*' element={<Missing />} />
			</Route>
		</Routes>
	);
};

export default App;
