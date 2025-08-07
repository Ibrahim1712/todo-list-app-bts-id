import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ValidationError {
  field: string;
  message: string;
}

export interface LoginFormState {
  username: string;
  password: string;
  errors: ValidationError[];
  isValid: boolean;
  touched: {
    username: boolean;
    password: boolean;
  };
}

const initialState: LoginFormState = {
  username: "",
  password: "",
  errors: [],
  isValid: false,
  touched: {
    username: false,
    password: false,
  },
};

const validateUsername = (username: string): string | null => {
  if (!username) return "Username harus diisi";
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return "Tolong masukkan kata sandi";
  if (password.length < 8)
    return "Password harus terdiri dari minimal 8 karakter";
  return null;
};

const validateForm = (
  username: string,
  password: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const usernameError = validateUsername(username);
  if (usernameError) {
    errors.push({ field: "username", message: usernameError });
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.push({ field: "password", message: passwordError });
  }

  return errors;
};

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.errors = validateForm(state.username, state.password);
      state.isValid = state.errors.length === 0;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.errors = validateForm(state.username, state.password);
      state.isValid = state.errors.length === 0;
    },
    setFieldTouched: (
      state,
      action: PayloadAction<keyof LoginFormState["touched"]>
    ) => {
      state.touched[action.payload] = true;
    },
    validateAllFields: (state) => {
      state.touched.username = true;
      state.touched.password = true;
      state.errors = validateForm(state.username, state.password);
      state.isValid = state.errors.length === 0;
    },
    resetForm: (state) => {
      state.username = "";
      state.password = "";
      state.errors = [];
      state.isValid = false;
      state.touched = {
        username: false,
        password: false,
      };
    },
    setFormData: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.errors = validateForm(state.username, state.password);
      state.isValid = state.errors.length === 0;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setFieldTouched,
  validateAllFields,
  resetForm,
  setFormData,
} = loginFormSlice.actions;

export default loginFormSlice.reducer;
