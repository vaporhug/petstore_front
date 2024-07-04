import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import {Auth0Provider} from "@auth0/auth0-react";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage/OrderConfirmationPage";


function App() {
    const domain = "dev-oozj66y0lf5y3fmr.us.auth0.com"
    const clientId = "n7CilxbLiDJ0ChFfRQtBijxlyUHASxFF"
    return (
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
    >
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products/:category" element={<ProductListPage />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage/>} />
                <Route path="/checkout" element={<CheckoutPage/>} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            </Routes>
        </Router>
    </Auth0Provider>
    );
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           hello
//         </p>
//       </header>
//     </div>
//   );
// }

export default App;
