import {createContext, useContext} from "react";
import {useProductData} from "../../hooks/useProductData.js";
import {useProductActions} from "../../hooks/useProductActions.js";
import {useProductModals} from "../../hooks/useProductModals.js";

const ProductContext = createContext();
export const ProductProvider = ({children}) => {
  const {
    products,
    lowStockProducts,
    outOfStockProducts,
    loadingProducts,
    loadingLowStock,
    loadingOutOfStock,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    filteredData,
    fetchProducts,
    fetchLowStockProducts,
    fetchOutOfStockProducts,
  } = useProductData();

  const {
    form,
    submitting,
    isEditMode,
    editingProductId,
    handleOnFinish,
    fetchProductsById,
    handleOnUpdate,
    handleOnDelete,
    handleOnCancel,
    handleEdit,
  } = useProductActions(fetchProducts);

  const {
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
  } = useProductModals(handleOnDelete);

  return (
    <ProductContext.Provider
      value={{
        form,
        submitting,
        loadingProducts,
        loadingLowStock,
        loadingOutOfStock,
        products,
        lowStockProducts,
        outOfStockProducts,
        isEditMode,
        editingProductId,
        filteredData,
        isConfirmationOpen,
        isModalOpen,
        selectedProduct,
        productToDelete,
        handleModalCancel,
        handleView,
        handleOnOk,
        handleEdit,
        handleDelete,
        confirmDelete,
        cancelDelete,
        fetchProducts,
        setSearchText,
        setSelectedCategory,
        fetchProductsById,
        handleOnUpdate,
        handleOnCancel,
        handleOnFinish,
        handleOnDelete,
        fetchLowStockProducts,
        fetchOutOfStockProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a Product context");
  }
  return context;
};
