import { useState } from "react";

export const useSalesModal = () => {
  const [isSalesReturnModalOpen, setIsSalesReturnModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);
  const [saleToEdit, setSaleToEdit] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [loadingView, setLoadingView] = useState(false);

  const handleOnCancel = () => {
    setIsSalesReturnModalOpen(false);
    setSaleToEdit(null);
  };

  const openDeleteConfirmation = (sale) => {
    setSaleToDelete(sale);
    setIsConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsConfirmationOpen(false);
    setSaleToDelete(null);
  };

  const openViewModal = async (sale) => {
    setSelectedSale(sale);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedSale(null);
  };

  return {
    isSalesReturnModalOpen,
    setIsSalesReturnModalOpen,
    handleOnCancel,
    isConfirmationOpen,
    saleToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    saleToEdit,
    setSaleToEdit,
    isViewModalOpen,
    selectedSale,
    loadingView,
    openViewModal,
    closeViewModal,
  };
};
