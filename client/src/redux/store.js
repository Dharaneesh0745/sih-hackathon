import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { employerReducer } from "./reducers/employer";
// import { productReducer } from "./reducers/product";
// import { eventReducer } from "./reducers/event";
// import { cartReducer } from "./reducers/cart";
// import { wishlistReducer } from "./reducers/wishlist";
// import { orderReducer } from "./reducers/order";

const Store = configureStore({
  reducer: {
    user: userReducer,
    employer: employerReducer,
    // products: productReducer,
    // events: eventReducer,
    // cart: cartReducer,
    // wishlist: wishlistReducer,
    // order: orderReducer,
  },
});

export default Store;
