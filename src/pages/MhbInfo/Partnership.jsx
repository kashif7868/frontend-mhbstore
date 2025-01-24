import React from "react";
import "../../assets/css/mhbStore/partnership.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  submitPartnerForm,
} from "../../app/reducers/partnerSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaImage } from "react-icons/fa6"; // Partner image icon
import { LuImagePlus } from "react-icons/lu";
import { FcRemoveImage } from "react-icons/fc";

const Partnership = () => {
  const dispatch = useDispatch();
  const { formData, loading, success, error } = useSelector(
    (state) => state.partners
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "partnerImage" && files.length > 0) {
      dispatch(setFormData({ partnerImage: files[0] }));
    } else if (name === "productImages" && files.length > 0) {
      const newProductImages = [...formData.productImages, ...files];
      dispatch(setFormData({ productImages: newProductImages }));
    } else {
      dispatch(setFormData({ [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitPartnerForm(formData));
  };

  // Toast notifications for success and error
  React.useEffect(() => {
    if (success) {
      toast.success(
        "Partner request submitted successfully! We will contact you within 24 hours."
      );
    }
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [success, error]);

  // Display image previews for product images
  const renderProductImagePreviews = () => {
    return formData.productImages && formData.productImages.length > 0
      ? formData.productImages.map((file, index) => (
          <div key={index} className="product-image-preview">
            <img
              src={URL.createObjectURL(file)}
              alt={`Product ${index + 1}`}
              className="product-preview-img"
            />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => removeImage(index)}
            >
              <FcRemoveImage />
            </button>
          </div>
        ))
      : null;
  };

  const renderPartnerImagePreview = () => {
    return formData.partnerImage ? (
      <div className="partner-image-preview">
        <img
          src={URL.createObjectURL(formData.partnerImage)}
          alt="Partner Preview"
          className="partner-preview-img"
        />
        <button
          type="button"
          className="remove-image-btn"
          onClick={() => removePartnerImage()}
        >
          <FcRemoveImage />
        </button>
      </div>
    ) : null;
  };

  const removeImage = (index) => {
    const updatedImages = formData.productImages.filter((_, i) => i !== index);
    dispatch(setFormData({ productImages: updatedImages }));
  };

  const removePartnerImage = () => {
    dispatch(setFormData({ partnerImage: null }));
  };

  return (
    <div className="partnership-container">
      <ToastContainer autoClose={1500} />
      <div className="partnership-banner">
        <h1>Partnership</h1>
      </div>
      <div className="partnership-content">
        <div className="how-to-partner">
          <h2>How to Become Our Partner</h2>
          <p>
            Becoming a partner with MHB Store is easy! Just follow these simple
            steps to get started:
          </p>
          <ul>
            <li>Step 1: Fill out the partner details form on the right.</li>
            <li>
              Step 2: Provide information about your company and products.
            </li>
            <li>
              Step 3: Our team will review your details and get in touch with
              you.
            </li>
            <li>
              Step 4: Start collaborating with MHB Store and grow together!
            </li>
          </ul>
        </div>
        <div className="partner-form-container">
          <h2>Partner Registration Form</h2>
          <form onSubmit={handleSubmit} className="partner-form">
            <div className="partner-image-upload-container">
              <input
                type="file"
                name="partnerImage"
                id="partnerImage"
                onChange={handleChange}
                required
                className="file-upload-input"
              />
              <label htmlFor="partnerImage" className="file-upload-label">
                <FaImage /> Upload Partner Image
              </label>
              {renderPartnerImagePreview()}
            </div>

            <div className="form-field">
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />
              <label htmlFor="name" className="input-label">
                Partner Name
              </label>
            </div>

            <div className="form-field">
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                required
                className="input-field"
              />
              <label htmlFor="phone" className="input-label">
                Phone Number
              </label>
            </div>

            <div className="form-field">
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
            </div>

            <div className="form-field">
              <textarea
                name="address"
                id="address"
                placeholder=" "
                value={formData.address}
                onChange={handleChange}
                required
                className="textarea-field"
              />
              <label htmlFor="address" className="input-label">
                Partner Address
              </label>
            </div>

            <div className="form-field">
              <input
                type="text"
                name="productName"
                id="productName"
                placeholder=" "
                value={formData.productName}
                onChange={handleChange}
                required
                className="input-field"
              />
              <label htmlFor="productName" className="input-label">
                Product Name
              </label>
            </div>

            <div className="form-field">
              <textarea
                name="productDetails"
                id="productDetails"
                placeholder=" "
                value={formData.productDetails}
                onChange={handleChange}
                required
                className="textarea-field"
              />
              <label htmlFor="productDetails" className="input-label">
                Product Details
              </label>
            </div>

            <div className="form-field">
              <input
                type="number"
                name="productStock"
                id="productStock"
                placeholder=" "
                value={formData.productStock}
                onChange={handleChange}
                required
                className="input-field"
              />
              <label htmlFor="productStock" className="input-label">
                Product Stock
              </label>
            </div>

            <div className="product-image-upload-section">
              <input
                type="file"
                name="productImages"
                id="productImages"
                multiple
                onChange={handleChange}
                className="file-upload-input"
              />
              <label htmlFor="productImages" className="file-upload-label">
                <LuImagePlus /> Upload Product Images
              </label>
              <div className="product-image-previews">
                {renderProductImagePreviews()}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="submit-partner-btn"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
