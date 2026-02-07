import {createContext, useContext} from "react";
import {useBrandModal} from "../../hooks/brands/useBrandModal.js";
import {useBrandAPI} from "../../hooks/brands/useBrandAPI.js";
import {Form} from "antd";

const BrandContext = createContext(null);
export const BrandProvider = ({children}) => {
  const [form] = Form.useForm();
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
    addBrand,
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
      form,
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
      addBrand,
      updateBrand
    }}>
      {children}
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