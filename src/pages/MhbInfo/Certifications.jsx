import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCertifications } from "../../app/reducers/cartificationsSlice";
import "../../assets/css/mhbStore/certifications.css";

const Certifications = () => {
  const dispatch = useDispatch();
  const { certifications, loading, error } = useSelector((state) => state.certifications);

  useEffect(() => {
    dispatch(fetchCertifications());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading certifications: {error}</p>;
  }

  return (
    <div className="certifications-container">
      <div className="certifications-banner">
        <h1 className="certifications-title">Our Certifications</h1>
      </div>
      <div className="cr-contant-container">
        <p className="certifications-description">
          At MHB Store, we pride ourselves on providing top-quality products
          that are certified to meet the highest standards. Here are some of the
          certifications that validate our commitment to excellence.
        </p>
      </div>
      <div className="certification-list">
        {certifications.map((cert, index) => (
          <div className="certification-card" key={index}>
            <img
              src={`https://api.mhbstore.com/${cert.image}`}
              alt={cert.name}
              className="certification-image"
            />
            <h2 className="certification-name">{cert.name}</h2>
            <p className="certification-detail">{cert.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
