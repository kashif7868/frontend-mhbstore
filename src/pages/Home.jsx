import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder, MdNavigateNext } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { GrFormPrevious } from "react-icons/gr";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/home.css";
import { fetchSliderImages } from "../app/reducers/sliderSlice";
import { fetchCategories } from "../app/reducers/categorySlice";
import { getAllProducts } from "../app/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/actions/actionsCart";
import { IoSearchOutline } from "react-icons/io5";
import {
  addToFavorites,
  removeFromFavorites,
} from "../app/reducers/favoritesSlice";
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import { motion } from "framer-motion"; // Import Framer Motion

const Loader = () => (
  <div className="loader">
    <div className="spinner"></div>
  </div>
);

const Home = () => {
  const dispatch = useDispatch();
  const slider = useSelector((state) => state.slider);
  const categories = useSelector((state) => state.category?.categories || []);
  const categoryStatus = useSelector(
    (state) => state.category?.status || "idle"
  );
  const products = useSelector((state) => state.product?.products || []);
  const favorites = useSelector((state) => state.favorites);
  const peerals = useSelector((state) => state.user?.peerals || 0);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [hoveredProduct, setHoveredProduct] = useState({ id: null, index: 0 });
  const [hoverInterval, setHoverInterval] = useState(null);
  const [loading, setLoading] = useState(false);

  const { images } = slider;
  const categoriesSubNavbarScroll = useHorizontalScroll();

  // Pagination States
  const productsPerPage = 30; // Set to 30
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    dispatch(fetchSliderImages());
    setLoading(true);
    dispatch(getAllProducts()).finally(() => setLoading(false));
    if (categoryStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoryStatus]);

  useEffect(() => {
    setFilteredProducts(products);
    setTotalPages(Math.ceil(products.length / productsPerPage)); // Set total pages after products are loaded
  }, [products]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const isFavorite = (productId) =>
    Array.isArray(favorites) && favorites.includes(productId);

  const handleFavoriteToggle = (product) => {
    if (isFavorite(product._id)) {
      dispatch(removeFromFavorites(product._id));
      toast.info(`${product.productName || "Product"} removed from favorites.`);
    } else {
      dispatch(addToFavorites(product._id));
      toast.success(`${product.productName || "Product"} added to favorites!`);
    }
  };

  const handleMouseEnter = (product) => {
    if (product.media && product.media.length > 1) {
      let index = 0;
      const interval = setInterval(() => {
        setHoveredProduct({
          id: product._id,
          index: (index + 1) % product.media.length,
        });
        index++;
      }, 500);
      setHoverInterval(interval);
    }
  };

  const handleMouseLeave = () => {
    clearInterval(hoverInterval);
    setHoveredProduct({ id: null, index: 0 });
  };

  const handleApplyPeerals = (product) => {
    const discount = Math.min(peerals, product.price || 0);
    const newPrice = (product.price || 0) - discount;
    toast.success(
      `You applied ${discount} PKR in peerals! New price: ₨ ${newPrice}`
    );
    dispatch(
      addToCart({ ...product, price: newPrice, appliedDiscount: discount })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const results = searchQuery.trim()
        ? products.filter((product) =>
            product.productName
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        : products;
      setFilteredProducts(results);
      setTotalPages(Math.ceil(results.length / productsPerPage)); // Update total pages based on search results
      setLoading(false);
    }, 1000);
  };

  const handleCategoryFilterChange = (categoryId) => {
    setLoading(true);
    setTimeout(() => {
      const results =
        categoryId === "All"
          ? products
          : products.filter((product) => product.categoryName === categoryId);
      setFilteredProducts(results);
      setSelectedCategory(categoryId);
      setTotalPages(Math.ceil(results.length / productsPerPage)); // Update total pages based on category filter
      setLoading(false);
    }, 1000);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Wrap handleScroll with useCallback to avoid creating a new function on every render
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom && currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]); // Now `handleScroll` is included in dependencies

  return (
    <div>
      <div className="carousel-container">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          arrows={true}
        >
          {images.map((slide) => (
            <motion.div
              key={slide._id}
              className="carousel-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={`http://www.api.mhbstore.com/${slide.image}`}
                alt={slide.altText}
                className="carousel-image"
              />
            </motion.div>
          ))}
        </Slider>
      </div>

      <section
        className="categori-sub-navbar-container"
        ref={categoriesSubNavbarScroll.containerRef}
      >
        <div className="categori-sub-navbar">
          <h2 className="popular-products">Popular Products</h2>
          <nav className="categories-nav-list">
            <button
              className={selectedCategory === "All" ? "active" : ""}
              onClick={() => handleCategoryFilterChange("All")}
            >
              All
            </button>

            {categories.map((category) => (
              <div key={category._id} className="category-item">
                <button
                  className={selectedCategory === category.categoryName ? "active" : ""}
                  onClick={() => handleCategoryFilterChange(category.categoryName)}
                >
                  <img
                    src={`http://www.api.mhbstore.com/${category.image}`}
                    alt={category.categoryName}
                    className="category-image"
                  />
                  {/* {category.categoryName} */}
                </button>
              </div>
            ))}
          </nav>
          <section className="search-section">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">
                <IoSearchOutline />
              </span>
            </form>
          </section>
        </div>
      </section>

      <section className="product-container">
        <div className="products-grid">
          {loading ? (
            <Loader />
          ) : currentProducts.length === 0 ? (
            <div className="no-products-message">
              {selectedCategory === "All"
                ? "No products available"
                : "This product category is not available"}
            </div>
          ) : (
            currentProducts.map((product) => (
              <motion.div
                key={product._id}
                className="product-cart"
                onMouseEnter={() => handleMouseEnter(product)}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {product.discount && (
                  <span className="sale-tag">SALE {product.discount}%</span>
                )}

                <Link to={`/product-view-details/${product._id}`}>
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
                    className="product-image"
                  />

                  <div className="product-info">
                    <h5 className="product-name">{product.productName}</h5>
                    <div className="price">
                      {product.oldPrice && (
                        <span className="old-price">
                          ₨ <del>{product.oldPrice}</del>
                        </span>
                      )}
                      <span className="new-price">₨ {product.price}</span>
                    </div>
                    <div className="rating">
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
                    {product.stock <= 0 && (
                      <div className="out-of-stock">Product out of stock</div>
                    )}
                  </div>
                </Link>

                <div className="action-buttons ">
                  <span
                    className="wishlist-icon wishlist-icon-list"
                    onClick={() => handleFavoriteToggle(product)}
                  >
                    {isFavorite(product._id) ? (
                      <MdFavorite style={{ color: "red" }} />
                    ) : (
                      <MdFavoriteBorder />
                    )}
                  </span>

                  {peerals > 0 && product.usePeeralsDiscount && (
                    <button
                      className="apply-peerals-btn"
                      onClick={() => handleApplyPeerals(product)}
                    >
                      Use {peerals} Peerals
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button previous"
          >
            <GrFormPrevious className="pagination-icon" /> Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button next"
          >
            Next <MdNavigateNext className="pagination-icon" />
          </button>
        </div>
      </section>

      <ToastContainer autoClose={500} />
    </div>
  );
};

export default Home;
