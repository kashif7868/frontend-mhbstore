import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT_QTY, DECREMENT_QTY, CLEAR_CART } from '../actions/actionsCart';

// Initial state with an empty cart
const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the product already exists in the cart with the same size
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
      );

      if (existingItemIndex !== -1) {
        // If product already exists, increase quantity and update total
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                qty: item.qty + action.payload.qty,
                total: (item.qty + action.payload.qty) * item.price,
              }
            : item
        );
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        // If the product doesn't exist, add it to the cart
        const newProduct = {
          ...action.payload,
          qty: action.payload.qty,
          total: action.payload.qty * action.payload.price,
        };
        return {
          ...state,
          cart: [...state.cart, newProduct],
        };
      }

    case REMOVE_FROM_CART:
      // Remove the product from the cart
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload.productId || item.selectedSize !== action.payload.selectedSize
      );
      return {
        ...state,
        cart: filteredCart,
      };

    case INCREMENT_QTY:
      // Increment quantity of the product in the cart
      const incrementedCart = state.cart.map((item) =>
        item.id === action.payload.productId && item.selectedSize === action.payload.selectedSize
          ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price }
          : item
      );
      return {
        ...state,
        cart: incrementedCart,
      };

    case DECREMENT_QTY:
      // Decrement quantity of the product in the cart
      const decrementedCart = state.cart.map((item) =>
        item.id === action.payload.productId && item.selectedSize === action.payload.selectedSize && item.qty > 1
          ? { ...item, qty: item.qty - 1, total: (item.qty - 1) * item.price }
          : item
      );
      return {
        ...state,
        cart: decrementedCart,
      };

    case CLEAR_CART:
      // Clear all items in the cart
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
