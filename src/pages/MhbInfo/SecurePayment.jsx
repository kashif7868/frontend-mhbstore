import React from "react";
import "../../assets/css/mhbStore/securePayment.css";

const SecurePayment = () => {
  return (
    <div className="secure-payment">
      <div className="secure-banner">
        <h1 className="secure-title">Secure Payment</h1>
      </div>
      <div className="secure-contant-container">
        <p className="secure-payment-desc">
          We prioritize the security and confidentiality of your payment
          information. To ensure safe transactions, we implement the following
          measures:
        </p>
        <div className="secure-section">
          <h2>Payment Gateway Security</h2>
          <p>
            All transactions are processed through a secure third-party payment
            gateway that complies with industry standards, including{" "}
            <strong>
              PCI DSS (Payment Card Industry Data Security Standard)
            </strong>
            . This standard ensures that payment data is encrypted and processed
            securely.
          </p>
        </div>
        <div className="secure-section">
          <h2>Encryption</h2>
          <p>
            We use SSL (Secure Socket Layer) technology to encrypt sensitive
            information, including payment details, during transmission. This
            helps to protect your data from unauthorized access.
          </p>
        </div>
        <div className="secure-section">
          <h2>Accepted Payment Methods</h2>
          <p>
            We accept major credit cards, debit cards, and other payment
            options, including Bank Alfalah Limited, Meezan Bank Limited, HBL,
            Jazz Cash, and Easypesa. Each method adheres to rigorous security
            standards.
          </p>
        </div>
        <div className="secure-section">
          <h2>Fraud Prevention</h2>
          <p>
            Our payment system is equipped with fraud detection measures to
            identify suspicious transactions. If any irregularities are
            detected, we may contact you to confirm the transaction.
          </p>
        </div>
        <div className="secure-section">
          <h2>Privacy of Payment Information</h2>
          <p>
            MHB Store does not store your full payment details. We only retain
            necessary transaction data for record-keeping and customer service
            purposes.
          </p>
        </div>
        <div className="secure-section">
          <h2>Customer Responsibility</h2>
          <p>
            For added security, we recommend using only trusted devices and
            secure internet connections when making purchases on MHB Store.
            Avoid using public or shared computers for transactions.
          </p>
        </div>
        <p className="contact-info">
          If you have any concerns or questions about our payment security,
          please contact us at{" "}
          <a href="mailto:info@mhbstore.com">info@mhbstore.com</a>
        </p>
      </div>
    </div>
  );
};

export default SecurePayment;
