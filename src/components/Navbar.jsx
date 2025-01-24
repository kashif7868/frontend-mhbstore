import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import mhbLogo from "../assets/images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaBars, FaTimes, FaHome } from "react-icons/fa";
import pakistanIcon from "../assets/icons/pakistan.png";
import useScrollTrigger from "../hooks/useScrollTrigger";
import "../assets/css/navbar.css";
import { FcHome } from "react-icons/fc";
import { toast } from "react-toastify";
import { HiOutlineUserCircle } from "react-icons/hi2";
import PearlsIcon from "../assets/icons/peeral.png";
import { BiCoinStack } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import { LiaCartPlusSolid } from "react-icons/lia";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchCategories,
  fetchCategoryById,
} from "../app/reducers/categorySlice";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const categories = useSelector((state) => state.category?.categories || []);
  const categoryStatus = useSelector(
    (state) => state.category?.status || "idle"
  );
  const cart = useSelector((state) => state.cart?.cart || []);
  const favorites = useSelector((state) => state.favorites || []);
  const pearlsCoins = useSelector((state) => state.user?.pearls || 0);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const favoriteCount = favorites.length;
  const scrollDirection = useScrollTrigger();

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchCategories()).catch((error) => console.error(error));
    }
  }, [categoryStatus, dispatch]);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // toggles the 'active' state
  };

  const handleProfileMenuToggle = () =>
    setIsProfileMenuOpen(!isProfileMenuOpen);
  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out!");
    navigate("/signIn");
  };
  const handleCartClick = () => navigate("/cart");
  const handleCategoryClick = async (categoryId) => {
    try {
      await dispatch(fetchCategoryById(categoryId));
      navigate(`/category/${categoryId}`);
    } catch (error) {
      console.error("Failed to fetch category:", error);
    }
  };

  return (
    <>
      <header
        className={`header-container ${
          scrollDirection === "down" ? "hide" : "show"
        }`}
      >
        <div className="logo">
          <Link to="/">
            <img src={mhbLogo} alt="MHB Store Logo" />
          </Link>
        </div>

        <div className="right-icons">
          <div className="locations-container">
            <img src={pakistanIcon} alt="Pakistan Flag" className="flag-icon" />
          </div>

          {/* Pearls Section for User */}
          {user?.id && (
            <div className="pearls-container">
              <span className="pearls-count">{pearlsCoins}</span>
              <img src={PearlsIcon} alt="pearls" className="pearls-icon" />
            </div>
          )}

          {/* Wish List Section */}
          <div className="fav-prodect-list-container">
            <Link to="/favourit-list" className="fav-link">
              {favoriteCount > 0 && (
                <span className="favorite-badge-dot">{favoriteCount}</span>
              )}
              <MdOutlineFavoriteBorder className="fav-icon" />
              <span>Wish List</span>
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="cart-icon-wrapper">
            <FaCartShopping className="icon" onClick={handleCartClick} />
            {cartCount > 0 && (
              <span className="cart-badge-dot">{cartCount}</span>
            )}
          </div>

          {/* User Profile Section */}
          {user ? (
            <div className="profile-container">
              <div className="profile-info" onClick={handleProfileMenuToggle}>
                {user.image ? (
                  <img
                    src={`http://www.api.mhbstore.com/${user.image}`} // Use the uploaded image
                    alt={user.fullName || "User"}
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-avatar">
                    {user?.fullName ? user.fullName.charAt(0) : "U"}
                  </div>
                )}
                <span>{user?.fullName || "Guest"}</span>
              </div>
              {isProfileMenuOpen && (
                <ul className="profile-menu">
                  <li className="profile-menu-item">
                    <Link to="/my-account">
                      <HiOutlineUserCircle className="profile-menu-icon" />
                      My Account
                    </Link>
                  </li>
                  <li className="profile-menu-item">
                    <Link to="/pearls">
                      <BiCoinStack className="profile-menu-icon" />
                      My Pearls
                    </Link>
                  </li>
                  <li className="profile-menu-item">
                    <span onClick={handleLogout} className="logout-btn">
                      Logout <CiLogout className="logout-icon" />
                    </span>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="profile-container">
              <Link to="/signIn" className="signIn-signUp-btn">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Navbar with Hamburger */}
      <nav className={`navbar-container ${isOpen ? "active" : ""}`}>
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          {isOpen ? (
            <FaTimes className="close-manu-icon" />
          ) : (
            <FaBars className="manu-open-icon" />
          )}
        </div>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li className="category-item-list">
            <Link to="/">
              <FcHome className="home-link-icon" />
              <span className="home-link-text"> Home</span>
            </Link>
          </li>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="category-item-list">
                <div className="category-item-container">
                  <button
                    className="category-link-btn"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <span className="category-name">
                      {category.categoryName}
                    </span>
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </nav>

      {/* Mobile Navbar with Bottom Icons */}
      <div className={`mobile-navbar ${isOpen ? "open" : ""}`}>
        <div className="mobile-nav-item" onClick={() => navigate("/")}>
          <FaHome />
          <span>Home</span>
        </div>
        <div className="mobile-nav-item">
          {cartCount > 0 && <span className="cart-badge-dot">{cartCount}</span>}
          <LiaCartPlusSolid className="icon" onClick={handleCartClick} />
          <span>Cart</span>
        </div>
        <div
          className="mobile-nav-item"
          onClick={() => navigate("/favourit-list")}
        >
          {favoriteCount > 0 && (
            <span className="favorite-badge-dot">{favoriteCount}</span>
          )}
          <MdOutlineFavoriteBorder />
          <span>Wish List</span>
        </div>

        <div className="mobile-nav-item" onClick={() => navigate("/peerals")}>
          <BiCoinStack />
          <span>My Peerals</span>
        </div>
        <div className="mobile-nav-item" onClick={handleProfileMenuToggle}>
          <HiOutlineUserCircle />
          <span>Profile</span>
          {isProfileMenuOpen && (
            <div className="profile-dropdown">
              {user ? (
                <>
                  <span className="profile-name">
                    {user.fullName || "User"}
                  </span>
                  <Link to="/my-account" className="profile-link">
                    <FaUserCircle className="profile-icon" />
                    My Account
                  </Link>
                  <span className="logout-btn" onClick={handleLogout}>
                    <CiLogout className="logout-icon" />
                    Logout
                  </span>
                </>
              ) : (
                <Link to="/signIn" className="profile-link">
                  <FaUserCircle className="profile-icon" />
                  Sign In
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
