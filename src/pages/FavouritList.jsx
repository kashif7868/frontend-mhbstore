import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../app/reducers/favoritesSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
import "../assets/css/favoritesPage.css";
import { IoHeartDislikeCircleOutline } from "react-icons/io5";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites); // Array of favorite product IDs
  const products = useSelector((state) => state.product?.products || []); // Get all products from Redux store
  const [favoriteProducts, setFavoriteProducts] = useState([]); // Local state to hold favorite products
  const [hoveredProduct, setHoveredProduct] = useState({ id: null, index: null }); // State to track hovered product

  useEffect(() => {
    // Update favorite products whenever favoriteIds or products change
    const updatedFavoriteProducts = products.filter((product) =>
      favoriteIds.includes(product._id)
    );
    setFavoriteProducts(updatedFavoriteProducts);
  }, [favoriteIds, products]); // Dependency on both favoriteIds and products

  const handleRemoveFromFavorites = (product) => {
    dispatch(removeFromFavorites(product._id));
    toast.info(`${product.productName} removed from favorites.`);
  };

  const handleMouseEnter = (productId, index) => {
    setHoveredProduct({ id: productId, index: index });
  };

  const handleMouseLeave = () => {
    setHoveredProduct({ id: null, index: null });
  };

  return (
    <div className="favorites-container-main">
      {/* Page Banner */}
      <div className="favorites-banner">
        <div className="banner-content">
          <h1>Favorite Products</h1>
          <p>
            <Link to="/">Home</Link> / Favorite Products
          </p>
        </div>
      </div>

      {/* Favorites List */}
      <div className="favorites-list">
        {favoriteProducts.length > 0 ? (
          <div className="favorites-grid">
            {favoriteProducts.map((product) => (
              <div key={product._id} className="favorites-card">
                {product.discount && (
                  <span className="favorites-sale-tag">
                    SALE {product.discount}%
                  </span>
                )}
                <Link
                  to={`/product-view-details/${product._id}`}
                  className="favorites-product-details-link"
                >
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? hoveredProduct.id === product._id
                          ? `http://www.api.mhbstore.com/${
                              product.images[hoveredProduct.index]
                            }`
                          : `http://www.api.mhbstore.com/${product.images[0]}`
                        : ""
                    }
                    alt={product.productName}
                    className="favorites-product-image"
                    onMouseEnter={() => handleMouseEnter(product._id, 1)} // Assuming you want to display the second image on hover
                    onMouseLeave={handleMouseLeave}
                  />

                  <div className="favorites-product-info">
                    <h5 className="favorites-product-name">
                      {product.productName}
                    </h5>
                    <div className="favorites-product-price">
                      {product.oldPrice && (
                        <span className="favorites-old-price">
                          ₨ <del>{product.oldPrice}</del>
                        </span>
                      )}
                      <span className="favorites-new-price">
                        ₨ {product.price}
                      </span>
                    </div>
                    <div className="favorites-rating">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          color={
                            i < Math.floor(product.ratings)
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </Link>

                <div className="favorites-action-buttons">
                  <span
                    className="favorites-remove-btn"
                    onClick={() => handleRemoveFromFavorites(product)}
                  >
                    <IoHeartDislikeCircleOutline size={24} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="favorites-empty-state">
            <h2>No Favorite Products</h2>
            <p>
              Browse products and add them to your favorites to see them here.
            </p>
            <Link to="/" className="favorites-back-to-home">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default FavoriteList;
