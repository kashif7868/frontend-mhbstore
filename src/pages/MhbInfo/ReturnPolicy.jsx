import React from "react";
import "../../assets/css/mhbStore/returnPolicy.css";

const ReturnPolicy = () => {
  return (
    <div className="return-policy-container">
      <div className="return-policy-banner">
        <h1 className="return-policy-title">Return Policy</h1>
      </div>
      <div className="rp-main-container ">
        <p className="return-policy-description">
          We accept returns within 14 days of purchase for unused, unopened
          products. The product must be in its original packaging.
        </p>
        <div className="return-policy-content">
          <div className="return-policy-box">
            <h2>Refunds</h2>
            <p>
              Refunds will be processed once the returned item is received and
              inspected. Shipping costs for returns are the customer’s
              responsibility unless we are at fault.
            </p>
          </div>

          <div className="return-policy-box">
            <h2>Non-Returnable Items</h2>
            <p>
              Certain items, such as perishable goods, Food Items or custom
              orders, are non-returnable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
