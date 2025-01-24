import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to submit partner form data
export const submitPartnerForm = createAsyncThunk(
  "partners/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("partnerImage", formData.partnerImage);
      formDataToSend.append("partnerName", formData.name);
      formDataToSend.append("partnerPhoneNumber", formData.phone);
      formDataToSend.append("partnerEmail", formData.email);
      formDataToSend.append("partnerAddress", formData.address);
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productDetails", formData.productDetails);
      formDataToSend.append("productStock", formData.productStock);

      // Append product images as individual file objects
      formData.productImages.forEach((file) => {
        formDataToSend.append("productImages", file);
      });

      const response = await fetch("https://api.mhbstore.com/api/partners", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const partnerSlice = createSlice({
  name: "partners",
  initialState: {
    formData: {
      partnerImage: null,
      name: "",
      phone: "",
      email: "",
      address: "",
      productName: "",
      productDetails: "",
      productStock: 0,
      productImages: [],
    },
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPartnerForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitPartnerForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = null;
      })
      .addCase(submitPartnerForm.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        state.error = action.payload;
      });
  },
});

export const { setFormData } = partnerSlice.actions;
export default partnerSlice.reducer;
