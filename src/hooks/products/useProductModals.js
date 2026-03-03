import {useState} from "react";

export const useProductModals = (handleOnDelete, fetchProductById) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [loadingView, setLoadingView] = useState(false);

  const handleView = async (id) => {
    try {
      setModalOpen(true);
      setLoadingView(true);
      const productData = await fetchProductById(id);
      setSelectedProduct(productData);
    } catch (error) {
      console.error('Error fetching product for view:', error);
      setModalOpen(false);
    } finally {
      setLoadingView(false);
    }
  };

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

  const handleOnOk = () => setModalOpen(false);
  const handleModalCancel = () => setModalOpen(false)

  return {
    isModalOpen,
    selectedProduct,
    isConfirmationOpen,
    productToDelete,
    loadingView,
    handleView,
    handleOnOk,
    handleModalCancel,
    handleDelete,
    confirmDelete,
    cancelDelete,
  };
};
