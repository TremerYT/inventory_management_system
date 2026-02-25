import {
  createCategory as createCategoryApi,
  deleteCategoryById,
  getCategory,
  updateCategoryById,
} from '../../services/category.service.js';
import { useEffect, useState } from 'react';
import { upload } from '../../services/supabase_storage.js';
import { message } from 'antd';

export const useCategoryApi = ({ onSuccess, onUpdateSuccess } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getCategory();
      setCategories(res);
      setCategoryOptions(res.map((cat) => ({ label: cat.categoryName, value: cat.id })));
      setCategoryFilter(res.map((cat) => ({ label: cat.categoryName, value: cat.categoryName })));
    } catch (e) {
      console.error('Failed to fetch categories', e);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (values) => {
    try {
      setIsLoading(true);
      const categoryImage = values.categoryImage[0]?.originFileObj;
      const categoryImageUrl = await upload(categoryImage, 'categories', 'categoryImages');

      const data = {
        ...values,
        categoryImage: categoryImageUrl,
      };
      await createCategoryApi(data);
      message.success('Category added successfully');
      await fetchCategories();
      if (onSuccess) onSuccess();
      return true;
    } catch (e) {
      setIsLoading(false);
      message.error('Failed to add category');
      console.error('Failed to add category: ', e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (values, id) => {
    try {
      setIsLoading(true);
      let categoryImageUrl = values.categoryImage[0]?.url;

      if (values.categoryImage[0]?.originFileObj) {
        categoryImageUrl = await upload(
          values.categoryImage[0].originFileObj,
          'categories',
          'categoryImages'
        );
      }

      const data = {
        ...values,
        categoryImage: categoryImageUrl,
      };

      await updateCategoryById(id, data);
      message.success('Category updated successfully');
      await fetchCategories();
      if (onUpdateSuccess) onUpdateSuccess();
      return true;
    } catch (e) {
      message.error('Failed to update category');
      console.error(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setIsLoading(true);
      await deleteCategoryById(id);
      await fetchCategories();
      message.success('Deleted category Successfully');
      if (onSuccess) onSuccess();
    } catch (e) {
      message.error('Failed to delete category');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    isLoading,
    isEditMode,
    setIsEditMode,
    categories,
    categoryOptions,
    categoryFilter,
    deleteCategory,
    fetchCategories,
    createCategory,
    updateCategory,
  };
};
