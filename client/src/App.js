import Games from "./components/Games";
import Navbar from "./components/base/Navbar";
import ColorPrediction from "./pages/ColorPrediction";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Transaction from "./pages/Transaction";

function App() {
	return (
		<div>
			<Toaster />
			<Navbar />
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/colorprediction" element={<ColorPrediction />} />
				<Route path="/games" element={<Games />} />
				<Route path="/transaction" element={<Transaction />} />
			</Routes>
		</div>
	);
}

export default App;
