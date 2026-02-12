import {useState} from "react";

export const usePurchasesModal = () => {
  const [isPurchaseReturnModalOpen, setIsPurchaseReturnModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [purchaseToDelete, setPurchaseToDelete] = useState(null);
  const [purchaseToEdit, setPurchaseToEdit] = useState(null);

  const handleOnCancel = () => {
    setIsPurchaseReturnModalOpen(false);
    setPurchaseToEdit(null);
  };

  const openDeleteConfirmation = (purchase) => {
    setPurchaseToDelete(purchase);
    setIsConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsConfirmationOpen(false);
    setPurchaseToDelete(null);
  };

  return {
    isPurchaseReturnModalOpen,
    setIsPurchaseReturnModalOpen,
    handleOnCancel,
    isConfirmationOpen,
    purchaseToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    purchaseToEdit,
    setPurchaseToEdit,
  };
};
