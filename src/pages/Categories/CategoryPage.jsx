import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchCategoryById } from "../../app/reducers/categorySlice";
import { fetchSubCategories } from "../../app/reducers/subCategorySlice";
import { fetchAllSmallCategories } from "../../app/reducers/smallCategorySlice";
import { addToFavorites, removeFromFavorites } from "../../app/reducers/favoritesSlice";
import { MdGridOn, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import "../../assets/css/customCategories.css";
import { getAllProducts } from "../../app/reducers/productSlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const [layout, setLayout] = useState(4);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [sortOrder, setSortOrder] = useState("Price, Low To High");
  const [searchQuery, setSearchQuery] = useState("");
  const favorites = useSelector((state) => state.favorites.items);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noProductsMessage, setNoProductsMessage] = useState("");
  const [minValue, setMinValue] = useState(700);
  const [maxValue, setMaxValue] = useState(10000);

  // Redux state
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const isFavorite = (productId) => {
    return Array.isArray(favorites) && favorites.includes(productId);
  };
  const { subcategories, status: subCategoryStatus } = useSelector(
    (state) => state.subCategory
  );
  const { smallCategories } = useSelector((state) => state.smallCategory);

  // Pagination settings
  const pageSize = 20;
  const currentPage = 1;
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, filteredProducts.length);
  const searchFilteredProducts = filteredProducts;

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryById(categoryId));
      dispatch(getAllProducts());
      dispatch(fetchSubCategories());
      dispatch(fetchAllSmallCategories());
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      // If categoryId is selected, filter products by category
      if (categoryId) {
        const filtered = products.filter(
          (product) => product.categoryName === selectedCategory?.categoryName
        );
        setFilteredProducts(filtered);

        if (filtered.length === 0) {
          setNoProductsMessage(
            `No products found in ${selectedCategory?.categoryName} category.`
          );
        } else {
          setNoProductsMessage("");
        }
      } else {
        // Show all products if no category is selected
        setFilteredProducts(products);
      }
    }
  }, [products, categoryId, selectedCategory]);

  useEffect(() => {
    if (filteredProducts.length === 0) {
      setNoProductsMessage(`No products found in the selected category.`);
    } else {
      setNoProductsMessage("");
    }
  }, [filteredProducts, selectedCategory]);

  // Handle small category click to filter products
  const handleSmallCategoryClick = (smallCategoryName) => {
    const filtered = products.filter(
      (product) =>
        product.small_categoryNames === smallCategoryName &&
        product.categoryName === selectedCategory?.categoryName // Filter based on both category and small category
    );

    if (filtered.length === 0) {
      setNoProductsMessage(
        `No products found in the ${smallCategoryName} category.`
      );
    } else {
      setFilteredProducts(filtered);
      setNoProductsMessage(""); // Clear the message if products are found
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const results = products.filter((product) => {
      const productName = product.productName || "";
      return (
        productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (categoryId
          ? product.categoryName === selectedCategory?.categoryName
          : true) // Filter by selected category if categoryId exists
      );
    });
    setFilteredProducts(results);
  };

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Toggle Subcategory visibility
  const toggleSubCategory = (sub_categoryName) => {
    setOpenSubCategory(
      sub_categoryName === openSubCategory ? null : sub_categoryName
    );
  };

  // Handle price range change
  const handlePriceRangeChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === "min") {
      setMinValue(value < maxValue ? value : maxValue - 1);
    } else {
      setMaxValue(value > minValue ? value : minValue + 1);
    }
    filterProductsByPrice(minValue, maxValue);
  };

  // Function to filter products by price range
  const filterProductsByPrice = (minPrice, maxPrice) => {
    const filtered = products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        product.categoryName === selectedCategory?.categoryName // Filter based on both category and price range
    );
    setFilteredProducts(filtered);
    if (filtered.length === 0) {
      setNoProductsMessage(
        `No products available in this price range (₨${minPrice} - ₨${maxPrice}).`
      );
    } else {
      setNoProductsMessage("");
    }
  };

  // Handle layout change (grid/list view)
  const handleLayoutChange = (value) => {
    if (value === "grid") setLayout(5);
    else setLayout(value);
  };

  // Handle adding/removing product to/from favorites
  const handleFavoriteToggle = (product) => {
    if (isFavorite(product._id)) {
      dispatch(removeFromFavorites(product._id));
      toast.info(`${product.productName || "Product"} removed from favorites.`);
    } else {
      dispatch(addToFavorites(product._id));
      toast.success(`${product.productName || "Product"} added to favorites!`);
    }
  };

  return (
    <div>
      <div className="Prduct-banner-container">
        <div className="banner-content">
          <h1>{selectedCategory?.categoryName || "Category"}</h1>
          <p>
            <Link to="/">Home</Link> /{" "}
            {selectedCategory?.categoryName || "Shop"}
          </p>
        </div>
      </div>
      <ToastContainer />
      <div className="product-category-sidebar-container">
        {/* Sidebar */}
        {isSidebarVisible && (
          <div className="sidebar-container slide-in">
            <span className="sidebar-toggle" onClick={toggleSidebar}>
              <AiOutlineMenuFold size={24} className="sidebarRight-icon" />
            </span>
            {/* Filters */}
            <div className="filter-group">
              <h4>{selectedCategory?.categoryName || "Category"} Categories</h4>
              <div className="filter-group">
                {subCategoryStatus === "loading" ? (
                  <div>Loading Subcategories...</div>
                ) : (
                  <div className="filter-category">
                    {subcategories
                      .filter(
                        (sub) =>
                          sub.categoryName === selectedCategory?.categoryName
                      )
                      .map((sub, index) => (
                        <div
                          key={index}
                          className={`filter-category__item ${
                            openSubCategory === sub.sub_categoryName
                              ? "purple-dot"
                              : ""
                          }`}
                        >
                          <div
                            className="filter-category__header"
                            onClick={() =>
                              toggleSubCategory(sub.sub_categoryName)
                            }
                          >
                            <span className="filter-dot"></span>
                            <span className="filter-category__text">
                              {sub.sub_categoryName}
                            </span>
                            <span className="filter-category__icon">
                              {openSubCategory === sub.sub_categoryName
                                ? "−"
                                : "+"}
                            </span>
                          </div>
                          {openSubCategory === sub.sub_categoryName && (
                            <ul className="filter-smallcategory">
                              {smallCategories
                                .filter(
                                  (smallCategory) =>
                                    smallCategory.sub_categoryName ===
                                    sub.sub_categoryName
                                )
                                .map((smallCategory, idx) => {
                                  const smallCategoryNames =
                                    smallCategory.small_categoryNames;

                                  return (
                                    <li
                                      key={idx}
                                      className="filter-smallcategory__item"
                                      onClick={() =>
                                        handleSmallCategoryClick(
                                          smallCategory.small_categoryNames
                                        )
                                      }
                                    >
                                      <span className="dot sub-purple-dot"></span>
                                      {smallCategoryNames}
                                    </li>
                                  );
                                })}
                            </ul>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            {/* Price Range Filter */}
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

        {/* Product Display */}
        <div className="product-container-main">
          {!isSidebarVisible && (
            <div className="sidebar-toggle-button" onClick={toggleSidebar}>
              <AiOutlineMenuUnfold size={24} />
            </div>
          )}

          {/* Product Filter Options */}
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
          <div className={`product-layout ${layout === "product-grid"}`}>
            <div className={`products-container grid-${layout}`}>
              {loading ? (
                <div className="loading">Loading...</div>
              ) : filteredProducts.length === 0 ? (
                <div className="no-products-found">
                  <p>{noProductsMessage || "No products found."}</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`product-cart ${
                      layout === "list" ? "product-list-item" : ""
                    }`}
                  >
                    <Link to={`/product-view-details/${product._id}`}>
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? `http://www.api.mhbstore.com/${
                                product.images[0]
                              }`
                            : ""
                        }
                        alt={product.productName}
                        className="product-image"
                      />
                      <div className="product-info">
                        <h5 className="product-name">
                          {product.productName || "Unnamed Product"}
                        </h5>
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
                        {product.productStock <= 0 && (
                          <div className="out-of-stock">
                            Product out of stock
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="action-buttons">
                      <span
                        className="wishlist-icon"
                        onClick={() => handleFavoriteToggle(product)}
                      >
                        {isFavorite(product._id) ? (
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

export default CategoryPage;
