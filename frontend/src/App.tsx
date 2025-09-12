import { Routes, Route, useLocation } from 'react-router-dom';
import SiteHeader from "@components/site-header";
import SiteFooter from '@components/site-footer';
import HomePage from "@pages/home-page";
import CartPage from "@pages/cart-page";
import CheckoutPage from '@pages/checkout-page';
import AdminDashboard from '@pages/admin-dashboard';
import AboutPage from './pages/about-page';

export default function App() {
	const location = useLocation();
	const isAdminPage = location.pathname === '/admin';

	return (
		<div>
			<SiteHeader />
			<main>
				<div
					style={{
						padding: isAdminPage ? '0px' : '20px',
					}}
				>
					<Routes>
						<Route path="/" element={<HomePage/>} />
						<Route path="/admin" element={<AdminDashboard />} />
						<Route path="/cart" element={<CartPage />} />
            			<Route path="/checkout" element={<CheckoutPage />} />
						<Route path="/about" element={<AboutPage />} />
					</Routes>
				</div>
			</main>
			<SiteFooter />
		</div>
	);
}
