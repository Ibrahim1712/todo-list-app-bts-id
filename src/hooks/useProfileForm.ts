import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setFirstName,
  setLastName,
  setFieldTouched,
  setIsEditing,
  validateAllFields,
  initializeForm,
  resetForm,
  selectProfileForm,
  selectProfileFormErrors,
  selectProfileFormIsValid,
} from "@/redux/slices/profileFormSlice";
import type { ProfileResponse } from "@/services/profileService";

interface UseProfileFormProps {
  profile: ProfileResponse | null;
  isProfileEditing: boolean;
  onSubmit: (data: { first_name: string; last_name: string }) => void;
  onEdit: () => void;
  onCancel: () => void;
}

export const useProfileForm = ({
  profile,
  isProfileEditing,
  onSubmit,
  onEdit,
  onCancel,
}: UseProfileFormProps) => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(selectProfileForm);
  const errors = useAppSelector(selectProfileFormErrors);
  const isValid = useAppSelector(selectProfileFormIsValid);

  useEffect(() => {
    if (profile && !formState.isEditing) {
      dispatch(
        initializeForm({
          firstName: profile.first_name,
          lastName: profile.last_name,
        })
      );
    }
  }, [profile, dispatch, formState.isEditing]);

  useEffect(() => {
    if (formState.isEditing !== isProfileEditing) {
      dispatch(setIsEditing(isProfileEditing));
    }
  }, [isProfileEditing, formState.isEditing, dispatch]);

  const handleFirstNameChange = (value: string) => {
    dispatch(setFirstName(value));
  };

  const handleLastNameChange = (value: string) => {
    dispatch(setLastName(value));
  };

  const handleFieldBlur = (field: "firstName" | "lastName") => {
    dispatch(setFieldTouched({ field, touched: true }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.isEditing) return;

    dispatch(validateAllFields());

    const currentErrors = errors;
    if (currentErrors.length === 0) {
      onSubmit({
        first_name: formState.firstName,
        last_name: formState.lastName,
      });
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onEdit();
    dispatch(setIsEditing(true));
  };

  const handleCancel = () => {
    onCancel();
    dispatch(setIsEditing(false));

    if (profile) {
      dispatch(
        initializeForm({
          firstName: profile.first_name,
          lastName: profile.last_name,
        })
      );
    }
  };

  const getFieldError = (fieldName: string) => {
    return errors.find((error) => error.field === fieldName)?.message;
  };

  const getFieldTouched = (fieldName: "firstName" | "lastName") => {
    return formState.touched[fieldName];
  };

  const hasFieldError = (fieldName: string) => {
    const touched = getFieldTouched(fieldName as "firstName" | "lastName");
    const error = getFieldError(fieldName);
    return touched && !!error;
  };

  return {
    // Form state
    firstName: formState.firstName,
    lastName: formState.lastName,
    isEditing: formState.isEditing,
    isValid,
    errors,

    // Handlers
    handleFirstNameChange,
    handleLastNameChange,
    handleFieldBlur,
    handleSubmit,
    handleEditClick,
    handleCancel,

    // Validation helpers
    getFieldError,
    getFieldTouched,
    hasFieldError,

    // Actions
    resetForm: () => dispatch(resetForm()),
  };
};
