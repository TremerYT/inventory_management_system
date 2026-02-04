import {createContext, useContext, useState} from "react";
import {Form} from "antd";

const CategoryContext = createContext(null);
export const CategoryProvider = ({children}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();

  const filteredCategory = categories.filter((category) => {
    const matchesSearch =
      !searchText ||
      category.categoryName?.toLowerCase().includes(searchText.toLowerCase()) ||
      category.categoryCode?.toLowerCase().includes(searchText.toLowerCase());
    const matchesActive = selectedStatus === null || selectedStatus === undefined || category.isActive === selectedStatus;

    return matchesSearch && matchesActive;
  });

  const handleOnOk = async (values) => {
    const success = isEditMode
      ? await updateCategory(values, editingCategoryId)
      : await addCategory(values);
    if (success) {
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingCategoryId(null);
      form.resetFields();
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }


  return (
    <CategoryContext.Provider value={{
      editingCategoryId,
      setEditingCategoryId,
      form,
      isModalOpen,
      setIsModalOpen,
      isEditMode,
      setIsEditMode,
      categories,
      isLoading,
      categoryFilter,
      categoryOptions,
      filteredCategory,
      handleOnOk,
      handleCancel,
      setSearchText,
      selectedStatus,
      setSelectedStatus,
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