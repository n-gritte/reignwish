import { configureStore } from "@reduxjs/toolkit";
import { userSlice} from "./userSlice"
import { eventSlice } from "./eventSlice";
import { endSlice } from "./endSlice";
import { characterSlice } from "./characterSlice";
import { localStorageMiddleware } from "./Middlewares/localStorageMiddleware";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    characters: characterSlice.reducer,
    events: eventSlice.reducer,
    ends: endSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: JSON.parse(localStorage.getItem("reign_maison_react")) ? JSON.parse(localStorage.getItem("reign_maison_react")) : {},
});

export default store;