import {useState} from "react";

export const useBrandModal = () => {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [brandToEdit, setBrandToEdit] = useState(null);

  const handleOnCancel = () => {
    setIsBrandModalOpen(false);
    setBrandToEdit(null);
  }

  const openDeleteConfirmation = (category) => {
    setBrandToDelete(category);
    setIsConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsConfirmationOpen(false);
    setBrandToDelete(null);
  };

  return {
    isBrandModalOpen,
    isConfirmationOpen,
    brandToDelete,
    setBrandToEdit,
    setIsBrandModalOpen,
    setBrandToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    handleOnCancel,
  }
}