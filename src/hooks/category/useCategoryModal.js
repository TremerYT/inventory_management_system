import {useState} from "react";

export const useCategoryModal = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleonCancel = () => {
    setIsCategoryModalOpen(false);
    setCategoryToEdit(null);
  };

  const openDeleteConfirmation = (category) => {
    setCategoryToDelete(category);
    setIsConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsConfirmationOpen(false);
    setCategoryToDelete(null);
  };

  return {
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    handleonCancel,
    isConfirmationOpen,
    categoryToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    categoryToEdit,
    setCategoryToEdit,
  };
};