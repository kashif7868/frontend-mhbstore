import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, clearCart, incrementQty, decrementQty } from "../app/actions/actionsCart";
import { FaStar, FaMinus, FaPlus, FaBolt } from "react-icons/fa";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cart);

  const handleIncrement = (productId, selectedSize) => {
    dispatch(incrementQty(productId, selectedSize));
    toast.success("Quantity increased!");
  };

  const handleDecrement = (productId, selectedSize) => {
    dispatch(decrementQty(productId, selectedSize));
    toast.success("Quantity decreased!");
  };

  const handleRemoveItem = (productId, selectedSize) => {
    dispatch(removeFromCart(productId, selectedSize));
    toast.error("Item removed from cart.");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart cleared!");
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart: cartItems } });
    toast.success("Proceeding to checkout!");
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * (item.qty || 1),
    0
  );

  const deliveryCharges = 0;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id + item.selectedSize} className="cart-item">
            <img
              src={`https://api.mhbstore.com/${item.images[0]}`}
              alt={item.productName}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <p className="cart-item-name">{item.productName}</p>

              {/* Rating Section */}
              <div className="rating" aria-label={`Rating: ${item.ratings || 0}`}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="star"
                    color={i < Math.floor(item.ratings || 0) ? "#ffc107" : "#e4e5e9"}
                  />
                ))}
                <span className="rating-value">{(item.ratings ?? 0).toFixed(1)}</span>
              </div>

              <p className="cart-item-size">Size: {item.selectedSize}</p>
              <div className="quantity-section">
                <button
                  onClick={() => handleDecrement(item.id, item.selectedSize)}
                  className="quantity-btn"
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
                <span className="quantity-value">{item.qty}</span>
                <button
                  onClick={() => handleIncrement(item.id, item.selectedSize)}
                  className="quantity-btn"
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="cart-item-price">
                ₨ {item.price * item.qty}
              </div>
              <button
                onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                className="remove-item-btn"
              >
                <IoIosRemoveCircleOutline /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="cart-summary">
        <p>
          <strong>Subtotal:</strong> ₨ {subtotal}
        </p>
        <p>
          <strong>Delivery Charges:</strong>{" "}
          {deliveryCharges === 0 ? (
            <span>Delivery is Free</span>
          ) : (
            `₨ ${deliveryCharges}`
          )}
        </p>
        <p>
          <strong>Total:</strong> ₨ {subtotal + deliveryCharges}
        </p>
      </div>

      {/* Clear Cart and Checkout Buttons */}
      <div className="cart-actions">
        <button onClick={handleClearCart} className="clear-cart-btn">
          Clear Cart
        </button>
        <button onClick={handleCheckout} className="checkout-btn">
          Checkout <FaBolt />
        </button>
      </div>

      <ToastContainer autoClose={500} />
    </div>
  );
};

export default Cart;
