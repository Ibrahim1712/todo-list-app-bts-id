import { useState } from "react";
import { useRegister } from "../useAuth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setEmail,
  setUsername,
  setPassword,
  setConfirmPassword,
  setFieldTouched,
  validateAllFields,
  resetForm,
} from "@/redux/slices/registrationFormSlice";

const useRegistrationFormInput = () => {
  const dispatch = useAppDispatch();
  const {
    email,
    username,
    password,
    confirm_password,
    errors,
    isValid,
    touched,
  } = useAppSelector((state) => state.registrationForm);

  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        dispatch(setEmail(value));
        break;
      case "username":
        dispatch(setUsername(value));
        break;
      case "password":
        dispatch(setPassword(value));
        break;
      case "confirm_password":
        dispatch(setConfirmPassword(value));
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (
      name === "email" ||
      name === "first_name" ||
      name === "last_name" ||
      name === "password" ||
      name === "confirm_password"
    ) {
      dispatch(setFieldTouched(name));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(validateAllFields());

    if (isValid) {
      registerMutation.mutate({
        email,
        username,
        password,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const resetFormData = () => {
    dispatch(resetForm());
  };

  const getFieldError = (fieldName: string) => {
    const fieldError = errors.find((error) => error.field === fieldName);
    const isFieldTouched = touched[fieldName as keyof typeof touched];
    return isFieldTouched && fieldError ? fieldError.message : "";
  };

  return {
    // Form data
    formData: { email, username, password, confirm_password },

    // Validation state
    errors,
    isValid,
    touched,

    // Event handlers
    handleSubmit,
    handleChange,
    handleBlur,

    // Password visibility
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,

    // Other functions
    resetFormData,
    getFieldError,

    // Mutation state
    registerMutation,
  };
};

export default useRegistrationFormInput;
