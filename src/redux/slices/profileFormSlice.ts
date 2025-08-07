import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ValidationError {
  field: string;
  message: string;
}

export interface ProfileFormState {
  firstName: string;
  lastName: string;
  errors: ValidationError[];
  isValid: boolean;
  touched: {
    firstName: boolean;
    lastName: boolean;
  };
  isEditing: boolean;
}

const initialState: ProfileFormState = {
  firstName: "",
  lastName: "",
  errors: [],
  isValid: false,
  touched: {
    firstName: false,
    lastName: false,
  },
  isEditing: false,
};

const validateFirstName = (firstName: string): ValidationError | null => {
  if (!firstName.trim()) {
    return { field: "firstName", message: "Nama depan harus diisi" };
  }
  if (firstName.length < 2) {
    return { field: "firstName", message: "Nama depan minimal 2 karakter" };
  }
  if (firstName.length > 50) {
    return { field: "firstName", message: "Nama depan maksimal 50 karakter" };
  }
  if (!/^[a-zA-Z\s]+$/.test(firstName)) {
    return {
      field: "firstName",
      message: "Nama depan hanya boleh berisi huruf dan spasi",
    };
  }
  return null;
};

const validateLastName = (lastName: string): ValidationError | null => {
  if (!lastName.trim()) {
    return { field: "lastName", message: "Nama belakang harus diisi" };
  }
  if (lastName.length < 2) {
    return { field: "lastName", message: "Nama belakang minimal 2 karakter" };
  }
  if (lastName.length > 50) {
    return { field: "lastName", message: "Nama belakang maksimal 50 karakter" };
  }
  if (!/^[a-zA-Z\s]+$/.test(lastName)) {
    return {
      field: "lastName",
      message: "Nama belakang hanya boleh berisi huruf dan spasi",
    };
  }
  return null;
};

const validateForm = (state: ProfileFormState): ValidationError[] => {
  const errors: ValidationError[] = [];

  const firstNameError = validateFirstName(state.firstName);
  if (firstNameError) errors.push(firstNameError);

  const lastNameError = validateLastName(state.lastName);
  if (lastNameError) errors.push(lastNameError);

  return errors;
};

const profileFormSlice = createSlice({
  name: "profileForm",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
      state.touched.firstName = true;

      state.errors = state.errors.filter(
        (error) => error.field !== "firstName"
      );

      const error = validateFirstName(action.payload);
      if (error && state.touched.firstName) {
        state.errors.push(error);
      }

      state.isValid = validateForm(state).length === 0;
    },

    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
      state.touched.lastName = true;

      state.errors = state.errors.filter((error) => error.field !== "lastName");

      const error = validateLastName(action.payload);
      if (error && state.touched.lastName) {
        state.errors.push(error);
      }

      state.isValid = validateForm(state).length === 0;
    },

    setFieldTouched: (
      state,
      action: PayloadAction<{
        field: keyof ProfileFormState["touched"];
        touched: boolean;
      }>
    ) => {
      const { field, touched } = action.payload;
      state.touched[field] = touched;

      if (touched) {
        state.errors = state.errors.filter((error) => error.field !== field);

        let error: ValidationError | null = null;
        if (field === "firstName") {
          error = validateFirstName(state.firstName);
        } else if (field === "lastName") {
          error = validateLastName(state.lastName);
        }

        if (error) {
          state.errors.push(error);
        }

        state.isValid = validateForm(state).length === 0;
      }
    },

    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;

      if (action.payload) {
        state.touched = {
          firstName: false,
          lastName: false,
        };
        state.errors = [];
      }
    },

    validateAllFields: (state) => {
      state.touched = {
        firstName: true,
        lastName: true,
      };

      state.errors = validateForm(state);
      state.isValid = state.errors.length === 0;
    },

    initializeForm: (
      state,
      action: PayloadAction<{ firstName: string; lastName: string }>
    ) => {
      const { firstName, lastName } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.errors = [];
      state.isValid = true;
      state.touched = {
        firstName: false,
        lastName: false,
      };
    },

    resetForm: (state) => {
      state.firstName = "";
      state.lastName = "";
      state.errors = [];
      state.isValid = false;
      state.touched = {
        firstName: false,
        lastName: false,
      };
      state.isEditing = false;
    },

    clearErrors: (state) => {
      state.errors = [];
      state.isValid = validateForm(state).length === 0;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setFieldTouched,
  setIsEditing,
  validateAllFields,
  initializeForm,
  resetForm,
  clearErrors,
} = profileFormSlice.actions;

export default profileFormSlice.reducer;

export const selectProfileForm = (state: { profileForm: ProfileFormState }) =>
  state.profileForm;
export const selectProfileFormErrors = (state: {
  profileForm: ProfileFormState;
}) => state.profileForm.errors;
export const selectProfileFormIsValid = (state: {
  profileForm: ProfileFormState;
}) => state.profileForm.isValid;
export const selectProfileFormTouched = (state: {
  profileForm: ProfileFormState;
}) => state.profileForm.touched;
