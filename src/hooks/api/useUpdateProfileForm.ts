import type {
  ProfileResponse,
  ProfileUpdateRequest,
} from "@/services/profileService";
import type { UseMutationResult } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLogout } from "../useAuth";

const useUpdateProfileForm = ({
  profile,
  isEditing,
  handleSave,
  handleImageUpload,
  handleEdit,
  updateProfileImageMutation,
}: {
  profile: ProfileResponse | undefined;
  isEditing: boolean;
  handleSave: (data: ProfileUpdateRequest) => void;
  handleImageUpload: (file: File) => void;
  handleEdit: () => void;
  handleCancel: () => void;
  updateProfileImageMutation: UseMutationResult<
    ProfileResponse,
    Error,
    FormData,
    unknown
  >;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imageKey, setImageKey] = useState(Date.now());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logout = useLogout();

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
    }
  }, [profile]);

  useEffect(() => {
    if (!isEditing && profile) {
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
    }
  }, [isEditing, profile]);

  useEffect(() => {
    if (updateProfileImageMutation.isSuccess) {
      setImageKey(Date.now());
    }
  }, [updateProfileImageMutation.isSuccess]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        handleImageUpload(file);
      } catch (error) {
        console.error("Image upload error:", error);
      }
    }
    event.target.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      handleSave({
        first_name: firstName,
        last_name: lastName,
      });
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEdit();
  };

  const handleLogout = () => {
    logout();
  };

  return {
    firstName,
    lastName,
    imageKey,
    fileInputRef,
    handleImageClick,
    handleFileChange,
    handleSubmit,
    handleEditClick,
    handleLogout,
    setFirstName,
    setLastName,
  };
};

export default useUpdateProfileForm;
