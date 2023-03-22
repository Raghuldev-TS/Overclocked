import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer";

export default configureStore({
  reducer: {
    users: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
