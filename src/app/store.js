import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../app/reducers/cartSlice";
import favoritesReducer from "./reducers/favoritesSlice";
import userSlice from "../app/reducers/userPearlsSlice";
import sliderReducer from "./reducers/sliderSlice";
import certificationsReducer from "./reducers/cartificationsSlice";
import partnersReducer from "./reducers/partnerSlice";
import notificationReducer from "./reducers/notificationSlice";
import adsCenterReducer from "./reducers/adsCenterSlice";
import categoryReducer from "./reducers/categorySlice";
import subCategoryReducer from "./reducers/subCategorySlice";
import smallCetgoryReducer from "./reducers/smallCategorySlice";
import orderReducer from "./reducers/orderSlice";
import productReducer from "./reducers/productSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    user: userSlice,
    slider: sliderReducer,
    certifications: certificationsReducer,
    partners: partnersReducer,
    notification: notificationReducer,
    adsCenter: adsCenterReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    smallCategory: smallCetgoryReducer,
    order: orderReducer,
    product: productReducer,
  },
});

export default store;
