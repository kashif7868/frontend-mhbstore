import React from "react";
import { Routes, Route } from "react-router-dom";
import ResetPasswordPage from "../components/auth/ResetPasswordPage";
import CategoryPage from "../pages/Categories/CategoryPage";

// Informational Pages
import About from "../pages/MhbInfo/About";
import Contact from "../pages/MhbInfo/Contact";
import Delivery from "../pages/MhbInfo/Delivery";
import Certifications from "../pages/MhbInfo/Certifications";
import ReturnPolicy from "../pages/MhbInfo/ReturnPolicy";
import Partnership from "../pages/MhbInfo/Partnership";
import SecurePayment from "../pages/MhbInfo/SecurePayment";
import TermsCondition from "../pages/MhbInfo/TermsConditions";
import NotFound from "../pages/NotFound";

const AllPages = () => {
  return (
    <Routes>
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* Clothing Routes */}
      <Route path="/category/:categoryId" element={<CategoryPage />} />

      {/* Informational Routes */}
      <Route path="/about-us" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/delivery" element={<Delivery />} />
      <Route path="/certifications" element={<Certifications />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />
      <Route path="/partnership" element={<Partnership />} />
      <Route path="/secure-payment" element={<SecurePayment />} />
      <Route path="/terms-conditions" element={<TermsCondition />} />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllPages;
