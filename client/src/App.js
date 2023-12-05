import Navbar from "./components/base/Navbar";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Transaction from "./pages/Transaction";
import Withdrawal from "./pages/Withdrawal";
function App() {
	return (
		<div>
			<Toaster />
			<Navbar />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/transaction" element={<Transaction />} />
				<Route path="/withdrawal" element={<Withdrawal />} />
			</Routes>
		</div>
	);
}

export default App;