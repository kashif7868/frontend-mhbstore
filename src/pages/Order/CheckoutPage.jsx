import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart } from "../../app/actions/actionsCart";
import { postOrder } from "../../app/reducers/orderSlice";
import "../../assets/css/checkout.css";
import cityData from "../../data/cityData.json";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const reduxCart = useSelector((state) => state.cart.cart);
  const orderStatus = useSelector((state) => state.order.status);
  const orderError = useSelector((state) => state.order.error);

  const cartFromState = location.state?.cart || [];
  const cart = cartFromState.length > 0 ? cartFromState : reduxCart;

  // Generate orderId starting with "MHB"
  const orderId = `MHB-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;

  const [userDetails, setUserDetails] = useState({
    name: "",
    mobile: "",
    email: "",
    country: "Pakistan", // Default to Pakistan
    province: "Punjab", // Default to Punjab
    city: "",
    postalCode: "",
    apartment: "",
    address: "",
    shipToDifferentAddress: false,
    deliveryAddress: "", // For shipping to a different address
  });

  const [paymentMethod] = useState("bank");
  const [selectedBank, setSelectedBank] = useState(""); // Initially empty (Choose Bank)

  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * (item.qty || 1),
    0
  );

  const deliveryCharges = 0; // Home delivery is free
  const grandTotal = subtotal + deliveryCharges;

  const handlePlaceOrder = async () => {
    if (
      !userDetails.name ||
      !userDetails.mobile ||
      !userDetails.address ||
      !userDetails.city
    ) {
      return;
    }

    if (paymentMethod === "bank" && !selectedBank) {
      return;
    }

    const orderData = {
      orderId,
      userDetails,
      cart,
      paymentMethod,
      selectedBank,
      subtotal,
      deliveryCharges,
      grandTotal,
    };

    setIsLoading(true); // Start loading when order is placed

    // Dispatch the action to post the order
    dispatch(postOrder(orderData));

    if (orderStatus === "loading") {
      return;
    }

    if (orderStatus === "succeeded") {
      dispatch(clearCart());
      setUserDetails({
        name: "",
        mobile: "",
        email: "",
        country: "Pakistan",
        province: "Punjab",
        city: "",
        postalCode: "",
        apartment: "",
        address: "",
        shipToDifferentAddress: false,
        deliveryAddress: "",
      });

      setSelectedBank(""); // Reset bank selection

      // After the order is successfully placed, navigate to the order details page
      setTimeout(() => {
        navigate(`/order-details/${orderId}`);
      }, 2000); // Delay of 2 seconds
    } else if (orderStatus === "failed") {
      console.log(orderError || "An error occurred while placing your order.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleShipToDifferentAddressChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      shipToDifferentAddress: e.target.checked,
    }));
  };

  // useEffect to track the order status and handle loading state
  useEffect(() => {
    if (orderStatus === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [orderStatus]);

  return (
    <div className="checkout-container-main">
      <div className="product-user-details-container-left">
        <h3>Customer Details</h3>

        {/* Country/Region Dropdown */}
        <div className="billing-form-group">
          <select
            name="country"
            id="country"
            value={userDetails.country}
            onChange={handleInputChange}
            className="billing-input"
          >
            <option value="Pakistan">Pakistan</option>
          </select>
          <label htmlFor="country" className="billing-label">
            Country/Region
          </label>
        </div>

        {/* Customer Name */}
        <div className="billing-form-group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder=" "
            value={userDetails.name}
            onChange={handleInputChange}
            required
            className="billing-input"
          />
          <label htmlFor="name" className="billing-label">
            Customer Name
          </label>
        </div>

        {/* Email Address */}
        <div className="billing-form-group">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" "
            value={userDetails.email}
            onChange={handleInputChange}
            className="billing-input"
          />
          <label htmlFor="email" className="billing-label">
            Email Address (Optional)
          </label>
        </div>

        {/* Province Dropdown */}
        <div className="billing-form-group">
          <select
            name="province"
            id="province"
            value={userDetails.province}
            onChange={handleInputChange}
            className="billing-input"
          >
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="KPK">KPK</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Islamabad">Islamabad</option>
          </select>
          <label htmlFor="province" className="billing-label">
            Province
          </label>
        </div>

        {/* City Dropdown */}
        <div className="billing-form-group">
          <select
            name="city"
            id="city"
            value={userDetails.city}
            onChange={handleInputChange}
            required
            className="billing-input"
          >
            <option value="">Select a City</option>
            {cityData.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <label htmlFor="city" className="billing-label">
            City
          </label>
        </div>

        {/* Postal Code */}
        <div className="billing-form-group">
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            placeholder=" "
            value={userDetails.postalCode}
            onChange={handleInputChange}
            className="billing-input"
          />
          <label htmlFor="postalCode" className="billing-label">
            Postal Code (Optional)
          </label>
        </div>

        {/* Phone Number */}
        <div className="billing-form-group">
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder=" "
            value={userDetails.mobile}
            onChange={handleInputChange}
            required
            className="billing-input"
          />
          <label htmlFor="mobile" className="billing-label">
            Phone Number
          </label>
        </div>

        {/* Address */}
        <div className="billing-form-group">
          <textarea
            name="address"
            id="address"
            rows="5"
            placeholder=" "
            value={userDetails.address}
            onChange={handleInputChange}
            required
            className="billing-textarea"
          ></textarea>
          <label htmlFor="address" className="billing-label-textarea">
            Delivery Address
          </label>
        </div>

        {/* Apartment/Suite (Optional) */}
        <div className="billing-form-group">
          <input
            type="text"
            name="apartment"
            id="apartment"
            placeholder=" "
            value={userDetails.apartment}
            onChange={handleInputChange}
            className="billing-input"
          />
          <label htmlFor="apartment" className="billing-label">
            Apartment, Suite, etc. (Optional)
          </label>
        </div>

        {/* Ship to a Different Address */}
        <div className="billing-form-group">
          <label>
            <input
              type="checkbox"
              name="shipToDifferentAddress"
              checked={userDetails.shipToDifferentAddress}
              onChange={handleShipToDifferentAddressChange}
            />
            <span>Ship to a different address</span>
          </label>
        </div>

        {/* Additional Delivery Address */}
        {userDetails.shipToDifferentAddress && (
          <div className="billing-form-group">
            <textarea
              name="deliveryAddress"
              rows="5"
              placeholder=" "
              value={userDetails.deliveryAddress}
              onChange={handleInputChange}
              className="billing-textarea"
            ></textarea>
            <label htmlFor="deliveryAddress" className="billing-label-textarea">
              Enter Delivery Address for Shipping
            </label>
          </div>
        )}
      </div>

      <div className="payment-details-add-container-right">
        {/* Order Summary */}
        <div className="order-summary-container">
          <h3>Your Order</h3>
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="checkout-product-item">
                  <img
                    src={
                      item.images && item.images.length > 0
                        ? `https://api.mhbstore.com/${item.images[0]}`
                        : "default_image_url"
                    }
                    alt={item.productName}
                    className="checkout-product-image"
                  />
                  <div className="checkout-product-info">
                    <p>
                      <strong>Product Code:</strong> {item.id}
                    </p>
                    <p>
                      <strong>Name:</strong> {item.productName}
                    </p>
                    {item.selectedColor && (
                      <p>
                        <strong>Color:</strong>
                        <span
                          className="product-color-circle"
                          style={{
                            backgroundColor: item.selectedColor.toLowerCase(),
                          }}
                          title={item.selectedColor}
                        />
                      </p>
                    )}
                    {item.selectedSize && (
                      <p>
                        <strong>Size:</strong> {item.selectedSize}
                      </p>
                    )}
                    {item.selectedMeter && (
                      <p>
                        <strong>Meterage:</strong> {item.selectedMeter}m
                      </p>
                    )}
                    <p>
                      <strong>Qty:</strong> {item.qty}
                    </p>
                    <p>
                      <strong>Price:</strong> ₨{item.salePrice || item.price}
                    </p>
                    <p>
                      <strong>Total:</strong> ₨
                      {(item.salePrice || item.price) * item.qty}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bank-details-container">
          <h3>Order Summary</h3>
          <p>
            <strong>Subtotal:</strong> PKR {subtotal.toFixed(2)}
          </p>
          <p>
            <strong>Delivery Charges:</strong> Free
          </p>
          <h3>
            <strong>Grand Total:</strong> PKR {grandTotal.toFixed(2)}
          </h3>
        </div>

        {/* Payment Method */}
        <div className="payment-method-container">
          <h3>Payment Method</h3>
          <label>
            <span>Choose Bank</span>
          </label>
          <div className="bank-selection">
            <select
              id="bank"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">Choose Bank</option>
              <option value="bankAlfalah">Bank Alfalah</option>
              <option value="MeezanBank">Meezan Bank</option>
              <option value="jazzCash">JazzCash</option>
              <option value="easyPaisa">EasyPaisa</option>
            </select>

            {/* Display selected bank details */}
            {selectedBank && (
              <div className="bank-details-container">
                {selectedBank === "bankAlfalah" && (
                  <p>
                    <strong>Bank Alfalah</strong>
                    <br />
                    Account Name: MHB Store <br />
                    Account Number: 01611009686863
                  </p>
                )}
                {selectedBank === "MeezanBank" && (
                  <p>
                    <strong>Meezan Bank</strong>
                    <br />
                    Account Name: MHB Store <br />
                    Account Number: 02540108520675
                  </p>
                )}
                {selectedBank === "jazzCash" && (
                  <p>
                    <strong>JazzCash</strong>
                    <br />
                    Account Name: Mazhar Hussain <br />
                    Account Number: 0300-4645503
                  </p>
                )}
                {selectedBank === "easyPaisa" && (
                  <p>
                    <strong>EasyPaisa</strong>
                    <br />
                    Account Name: Mazhar Hussain <br />
                    Account Number: 0300-4645503
                  </p>
                )}
                <p>
                  <strong>Instructions:</strong>
                  <ol>
                    <li>Make your payment directly into our bank account.</li>
                    <li>
                      Share the screenshot of the transaction on{" "}
                      <strong>Whatsapp</strong> (+92300-4233378).
                    </li>
                    <li>
                      Please share your <strong>Order ID</strong> as Payment
                      Reference.
                    </li>
                  </ol>
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          className="place-order-button"
          onClick={handlePlaceOrder}
          disabled={isLoading} // Disable the button when order is being placed
        >
          {isLoading ? `Placing Order...` : `Place Order (Total: PKR ${grandTotal.toFixed(2)})`}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
