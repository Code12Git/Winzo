import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import Modal from 'react-modal';

// Set the app element for React Modal
Modal.setAppElement('#root'); // Replace '#root' with your main app element's ID

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
)
