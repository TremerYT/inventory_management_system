import {createContext, useContext, useMemo, useState} from "react";
import {useProductApi} from "../../hooks/products/useProductApi.js";
import {useProductModals} from "../../hooks/products/useProductModals.js";

const ProductContext = createContext();
export const ProductProvider = ({children}) => {
  const {
    products,
    lowStockProducts,
    outOfStockProducts,
    loadingProducts,
    loadingLowStock,
    loadingOutOfStock,
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
    fetchProducts,
    fetchLowStockProducts,
    fetchOutOfStockProducts,
  } = useProductApi();

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const filteredData = useMemo(() => {
    let data = Array.isArray(products) ? products : [];
    const text = (searchText || "").toLowerCase();
    if (text) {
      data = data.filter((item) =>
        item?.productName?.toLowerCase()?.includes(text) ||
        item?.skuNumber?.toLowerCase()?.includes(text) ||
        item?.barcodeNumber?.toLowerCase()?.includes(text)
      );
    }
    if (selectedCategory) {
      data = data.filter((item) => item?.categoryName === selectedCategory);
    }
    return data;
  }, [products, searchText, selectedCategory]);

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
