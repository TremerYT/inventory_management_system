import {createContext, useContext} from "react";
import {useBrandModal} from "../../hooks/brands/useBrandModal.js";
import {useBrandAPI} from "../../hooks/brands/useBrandAPI.js";

const BrandContext = createContext(null);
const BrandProvider = (children) => {
  const {
    isBrandModalOpen,
    isConfirmationOpen,
    brandToDelete,
    setBrandToEdit,
    setIsBrandModalOpen,
    setBrandToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    handleOnCancel,
  } = useBrandModal();

  const {
    isLoading,
    isEditMode,
    setIsEditMode,
    brands,
    brandOptions,
    brandFilter,
    deleteBrand,
    fetchBrand,
    createBrand,
    updateBrand
  } = useBrandAPI({
      onSuccess: () => {
        handleOnCancel();
        closeDeleteConfirmation();
      },
      onUpdateSuccess: () => {
        handleOnCancel();
      }
    }
  );

  return (
    <BrandContext.Provider value={{
      isBrandModalOpen,
      isConfirmationOpen,
      brandToDelete,
      setBrandToEdit,
      setIsBrandModalOpen,
      setBrandToDelete,
      openDeleteConfirmation,
      closeDeleteConfirmation,
      handleOnCancel,
      isLoading,
      isEditMode,
      setIsEditMode,
      brands,
      brandOptions,
      brandFilter,
      deleteBrand,
      fetchBrand,
      createBrand,
      updateBrand
    }}>

    </BrandContext.Provider>
  );
}

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrand must be used within a Brand_context");
  }
  return context;
}