import { useState } from "react";
import { useLogin } from "../useAuth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setPassword,
  setFieldTouched,
  validateAllFields,
  resetForm,
  setUsername,
} from "@/redux/slices/loginFormSlice";

const useLoginFormInput = () => {
  const dispatch = useAppDispatch();
  const { username, password, errors, isValid, touched } = useAppSelector(
    (state) => state.loginForm
  );

  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "username") {
      dispatch(setUsername(value));
    } else if (name === "password") {
      dispatch(setPassword(value));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === "username" || name === "password") {
      dispatch(setFieldTouched(name));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(validateAllFields());

    if (isValid) {
      loginMutation.mutate({ username, password });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    formData: { username, password },

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
    togglePasswordVisibility,

    // Other functions
    resetFormData,
    getFieldError,

    // Mutation state
    loginMutation,
  };
};

export default useLoginFormInput;
