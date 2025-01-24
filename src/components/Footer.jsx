import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive"; // For responsive behavior
import { motion } from "framer-motion"; // For animations
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom for routing
import "../assets/css/footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import {
  easypaisaImage,
  jazzcashImage,
  mastercardImage,
  visacardImage,
  meezanbankImage,
  bankalfalahImage,
} from "../assets/images/images";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../app/reducers/categorySlice"; // Action to fetch categories
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false); // State to handle collapsible company section
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // State to handle collapsible categories section
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.category?.categories || []);

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories on mount
  }, [dispatch]);

  const toggleSection = (section) => {
    if (section === "getInTouch") setIsGetInTouchOpen(!isGetInTouchOpen);
    if (section === "categories") setIsCategoryOpen(!isCategoryOpen); // Fixed here
    if (section === "company") setIsCompanyOpen(!isCompanyOpen); // Toggle company section
    if (section === "payment") setIsPaymentOpen(!isPaymentOpen);
  };

  return (
    <div className="footer">
      <motion.footer
        className="footer-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >

        {/* Footer Links Section */}
        <motion.div
          className="footer-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Category Section */}
          {isMobile ? (
            <motion.div
              className={`footer-column mobile-version ${
                isCategoryOpen ? "open" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                className="footer-header"
                onClick={() => toggleSection("categories")}
                whileHover={{ scale: 1.1 }}
              >
                <h4>Categories</h4>
                <span>{isCategoryOpen ? "-" : "+"}</span>
              </motion.div>
              {isCategoryOpen && (
                <motion.div
                  className="footer-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <ul className="footer-category-list">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <motion.li
                          key={category.id}
                          className="footer-category-item"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <button
                            className="footer-category-link-btn"
                            onClick={() => navigate(`/category/${category.id}`)}
                          >
                            <span className="footer-category-name">
                              {category.categoryName}
                            </span>
                          </button>
                        </motion.li>
                      ))
                    ) : (
                      <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        Loading...
                      </motion.li>
                    )}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="footer-column"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h4>Categories</h4>
              <ul className="footer-category-list">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <motion.li
                      key={category.id}
                      className="footer-category-item"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <button
                        className="footer-category-link-btn"
                        onClick={() => navigate(`/category/${category.id}`)}
                      >
                        <span className="footer-category-name">
                          {category.categoryName}
                        </span>
                      </button>
                    </motion.li>
                  ))
                ) : (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    Loading...
                  </motion.li>
                )}
              </ul>
            </motion.div>
          )}

          {/* Company Section */}
          {isMobile ? (
            <motion.div
              className={`footer-column mobile-version ${
                isCompanyOpen ? "open" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.div
                className="footer-header"
                onClick={() => toggleSection("company")}
                whileHover={{ scale: 1.1 }}
              >
                <h4>Company</h4>
                <span>{isCompanyOpen ? "-" : "+"}</span>
              </motion.div>
              {isCompanyOpen && (
                <motion.div
                  className="footer-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <ul>
                    <li>
                      <Link to="/delivery">Delivery</Link>
                    </li>
                    <li>
                      <Link to="/certifications">Certifications</Link>
                    </li>
                    <li>
                      <Link to="/partnership">Become a Partner</Link>
                    </li>
                    <li>
                      <Link to="/terms-conditions">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link to="/secure-payment">Secure Payment</Link>
                    </li>
                    <li>
                      <Link to="/return-policy">Return Policy</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="footer-column"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="/delivery">Delivery</Link>
                </li>
                <li>
                  <Link to="/certifications">Certifications</Link>
                </li>
                <li>
                  <Link to="/partnership">Become a Partner</Link>
                </li>
                <li>
                  <Link to="/terms-conditions">Terms & Conditions</Link>
                </li>
                <li>
                  <Link to="/secure-payment">Secure Payment</Link>
                </li>
                <li>
                  <Link to="/return-policy">Return Policy</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </motion.div>
          )}

          {/* Get In Touch Section */}
          {isMobile ? (
            <motion.div
              className={`footer-column mobile-version ${
                isGetInTouchOpen ? "open" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.div
                className="footer-header"
                onClick={() => toggleSection("getInTouch")}
                whileHover={{ scale: 1.1 }}
              >
                <h4>GET IN TOUCH</h4>
                <span>{isGetInTouchOpen ? "-" : "+"}</span>
              </motion.div>
              {isGetInTouchOpen && (
                <motion.div
                  className="footer-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <p>
                    <MdLocationOn /> Al-Latif Center, Gulberg, Lahore.
                  </p>
                  <p>
                    <MdPhone />{" "}
                    <Link to="tel:+92300-4233378">+92300-4233378</Link>
                  </p>
                  <p>
                    <MdEmail />{" "}
                    <a href="mailto:info@mhbstore.com">info@mhbstore.com</a>
                  </p>

                  <div className="social-links">
                    <Link
                      to="https://www.facebook.com/profile.php?id=61566316956196"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="social-icons" />
                    </Link>
                    <Link
                      to="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter  className="social-icons"/>
                    </Link>
                    <Link
                      to="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="social-icons"/>
                    </Link>
                    <Link
                      to="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="social-icons"/>
                    </Link>
                    <Link
                      to="https://wa.me/923004233378"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="social-icons" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="footer-column"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <h4>GET IN TOUCH</h4>
              <p>
                <MdLocationOn /> Al-Latif Center, Gulberg, Lahore.
              </p>
              <p>
                <MdPhone /> <Link to="tel:+92300-4233378">+92300-4233378</Link>
              </p>
              <p>
                <MdEmail />{" "}
                <a href="mailto:info@mhbstore.com">info@mhbstore.com</a>
              </p>

              <div className="social-links">
                <Link
                  to="https://www.facebook.com/profile.php?id=61566316956196"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook  className="social-icons"/>
                </Link>
                <Link
                  to="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="social-icons" />
                </Link>
                <Link
                  to="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="social-icons"/>
                </Link>
                <Link
                  to="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="social-icons" />
                </Link>
                <Link
                  to="https://wa.me/923004233378"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp  className="social-icons"/>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Payment Options Section */}
          {isMobile ? (
            <motion.div
              className={`footer-column mobile-version ${
                isPaymentOpen ? "open" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <motion.div
                className="footer-header"
                onClick={() => toggleSection("payment")}
                whileHover={{ scale: 1.1 }}
              >
                <h4>WE ACCEPT</h4>
                <span>{isPaymentOpen ? "-" : "+"}</span>
              </motion.div>
              {isPaymentOpen && (
                <motion.div
                  className="footer-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="payment-icons">
                    <img src={easypaisaImage} alt="Easypaisa" />
                    <img src={jazzcashImage} alt="JazzCash" />
                    <img src={mastercardImage} alt="Mastercard" />
                    <img src={visacardImage} alt="Visa" />
                    <img src={meezanbankImage} alt="Meezan Bank" />
                    <img src={bankalfalahImage} alt="Bank Alfalah" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="footer-column"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <h4>WE ACCEPT</h4>
              <div className="payment-icons">
                <img src={easypaisaImage} alt="Easypaisa" />
                <img src={jazzcashImage} alt="JazzCash" />
                <img src={mastercardImage} alt="Mastercard" />
                <img src={visacardImage} alt="Visa" />
                <img src={meezanbankImage} alt="Meezan Bank" />
                <img src={bankalfalahImage} alt="Bank Alfalah" />
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="footer-copyright"
        >
          Copyright © 2024 MHB Store all rights reserved.
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default Footer;
