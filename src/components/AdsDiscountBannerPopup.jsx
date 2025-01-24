import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdsData } from "../app/reducers/adsCenterSlice";
import "../assets/css/adsDiscountPopup.css";

const AdsDiscountBannerPopup = () => {
  const [showPopup, setShowPopup] = useState(false); // Add the showPopup state here
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const dispatch = useDispatch();
  const { adsData, loading, error } = useSelector((state) => state.adsCenter);

  // Fetch ad data when the component mounts
  useEffect(() => {
    dispatch(fetchAdsData());
  }, [dispatch]);

  useEffect(() => {
    if (adsData) {
      const now = new Date();
      const startDate = new Date(adsData.startDate);
      const endDate = new Date(adsData.endDate);

      // Show popup only if the current time is within the date range and isActive is true
      if (adsData.isActive && now >= startDate && now <= endDate) {
        setShowPopup(true); // Ensure popup is visible when data is valid
        updateTimeLeft(endDate);
      }

      // Timer to update the countdown every second
      const timer = setInterval(() => {
        if (adsData.isActive) {
          updateTimeLeft(endDate);
        }
      }, 1000);

      return () => clearInterval(timer); // Cleanup the timer on component unmount
    }
  }, [adsData]);

  const updateTimeLeft = (endDate) => {
    const now = new Date();
    const difference = endDate - now;

    if (difference <= 0) {
      setIsExpired(true); // Set expired state when the countdown ends
      setTimeLeft("Ad has expired");
      setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
    } else {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    adsData && showPopup && ( // Only render popup when showPopup is true
      <div className="ads-discount-popup">
        {/* Background image */}
        <img
          src={adsData.image}
          alt={adsData.title}
          className="ads-discount-popup__background"
        />

        {/* Popup content */}
        <div className="ads-discount-popup__content">
          <h2 className="ads-discount-popup__title">{adsData.title}</h2>
          <p className="ads-discount-popup__description">
            {isExpired ? "This discount has expired." : adsData.description}
          </p>
          <p className="ads-discount-popup__time-left">
            {isExpired ? "" : `Time left: ${timeLeft}`}
          </p>

          {/* Close button */}
          <button
            className="ads-discount-popup__close-button"
            onClick={() => setShowPopup(false)} // Close popup on click
          >
            <IoMdClose size={24} />
          </button>
        </div>
      </div>
    )
  );
};

export default AdsDiscountBannerPopup;
