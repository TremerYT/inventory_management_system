import {createContext, useContext} from "react";
import {Form} from "antd";
import {useCategoryApi} from "../../hooks/category/useCategoryApi.js";
import {useCategoryModal} from "../../hooks/category/useCategoryModal.js";

const CategoryContext = createContext(null);
export const CategoryProvider = ({children}) => {
  const [form] = Form.useForm();

  const {
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    handleonCancel,
    isConfirmationOpen,
    categoryToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    categoryToEdit,
    setCategoryToEdit,
  } = useCategoryModal();

  const {
    categories,
    isLoading,
    isEditMode,
    setIsEditMode,
    categoryFilter,
    categoryOptions,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  } = useCategoryApi({
    onSuccess: () => {
      handleonCancel();
      closeDeleteConfirmation();
    },
    onUpdateSuccess: () => {
      handleonCancel();
    }
  });


  return (
    <CategoryContext.Provider value={{
      form,
      categories,
      isLoading,
      isEditMode,
      setIsEditMode,
      categoryFilter,
      categoryOptions,
      fetchCategories,
      createCategory,
      updateCategory,
      deleteCategory,
      isCategoryModalOpen,
      setIsCategoryModalOpen,
      handleonCancel,
      isConfirmationOpen,
      categoryToDelete,
      openDeleteConfirmation,
      closeDeleteConfirmation,
      categoryToEdit,
      setCategoryToEdit,
    }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a Category_context");
  }
  return context;
}