import React, { useState, useEffect } from "react";
import "../../assets/css/customCategories.css";
import { productData } from "../../data/productData";
import { MdGridOn, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaList, FaStar, FaEye } from "react-icons/fa";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../app/reducers/favoritesSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const WomenPage = () => {
  const menCategoryId = "002";
  const dispatch = useDispatch();
  const [layout, setLayout] = useState(4);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState({ id: null, index: 0 });
  const [hoverInterval, setHoverInterval] = useState(null);
  const [sortOrder, setSortOrder] = useState("Price, Low To High");
  const [minValue, setMinValue] = useState(700);
  const [maxValue, setMaxValue] = useState(10000);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [selectedSmallCategory, setSelectedSmallCategory] = useState("");
  const [searchFilteredProducts, setFilteredProducts] = useState([]);
  const [noProductsMessage, setNoProductsMessage] = useState("");
  const productsPerPage = 12;

  const favorites = useSelector((state) => state.favorites || []);

  const menProducts = productData.products.filter(
    (product) => product.firstLevelCategory === menCategoryId
  );

  const menSubCategories = productData.subCategories.filter(
    (sub) => sub.parentCategory === menCategoryId
  );

  const handleSmallCategoryClick = (smallCategory) => {
    setSelectedSmallCategory((prev) =>
      prev === smallCategory ? "" : smallCategory
    );
  };

  const toggleSubCategory = (subCategoryName) => {
    setOpenSubCategory(
      subCategoryName === openSubCategory ? null : subCategoryName
    );
  };

 

  const handleSearch = (e) => {
    e.preventDefault();
    const results = menProducts.filter(
      (product) =>
        product.productName &&
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results); // Update the filteredProducts state here
  };

  const handleFavoriteToggle = (product) => {
    const isFavorite = favorites.some((id) => id === product.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
      toast.info(`${product.productName} removed from favorites!`);
    } else {
      dispatch(addToFavorites(product.id));
      toast.success(`${product.productName} added to favorites!`);
    }
  };

  const handleColorFilterChange = (color) => {
    setSelectedColor(color === selectedColor ? "" : color);
  };

  const handlePriceRangeChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === "min") {
      setMinValue(value < maxValue ? value : maxValue - 1);
    } else {
      setMaxValue(value > minValue ? value : minValue + 1);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleLayoutChange = (value) => {
    if (value === "grid") setLayout(5);
    else if (value === "list") setLayout("list");
    else setLayout(value);
  };

  const extractUniqueColors = (products) => {
    const colorSet = new Set();
    products.forEach((product) => {
      product.colors?.forEach((color) => colorSet.add(color));
    });
    return Array.from(colorSet);
  };

  const uniqueColors = extractUniqueColors(menProducts);

  const filteredProducts = menProducts
    .filter((product) =>
      selectedColor ? product.colors?.includes(selectedColor) : true
    )
    .filter(
      (product) =>
        product.price >= minValue &&
        product.price <= maxValue &&
        (selectedSmallCategory
          ? product.smallCategoryName === selectedSmallCategory
          : true)
    );

  const handleMouseEnter = (product) => {
    if (product.media.length > 1) {
      let index = 0;
      const interval = setInterval(() => {
        setHoveredProduct((prev) => ({
          id: product.id,
          index: (index + 1) % product.media.length,
        }));
        index++;
      }, 500);
      setHoverInterval(interval);
    }
  };

  const handleMouseLeave = () => {
    clearInterval(hoverInterval);
    setHoveredProduct({ id: null, index: 0 });
  };

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "Price, Low To High") return a.price - b.price;
    if (sortOrder === "Price, High To Low") return b.price - a.price;
    if (sortOrder === "Most Popular") return b.rating - a.rating;
    return 0;
  });

  const startIndex = 0;
  const endIndex = Math.min(productsPerPage, sortedProducts.length);

  // useEffect to update noProductsMessage based on search or filter
  useEffect(() => {
    if (searchFilteredProducts.length === 0 && filteredProducts.length === 0) {
      setNoProductsMessage("No products found matching your search criteria.");
    } else {
      setNoProductsMessage(""); // Clear message if products exist
    }
  }, [searchFilteredProducts, filteredProducts]);

  return (
    <div>
      <div className="Prduct-banner-container">
        <div className="banner-content">
          <h1>Women</h1>
          <p>
            <Link to="/">Home</Link> / Women Shop
          </p>
        </div>
      </div>
      <ToastContainer />
      <div className="product-category-sidebar-container">
        {isSidebarVisible && (
          <div className="sidebar-container slide-in">
            <span className="sidebar-toggle" onClick={toggleSidebar}>
              <AiOutlineMenuFold size={24} className="sidebarRight-icon" />
            </span>
            <div className="filter-group">
              <h4>Women's Categories</h4>
              <div className="filter-category">
                {menSubCategories.map((sub, index) => (
                  <div
                    key={index}
                    className={`filter-category__item ${
                      openSubCategory === sub.subCategoryName
                        ? "purple-dot"
                        : ""
                    }`}
                  >
                    <div
                      className="filter-category__header"
                      onClick={() => toggleSubCategory(sub.subCategoryName)}
                    >
                      <span className="filter-dot "></span>
                      <span className="filter-category__text">
                        {sub.subCategoryName}
                      </span>
                      <span className="filter-category__icon">
                        {openSubCategory === sub.subCategoryName ? "−" : "+"}
                      </span>
                    </div>
                    {openSubCategory === sub.subCategoryName &&
                      sub.smallCategoryName && (
                        <ul className="filter-smallcategory">
                          {sub.smallCategoryName.map((smallCategory, idx) => (
                            <li
                              key={idx}
                              className={`filter-smallcategory__item ${
                                selectedSmallCategory === smallCategory
                                  ? "selected-small-category"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSmallCategoryClick(smallCategory)
                              }
                            >
                              <span className="dot sub-purple-dot"></span>
                              {smallCategory}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
              </div>
            </div>
            {/* Color Filter */}
            <div className="filter-group">
              <h4 className="filter-group__title">Filter by Color</h4>
              <div className="filter-color">
                <span>Select Color</span>
                {uniqueColors.map((color, index) => (
                  <div
                    key={index}
                    className={`color-circle ${
                      selectedColor === color ? "active-color" : ""
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                    onClick={() => handleColorFilterChange(color)}
                  ></div>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h4>Price Range (PKR)</h4>
              <div className="price-slider">
                <div className="input-price-container">
                  <span>Min</span>
                  <input
                    type="number"
                    min="700"
                    max="10000"
                    step="100"
                    value={minValue}
                    onChange={(e) => handlePriceRangeChange(e, "min")}
                    className="price-input"
                  />
                  <span>Max</span>
                  <input
                    type="number"
                    min="700"
                    max="10000"
                    step="100"
                    value={maxValue}
                    onChange={(e) => handlePriceRangeChange(e, "max")}
                    className="price-input"
                  />
                </div>
              </div>

              <div className="price-slider">
                <label>
                  Min Price: ₨{minValue}
                  <input
                    type="range"
                    min="700"
                    max="10000"
                    value={minValue}
                    onChange={(e) => handlePriceRangeChange(e, "min")}
                  />
                </label>
                <label>
                  Max Price: ₨{maxValue}
                  <input
                    type="range"
                    min="700"
                    max="10000"
                    value={maxValue}
                    onChange={(e) => handlePriceRangeChange(e, "max")}
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="product-container-main">
          {!isSidebarVisible && (
            <div className="sidebar-toggle-button" onClick={toggleSidebar}>
              <AiOutlineMenuUnfold size={24} />
            </div>
          )}
          <div className="product-navbar-container">
            <div className="product-filter">
              <div className="product-count-display">
                <span>
                  Show Results {startIndex}-{endIndex} of{" "}
                  {searchFilteredProducts.length || filteredProducts.length}
                </span>
              </div>
              <div className="view-options">
                <span className="view-text">VIEW AS:</span>
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    className="view-option"
                    onClick={() => handleLayoutChange(num)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  className="view-option"
                  onClick={() => handleLayoutChange("grid")}
                >
                  <MdGridOn />
                </button>
                <button
                  className="view-option"
                  onClick={() => handleLayoutChange("list")}
                >
                  <FaList />
                </button>
              </div>
              <div className="sort">
                <span className="sort-text">SORT BY:</span>
                <select
                  className="select-sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="Best Selling">Best Selling</option>
                  <option value="Price, Low To High">Price Low to High</option>
                  <option value="Price, High To Low">Price High to Low</option>
                </select>
              </div>
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
          </div>

          {/* Product List */}
          <div
            className={`product-layout ${
              layout === "list" ? "product-list" : "product-grid"
            }`}
          >
            <div className={`products-container grid-${layout}`}>
              {(searchFilteredProducts.length > 0
                ? searchFilteredProducts
                : filteredProducts
              ).length === 0 ? (
                <div className="no-products-found">
                  <p>{noProductsMessage}</p>
                </div>
              ) : (
                (searchFilteredProducts.length > 0
                  ? searchFilteredProducts
                  : filteredProducts
                ).map((product) => (
                  <div
                    key={product.id}
                    className={`product-cart ${
                      layout === "list" ? "product-list-item" : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(product)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="sale-tag">SALE {product.discount}</span>
                    <img
                      src={
                        hoveredProduct.id === product.id
                          ? product.media[hoveredProduct.index]
                          : product.media[0]
                      }
                      alt={product.productName}
                      className="product-image list-image"
                    />
                    <Link
                      to={`/product-view-details/${product.id}`}
                      className="product-link-views-details"
                    >
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
                      </div>
                    </Link>

                    <div className="action-buttons action-list-btn">
                      <Link
                        to={`/product-view-details/${product.id}`}
                        className="product-preview-link"
                      >
                        <FaEye className="preview-icon" />
                        <span>Preview</span>
                      </Link>
                      <span
                        className="wishlist-icon wishlist-icon-list"
                        onClick={() => handleFavoriteToggle(product)}
                      >
                        {favorites.some((item) => item.id === product.id) ? (
                          <MdFavorite style={{ color: "red" }} />
                        ) : (
                          <MdFavoriteBorder />
                        )}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomenPage;
