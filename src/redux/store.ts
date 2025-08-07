import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "./slices/loginFormSlice";
import registrationFormReducer from "./slices/registrationFormSlice";
import profileFormReducer from "./slices/profileFormSlice";

export const store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
    registrationForm: registrationFormReducer,
    profileForm: profileFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
