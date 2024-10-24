import React from 'react';
import { ToastContainer } from 'react-toastify';

import { ToasterProps } from './constants/ToasterProps';
import CurrentUserProvider from './contexts/UserContext/UserContext';
import Views from './views/Views';

import './App.css';

function App() {
	return (
		<>
			<CurrentUserProvider>
				<Views />
			</CurrentUserProvider>

			<ToastContainer {...ToasterProps} />
		</>
	);
}

export default App;
