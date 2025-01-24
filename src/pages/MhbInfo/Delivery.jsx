import React from "react";
import { FaShippingFast, FaBoxOpen } from "react-icons/fa";
import "../../assets/css/mhbStore/delivery.css";

const Delivery = () => {
  return (
    <div className="delivery-container">
      <div className="delivery-banner">
        <h1 className="delivery-title">Shipping Information</h1>
      </div>
      <div className="delivery-content-container">
        <section className="delivery-cart">
          <FaShippingFast className="section-icon" />
          <h2>Shipping Time</h2>
          <p>
            Estimated delivery dates are provided at checkout. We will ensure
            dispatch within 24/48 hours from the order confirmation time. Actual
            delivery times may vary depending on the shipping provider and your
            location.
          </p>
        </section>

        <section className="delivery-cart">
          <FaBoxOpen className="section-icon" />
          <h2>Shipping Costs</h2>
          <p>
            Orders over Rs. 4,999 qualify for free shipping. For orders under
            Rs. 4,999, shipping costs are Rs. 199.00 (under 01 KG).
          </p>
        </section>

        <section className="delivery-cart">
          <FaBoxOpen className="section-icon" />
          <h2>Risk of Loss</h2>
          <p>
            Once shipped, the risk of loss passes to you. If the package is lost
            or damaged in transit, please contact us, and we will do our best to
            assist.
          </p>
        </section>
      </div>

      <div className="delivery-contact">
        <p>
          For questions or concerns, please reach out to us at
          <a href="mailto:cc@mhbstore.com"> cc@mhbstore.com</a>
        </p>
      </div>
    </div>
  );
};

export default Delivery;
