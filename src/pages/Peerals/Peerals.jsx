import React, { useEffect, useState } from "react";
import PeeralsIcon from "../../assets/images/peeral.png";
import { FaGift, FaShoppingCart, FaPercentage } from "react-icons/fa";
import "../../assets/css/peerals.css";
import { useAuth } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPeerals, addSignUpBonus, addShoppingBonus, redeemPeerals } from "../../app/reducers/userPearlsSlice";

const Peerals = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const peerals = useSelector((state) => state.user.pearls);
  const [loading, setLoading] = useState(true); // Loading state for peerals fetch
  const [error, setError] = useState(null); // Error state for fetch failures
  const rupees = peerals;

  // Use effect to fetch user peerals
  useEffect(() => {
    if (user) {
      // Fetch user peerals from the API
      dispatch(fetchUserPeerals(user._id))
        .then(() => setLoading(false))
        .catch((error) => {
          setError("Failed to load peerals. Please try again later.");
          setLoading(false);
        });
    }
  }, [user, dispatch]);

  const handleSignUpBonus = () => {
    if (user) {
      dispatch(addSignUpBonus(user._id)); // Apply Sign-Up Bonus
    }
  };

  const handleShoppingBonus = (amount) => {
    if (user) {
      dispatch(addShoppingBonus({ userId: user._id, spentAmount: amount })); // Apply Shopping Bonus
    }
  };

  const handleRedeemPeerals = (amount) => {
    if (user) {
      dispatch(redeemPeerals({ userId: user._id, redeemAmount: amount })); // Redeem Peerals
    }
  };

  return (
    <div className="peerals-page">
      {/* Peerals Balance Section */}
      <div className="peerals-balance">
        <div className="balance-box">
          <div className="balance-header">
            <span className="balance-title">My Peerals</span>
            <span className="balance-dropdown">▼</span>
          </div>

          {loading ? (
            <div className="balance-values">
              <div className="loading-message">Loading your peerals...</div>
            </div>
          ) : error ? (
            <div className="balance-values">
              <div className="error-message">{error}</div>
            </div>
          ) : (
            <div className="balance-values">
              <div className="balance-coins">
                <img src={PeeralsIcon} alt="Peerals Icon" className="balance-icon" />
                {peerals} {/* Display peerals balance from Redux */}
              </div>
              <div className="balance-saves">saves: Rs. {rupees}</div>
            </div>
          )}
        </div>
      </div>

      {/* Peerals Header */}
      <div className="peerals-header">
        <h1 className="peerals-title">Peerals</h1>
        <p className="peerals-subtitle">Collect, shop and save</p>
      </div>

      {/* Peerals Rewards Section */}
      <div className="peerals-rewards">
        <h1 className="rewards-title">Peerals Rewards System</h1>

        <div className="reward-item" onClick={handleSignUpBonus}>
          <FaGift className="reward-icon" />
          <p>
            <strong>Sign-Up Bonus:</strong> Get <strong>200 peerals</strong> instantly when you sign up!
          </p>
        </div>

        <div className="reward-item" onClick={() => handleShoppingBonus(1000)}>
          <FaShoppingCart className="reward-icon" />
          <p>
            <strong>Shopping Bonus:</strong> For every Rs.100 spent, you earn <strong>5 peerals</strong> (5% of your total amount).
          </p>
        </div>

        <div className="reward-item" onClick={() => handleRedeemPeerals(50)}>
          <FaPercentage className="reward-icon" />
          <p>
            Use peerals to get discounts on future purchases. Redeem <strong>50 peerals</strong> for a discount!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Peerals;
