import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Order/CheckoutPage";
import OrderDetailsPage from "./pages/Order/OrderDetailsPage";
import Preloader from "./components/Preloader";
import useNavigationLoader from "./hooks/useNavigationLoader";
import AuthPage from "./components/auth/AuthPage "; // Ensure correct import
import FavouritList from "./pages/FavouritList";
import MyAccount from "./pages/MyAccount/MyAccount";
import BasicInfo from "./pages/MyAccount/BasicInfo";
import EditProfile from "./pages/MyAccount/EditProfile";
import OrderHistory from "./pages/MyAccount/OrderHistory";
import AllPages from "./components/AllPages";
import ChatBot from "./components/ChatBot";
import ProductView from "./pages/ProductView";
import DiscountPopup from "./components/AdsDiscountBannerPopup";
import Pearls from "./pages/Peerals/Peerals";
import TestPage from "./pages/Categories/WomenPage";

import { AuthProvider } from "./context/authContext";

const AppContent = () => {
  const loading = useNavigationLoader();
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <DiscountPopup />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/peerals/:userId" element={<Pearls />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/order-details/:orderId"
              element={<OrderDetailsPage />}
            />
            <Route
              path="/signIn"
              element={
                <AuthPage
                  signUpContent={
                    <p>Join us today and enjoy exclusive perks!</p>
                  }
                  signInContent={
                    <p>Welcome back! Please sign in to continue.</p>
                  }
                />
              }
            />
            <Route path="/my-account" element={<MyAccount />}>
              <Route path="basic-info/:userId" element={<BasicInfo />} />
              <Route path="edit-profile/:userId" element={<EditProfile />} />
              <Route path="order-history" element={<OrderHistory />} />
            </Route>
            <Route path="/favourit-list" element={<FavouritList />} />
            <Route
              path="/product-view-details/:productId"
              element={<ProductView />}
            />
            <Route path="/women" element={<TestPage />} />
            <Route path="/*" element={<AllPages />} />
          </Routes>
          <Footer />
          <ChatBot />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
