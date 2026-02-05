import {useState} from "react";

export const useProductModals = (handleOnDelete) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleView = (record) => {
    setSelectedProduct(record);
    setModalOpen(true);
  };

  const handleOnOk = () => setModalOpen(false);
  const handleModalCancel = () => setModalOpen(false);

  const handleDelete = (record) => {
    setProductToDelete(record);
    setConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    await handleOnDelete(productToDelete.id);
    setConfirmationOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setConfirmationOpen(false);
    setProductToDelete(null);
  };

  return {
    isModalOpen,
    selectedProduct,
    isConfirmationOpen,
    productToDelete,
    handleView,
    handleOnOk,
    handleModalCancel,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
};
