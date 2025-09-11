import { Routes, Route } from 'react-router-dom';
import SiteHeader from "@components/site-header";
import HomePage from "@pages/home-page";
import CartPage from "@pages/cart-page";
import CheckoutPage from '@pages/checkout-page';
import AdminDashboard from '@pages/admin-dashboard';


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
			<SiteHeader />

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
						<Route path="/" element={<HomePage/>} />
						<Route path="/admin" element={<AdminDashboard />} />
						<Route path="/cart" element={<CartPage />} />
            			<Route path="/checkout" element={<CheckoutPage />} />
					</Routes>
				</div>
			</main>
		</div>
	);
}
