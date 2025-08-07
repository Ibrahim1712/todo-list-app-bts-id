import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ValidationError {
  field: string;
  message: string;
}

export interface RegistrationFormState {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  errors: ValidationError[];
  isValid: boolean;
  touched: {
    email: boolean;
    first_name: boolean;
    last_name: boolean;
    password: boolean;
    confirm_password: boolean;
  };
}

const initialState: RegistrationFormState = {
  email: "",
  username: "",
  password: "",
  confirm_password: "",
  errors: [],
  isValid: false,
  touched: {
    email: false,
    first_name: false,
    last_name: false,
    password: false,
    confirm_password: false,
  },
};

// Validation functions
const validateEmail = (email: string): string | null => {
  if (!email) return "Email harus diisi";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Tolong masukkan email yang valid";
  return null;
};

const validateUsername = (username: string): string | null => {
  if (!username) return "Username harus diisi";
  if (username.length < 2)
    return "Username harus terdiri dari minimal 2 karakter";
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return "Kata sandi harus diisi";
  if (password.length < 8)
    return "Kata sandi harus terdiri dari minimal 8 karakter";
  return null;
};

const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) return "Tolong konfirmasi kata sandi Anda";
  if (password !== confirmPassword) return "Kata sandi tidak cocok";
  return null;
};

const validateForm = (
  email: string,
  username: string,
  password: string,
  confirmPassword: string
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) {
    errors.push({ field: "email", message: emailError });
  }

  const usernameError = validateUsername(username);
  if (usernameError) {
    errors.push({ field: "username", message: usernameError });
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.push({ field: "password", message: passwordError });
  }

  const confirmPasswordError = validateConfirmPassword(
    password,
    confirmPassword
  );
  if (confirmPasswordError) {
    errors.push({ field: "confirm_password", message: confirmPasswordError });
  }

  return errors;
};

const registrationFormSlice = createSlice({
  name: "registrationForm",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.errors = validateForm(
        state.email,
        state.username,
        state.password,
        state.confirm_password
      );
      state.isValid = state.errors.length === 0;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.errors = validateForm(
        state.email,
        state.username,
        state.password,
        state.confirm_password
      );
      state.isValid = state.errors.length === 0;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.errors = validateForm(
        state.email,
        state.username,
        state.password,
        state.confirm_password
      );
      state.isValid = state.errors.length === 0;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirm_password = action.payload;
      state.errors = validateForm(
        state.email,
        state.username,
        state.password,
        state.confirm_password
      );
      state.isValid = state.errors.length === 0;
    },
    setFieldTouched: (
      state,
      action: PayloadAction<keyof RegistrationFormState["touched"]>
    ) => {
      state.touched[action.payload] = true;
    },
    validateAllFields: (state) => {
      state.touched.email = true;
      state.touched.first_name = true;
      state.touched.last_name = true;
      state.touched.password = true;
      state.touched.confirm_password = true;
      state.errors = validateForm(
        state.email,
        state.username,
        state.password,
        state.confirm_password
      );
      state.isValid = state.errors.length === 0;
    },
    resetForm: (state) => {
      state.email = "";
      state.username = "";
      state.password = "";
      state.confirm_password = "";
      state.errors = [];
      state.isValid = false;
      state.touched = {
        email: false,
        first_name: false,
        last_name: false,
        password: false,
        confirm_password: false,
      };
    },
    setFormData: (
      state,
      action: PayloadAction<{
        email: string;
        username: string;
        password: string;
        confirm_password: string;
      }>
    ) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.confirm_password = action.payload.confirm_password;
      state.errors = validateForm(
        state.email,
        state.username,
        state.password,
        state.confirm_password
      );
      state.isValid = state.errors.length === 0;
    },
  },
});

export const {
  setEmail,
  setUsername,
  setPassword,
  setConfirmPassword,
  setFieldTouched,
  validateAllFields,
  resetForm,
  setFormData,
} = registrationFormSlice.actions;

export default registrationFormSlice.reducer;
