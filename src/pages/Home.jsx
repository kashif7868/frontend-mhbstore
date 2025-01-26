import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"; // Removed MdNavigateNext as it's not used
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/home.css";
import { fetchSliderImages } from "../app/reducers/sliderSlice";
import { fetchCategories } from "../app/reducers/categorySlice";
import { getAllProducts } from "../app/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import {
  addToFavorites,
  removeFromFavorites,
} from "../app/reducers/favoritesSlice";
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import { motion } from "framer-motion";

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

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [hoveredProduct, setHoveredProduct] = useState({ id: null, index: 0 });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1);

  const { images } = slider;
  const categoriesSubNavbarScroll = useHorizontalScroll();

  // Pagination States
  const productsPerPage = 30;

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
    setTotalPages(Math.ceil(products.length / productsPerPage));
  }, [products]);

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

  const handleMouseEnter = (productId, index) => {
    // Apply hover effect only if the product has more than one image
    if (
      productId &&
      products.find((prod) => prod._id === productId)?.images.length > 1
    ) {
      setHoveredProduct({ id: productId, index });
    }
  };

  const handleMouseLeave = () => {
    setHoveredProduct({ id: null, index: 0 });
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
      setTotalPages(Math.ceil(results.length / productsPerPage));
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
      setTotalPages(Math.ceil(results.length / productsPerPage));
      setLoading(false);
    }, 1000);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="home pag">
      <div className="carousel-container">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={2}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          arrows={true}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
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
                src={`https://api.mhbstore.com/${slide.image}`}
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
                  className={
                    selectedCategory === category.categoryName ? "active" : ""
                  }
                  onClick={() =>
                    handleCategoryFilterChange(category.categoryName)
                  }
                >
                  <img
                    src={`https://api.mhbstore.com/${category.image}`}
                    alt={category.categoryName}
                    className="category-image"
                  />
                </button>
              </div>
            ))}
          </nav>
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
                onMouseEnter={() => {
                  if (product.images.length > 1) {
                    handleMouseEnter(product._id, 1);
                  }
                }}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {product.discount && (
                  <span className="sale-tag">SALE {product.discount}%</span>
                )}
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
                <Link to={`/product-view-details/${product._id}`}>
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? hoveredProduct.id === product._id
                          ? `https://api.mhbstore.com/${
                              product.images[hoveredProduct.index]
                            }`
                          : `https://api.mhbstore.com/${product.images[0]}`
                        : ""
                    }
                    alt={product.productName}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h5 className="product-name">{product.productName}</h5>
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
                      <span> (Review)</span>
                    </div>
                    {product.stock <= 0 && (
                      <div className="out-of-stock">Product out of stock</div>
                    )}
                    <div className="price">
                      <span className="new-price">₨ {product.price}</span>
                      {product.oldPrice && (
                        <span className="old-price">
                          ₨ <del>{product.oldPrice}</del>
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* Show Loader when loading more products */}
        {loading && <Loader />}
      </section>

      <ToastContainer autoClose={500} />
    </div>
  );
};

export default Home;
