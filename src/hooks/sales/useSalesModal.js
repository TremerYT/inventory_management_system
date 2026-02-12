import {useState} from "react";

export const useSalesModal = () => {
  const [isSalesReturnModalOpen, setIsSalesReturnModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);
  const [saleToEdit, setSaleToEdit] = useState(null);

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
  };
};
