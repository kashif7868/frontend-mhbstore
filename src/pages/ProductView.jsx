import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/productView.css";
import {
  FaStar,
  FaBolt,
  FaShoppingCart,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../app/reducers/productSlice";
import { addToCart } from "../app/actions/actionsCart";
import ReactImageMagnify from "react-image-magnify";
import { useMediaQuery } from "react-responsive"; // Import useMediaQuery

const ProductView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  // Media queries for responsive design
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isSmallMobile = useMediaQuery({ query: "(max-width: 480px)" });

  // State variables for product options
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch product from Redux store based on productId from URL
  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === productId)
  );

  // Fetch related products based on category
  const relatedProducts = useSelector((state) =>
    state.product.products.filter(
      (related) =>
        related.categoryName === product?.categoryName &&
        related._id !== product?._id
    )
  );

  const isLoading = !product;

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  if (isLoading) {
    return <div className="error-message">Loading product...</div>;
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      selectedSize,
      qty: quantity,
    };

    // Retrieve the current cart from the Redux store
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart by comparing _id
    const existingProductIndex = currentCart.findIndex(
      (item) => item._id === product._id && item.selectedSize === selectedSize
    );

    if (existingProductIndex !== -1) {
      // If product already exists, update the quantity
      currentCart[existingProductIndex].qty += quantity;
    } else {
      // If product does not exist, add a new product entry
      currentCart.push(cartItem);
    }

    // Update the cart in the local storage (or Redux store, if you're using it for cart management)
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Dispatch action to update the cart in Redux store (optional, depending on your cart management system)
    dispatch(addToCart(cartItem));

    toast.success(`${product.productName} has been added to your cart!`);
  };

  const handleBuyNow = () => {
    // Check for required options (size), but allow skipping color selection
    if (product.sizeOptions && !selectedSize) {
      toast.error("Please select a size before proceeding.");
      return;
    }

    // Proceed to checkout without color validation
    navigate("/checkout", {
      state: {
        cart: [
          {
            ...product,
            selectedSize,
            qty: quantity,
          },
        ],
      },
    });
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Define size options based on product category (Men, Women, Boy, Girl, Food, Tech Hub, Health Care, Bedding)
  const getSizeOptions = (category, subcategory) => {
    // Check for 'Unstitched Suits' subcategory separately
    if (subcategory === "Unstitched Suits") {
      return ["3m", "4m", "5m"]; // Unstitched Suits size options
    }

    switch (category) {
      case "Men":
      case "Women":
        return ["Small", "Medium", "Large", "X-Large", "XX-Large"]; // Default sizes for Men and Women
      case "Boy":
      case "Girl":
        return [
          "0-3 Month",
          "3-6 Month",
          "6-12 Month",
          "1-2 Year",
          "3 Year",
          "4 Year",
          "5-6 Year",
          "7-8 Year",
        ];
      case "Food":
        return []; // No size options for food, display weight if available
      case "Tech Hub":
      case "Health Care":
      case "Bedding":
        return []; // No size options for these categories
      case "Ready-to-wear":
        return ["1pc", "2pc", "3pc"];
      default:
        return [];
    }
  };

  const sizeOptions = getSizeOptions(product.categoryName, product.subcategory);

  return (
    <div
      className={`product-view-container ${isTablet ? "tablet" : ""} ${
        isSmallMobile ? "small-mobile" : ""
      }`}
    >
      {/* Product Images */}
      <div
        className={`product-images-section ${isTablet ? "tablet-layout" : ""}`}
      >
        {product.images && product.images.length > 0 ? (
          <>
            <ReactImageMagnify
              className="main-product-image"
              {...{
                smallImage: {
                  alt: product.productName,
                  isFluidWidth: true,
                  src: `https://api.mhbstore.com/${product.images[selectedImageIndex]}`,
                  width: isMobile ? 300 : 400,
                  height: isMobile ? 450 : 600,
                },
                largeImage: {
                  src: `https://api.mhbstore.com/${product.images[selectedImageIndex]}`,
                  width: isMobile ? 800 : 1200,
                  height: isMobile ? 1200 : 1800,
                },
                lensStyle: { backgroundColor: "rgba(0,0,0,.5)" },
              }}
            />
            <div className="thumbnail-container">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`https://api.mhbstore.com/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${
                    index === selectedImageIndex ? "thumbnail-active" : ""
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="error-message">No images available</div>
        )}
      </div>

      {/* Product Details */}
      <div
        className={`product-details-section ${isTablet ? "tablet-layout" : ""}`}
      >
        <div className="product-details-contant-info">
          <h1 className="product-title">{product.productName}</h1>
          <div className="product-description">
            <p
              className="description-text"
              dangerouslySetInnerHTML={{
                __html: product.description.replace(/\n/g, "<br/>"),
              }}
            />
          </div>

          <div className="product-reviews-section">
            <p>Reviews:</p>
            <div className="stars-container">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={`star ${
                    index < Math.round(product.ratings) ? "star-filled" : ""
                  }`}
                />
              ))}
              <span>({product.ratings.toFixed(1)})</span>
            </div>
          </div>
          <div className="quantity-section">
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="quantity-btn"
              aria-label="Decrease quantity"
            >
              <FaMinus />
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increment")}
              className="quantity-btn"
              aria-label="Increase quantity"
            >
              <FaPlus />
            </button>
          </div>
          <div className="product-price-section">
            {product.oldPrice && (
              <span className="old-price">
                ₨ <del>{product.oldPrice}</del>
              </span>
            )}
            <span className="current-price">₨ {product.price * quantity}</span>
          </div>

          {/* Product Stock */}
          <div className="product-stock-section">
            <p>Stock: {product.productStock}</p>
          </div>

          {/* Size Option for Men, Women, and Unstitched Suits */}
          {sizeOptions.length > 0 && (
            <div className="size-options-section">
              <p>Size:</p>
              <div className="size-options-boxes">
                {sizeOptions.map((size, index) => (
                  <button
                    key={index}
                    className={`size-option-box ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* For Food Category: Display Weight if available */}
          {product.categoryName === "Food" && product.weight && (
            <div className="product-weight-section">
              <p>Weight: {product.weight} Grams</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-section">
          <button onClick={handleAddToCart} className="add-cart-btn">
            Add to Cart <FaShoppingCart />
          </button>
          <button onClick={handleBuyNow} className="buy-now-btn">
            Buy Now <FaBolt />
          </button>
        </div>
      </div>

      <ToastContainer autoClose={500} />

      {/* Related Products */}
      <div
        className={`related-products-section ${
          isTablet ? "tablet-layout" : ""
        }`}
      >
        <h3>Related Products</h3>
        <div className="related-products-grid">
          {relatedProducts.slice(0, 4).map((related) => (
            <div
              key={related._id}
              className="related-product-card"
              onClick={() => navigate(`/product-view-details/${related._id}`)}
            >
              <img
                src={`https://api.mhbstore.com/${related.images[0]}`}
                alt={related.productName}
                className="related-product-img"
              />
              <div className="related-product-info">
                <p className="related-product-name">{related.productName}</p>
                <div className="related-product-price">
                  {related.oldPrice && (
                    <p className="related-product-old-price">
                      <del>₨ {related.oldPrice}</del>
                    </p>
                  )}
                  <p className="related-product-current-price">
                    ₨ {related.price}
                  </p>
                </div>
                <div className="related-product-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      color={
                        i < Math.floor(related.ratings) ? "#ffc107" : "#e4e5e9"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
