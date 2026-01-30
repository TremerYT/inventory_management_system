import {createContext, useContext, useEffect, useState} from "react";
import {createCategory, getCategory, getCategoryById} from "../services/category.service.js";
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
  const [isLoading, setIsloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    const success = await addCategory(values);
    if (success) {
      setIsModalOpen(false);
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

  const fetchProductsById = async (id) => {
    try {
      const data = await getCategoryById();

    }
    catch (e) {

    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{
      form,
      isModalOpen,
      categories,
      isLoading,
      categoryFilter,
      categoryOptions,
      filteredCategory,
      fetchCategories,
      addCategory,
      setSearchText,
      selectedStatus,
      setIsModalOpen,
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