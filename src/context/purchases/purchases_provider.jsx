import {createContext, useContext} from "react";
import {usePurchasesApi} from "../../hooks/purchases/usePurchasesApi.js";
import {usePurchasesModal} from "../../hooks/purchases/usePurchasesModal.js";

const PurchaseContext = createContext(null);

export const PurchaseProvider = ({children}) => {
  const {
    isPurchaseReturnModalOpen,
    setIsPurchaseReturnModalOpen,
    handleOnCancel,
    isConfirmationOpen,
    purchaseToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    purchaseToEdit,
    setPurchaseToEdit,
  } = usePurchasesModal();

  const {
    isLoading,
    isEditMode,
    setIsEditMode,
    purchases,
    purchaseItems,
    setPurchaseItems,
    productOptions,
    loadingProducts,
    summaryItems,
    form,
    fetchPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase,
    calculateSubTotal,
    handleOnSelect,
    handleQuantityChange,
    handleOnSearch,
  } = usePurchasesApi({
    onSuccess: () => {
      handleOnCancel();
      closeDeleteConfirmation();
    },
    onUpdateSuccess: () => {
      handleOnCancel();
    }
  });

  const handleOnModalCancel = () => {
    handleOnCancel();
    form.resetFields();
  };

  return (
    <PurchaseContext.Provider value={{
      form,
      purchases,
      purchaseItems,
      setPurchaseItems,
      isLoading,
      isEditMode,
      setIsEditMode,
      productOptions,
      loadingProducts,
      summaryItems,
      fetchPurchases,
      createPurchase,
      updatePurchase,
      deletePurchase,
      calculateSubTotal,
      handleOnSelect,
      handleQuantityChange,
      handleOnSearch,
      handleOnCancel: handleOnModalCancel,
      isPurchaseReturnModalOpen,
      setIsPurchaseReturnModalOpen,
      isConfirmationOpen,
      purchaseToDelete,
      openDeleteConfirmation,
      closeDeleteConfirmation,
      purchaseToEdit,
      setPurchaseToEdit,
    }}>
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchase = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchase must be used within a PurchaseProvider");
  }
  return context;
};
