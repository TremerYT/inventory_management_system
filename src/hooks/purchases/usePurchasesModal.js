import {useState} from "react";

export const usePurchasesModal = () => {
  const [isPurchaseReturnModalOpen, setIsPurchaseReturnModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [purchaseToDelete, setPurchaseToDelete] = useState(null);
  const [purchaseToEdit, setPurchaseToEdit] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [loadingView, setLoadingView] = useState(false);

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

  const openViewModal = async (purchase) => {
    console.log('openViewModal called with purchase:', purchase);
    setSelectedPurchase(purchase);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedPurchase(null);
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
    isViewModalOpen,
    selectedPurchase,
    loadingView,
    openViewModal,
    closeViewModal,
  };
};
