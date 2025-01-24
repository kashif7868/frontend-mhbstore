import React from "react";
import "../../assets/css/mhbStore/termsConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-wrapper">
      <div className="terms-banner">
        <h1 className="terms-title">Terms and Conditions</h1>
      </div>
      <div className="terms-content">
        <p className="terms-intro">
          Welcome to MHB Store! By accessing or making a purchase on our
          website, you agree to be bound by these Terms and Conditions. Please
          review them carefully before using our services.
        </p>

        <section className="terms-section">
          <h2 className="terms-heading">Acceptance of Terms</h2>
          <p className="terms-text">
            By using our website and making purchases, you accept and agree to
            these Terms and Conditions. If you do not agree, please refrain from
            using our site.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Product Descriptions</h2>
          <p className="terms-text">
            We strive to display product information, including descriptions and
            images, as accurately as possible. However, we do not guarantee that
            the information is error-free.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Pricing</h2>
          <p className="terms-text">
            Prices are displayed in PKR and are subject to change without prior
            notice. We reserve the right to adjust prices, discounts, and
            promotions at any time.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Availability</h2>
          <p className="terms-text">
            Product availability is subject to stock levels and can vary. If a
            product you ordered is unavailable, we will inform you and either
            provide a refund or suggest an alternative.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Order Acceptance</h2>
          <p className="terms-text">
            Once you place an order, you will receive an email confirmation. This
            does not constitute order acceptance. We reserve the right to cancel
            or limit quantities for any order.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Payment Methods</h2>
          <p className="terms-text">
            We accept Master & Visa Card, Bank Alfalah, Meezan Bank, Jazz Cash,
            and Easypaisa. Payment is required in full at the time of purchase or
            via Cash on Delivery (COD).
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Currency</h2>
          <p className="terms-text">
            Transactions are processed in PKR. Foreign exchange rates may apply if
            you’re using a foreign payment method.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Shipping Time</h2>
          <p className="terms-text">
            Estimated delivery dates are provided at checkout. We ensure dispatch
            within 24-48 hours of order confirmation. Actual delivery times may
            vary depending on the shipping provider and your location.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Shipping Costs</h2>
          <p className="terms-text">
            For orders over Rs. 4,999, shipping is free. For orders under Rs. 4,999,
            a shipping fee of Rs. 199 (for packages under 1 KG) applies.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Risk of Loss</h2>
          <p className="terms-text">
            Once shipped, the risk of loss passes to you. If the package is lost
            or damaged in transit, please contact us, and we will do our best to
            assist.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Return Policy</h2>
          <p className="terms-text">
            We accept returns within 14 days of purchase for unused, unopened
            products in their original packaging.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Refunds</h2>
          <p className="terms-text">
            Refunds are processed once the returned item is received and
            inspected. Shipping costs for returns are the customer’s
            responsibility unless the error was on our part.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Non-Returnable Items</h2>
          <p className="terms-text">
            Certain items, such as perishable goods, food items, or custom orders,
            are non-returnable.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="terms-heading">Contact Us</h2>
          <p className="terms-text">
            For questions or concerns, please reach out to us at{" "}
            <a href="mailto:cc@mhbstore.com" className="terms-link">
              cc@mhbstore.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
