import {createContext, useContext} from "react";
import {useSalesApi} from "../../hooks/sales/useSalesApi.jsx";
import {useSalesModal} from "../../hooks/sales/useSalesModal.js";

const SalesContext = createContext(null);

export const SalesProvider = ({children}) => {
  const {
    isSalesReturnModalOpen,
    setIsSalesReturnModalOpen,
    handleOnCancel,
    isConfirmationOpen,
    saleToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    saleToEdit,
    setSaleToEdit,
  } = useSalesModal();

  const {
    isLoading,
    isEditMode,
    setIsEditMode,
    sales,
    saleItems,
    setSaleItems,
    productOptions,
    loadingProducts,
    summaryItems,
    form,
    fetchSales,
    createSale,
    updateSale,
    deleteSale,
    calculateSubTotal,
    handleOnSelect,
    handleQuantityChange,
    handleOnSearch,
  } = useSalesApi({
    onSuccess: () => {
      handleOnCancel();
      closeDeleteConfirmation();
    },
    onUpdateSuccess: () => {
      handleOnCancel();
    }
  });

  return (
    <SalesContext.Provider value={{
      form,
      sales,
      saleItems,
      setSaleItems,
      isLoading,
      isEditMode,
      setIsEditMode,
      productOptions,
      loadingProducts,
      summaryItems,
      fetchSales,
      createSale,
      updateSale,
      deleteSale,
      calculateSubTotal,
      handleOnSelect,
      handleQuantityChange,
      handleOnSearch,
      handleOnCancel,
      isSalesReturnModalOpen,
      setIsSalesReturnModalOpen,
      isConfirmationOpen,
      saleToDelete,
      openDeleteConfirmation,
      closeDeleteConfirmation,
      saleToEdit,
      setSaleToEdit,
    }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSale = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSale must be used within a SalesProvider");
  }
  return context;
};
