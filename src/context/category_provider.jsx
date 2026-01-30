import {createContext, useContext, useEffect, useState} from "react";
import {
  createCategory,
  getCategory,
  updateCategoryById
} from "../services/category.service.js";
import {Form, message} from "antd";
import {upload} from "../services/supabase_storage.js";

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


  const fetchCategories = async () => {
    try {
      setIsloading(true)
      const res = await getCategory();
      setCategories(res);
      setCategoryOptions(
        res.map(cat => ({label: cat.categoryName, value: cat.id}))
      );
      setCategoryFilter(
        res.map(cat => ({label: cat.categoryName, value: cat.categoryName}))
      );

    } catch (e) {
      console.error("Failed to fetch categories", e);
    } finally {
      setIsloading(false);
    }
  };

  const addCategory = async (values) => {
    try {
      setIsloading(true);
      const categoryImage = values.categoryImage[0]?.originFileObj;
      const categoryImageUrl = await upload(categoryImage, "categories", "categoryImages");

      const data = {
        ...values,
        categoryImage: categoryImageUrl
      }
      const response = await createCategory(data);
      await fetchCategories();
      
      message.success("Category added successfully");
      return true;
    } catch (e) {
      setIsloading(false);
      message.error("Failed to add category");
      console.error("Failed to add category: ", e);
      return false;
    } finally {
      setIsloading(false);
    }
  }
  const updateCategory = async (values, id) => {
    try {
      setIsloading(true);
      let categoryImageUrl = values.categoryImage[0]?.url;

      if (values.categoryImage[0]?.originFileObj){
        categoryImageUrl = await upload(
          values.categoryImage[0].originFileObj,
          "categories",
          "categoryImages"
        );
      }

      const data = {
        ...values,
        categoryImage: categoryImageUrl
      }

      await updateCategoryById(id, data);
      await fetchCategories();
    }
    catch (e) {
      message.error("Failed to update category");
      console.error(e);
      return false;
    }
    finally {
      setIsloading(false);
      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

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
      fetchCategories,
      addCategory,
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