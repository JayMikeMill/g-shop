import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			{/* Header with logo, title, and menu */}
			<Header />

			{/* Main content */}
			<main
				style={{
					width: "100%",
					flex: 1,
					overflowY: "auto",
				}}
			>
				<div
					style={{
						maxWidth: "1200px",
						margin: "0 auto",
						padding: "20px",
					}}
				>
					{/* React Router handles page navigation */}
					<Routes>
						<Route path="/" element={<Home/>} />
						<Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
					</Routes>
				</div>
			</main>
		</div>
	);
}
