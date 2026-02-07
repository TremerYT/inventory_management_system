import {createBrand, deleteBrandById, getBrands, updateBrandById} from "../../services/brand.service.js";
import {useEffect, useState} from "react";
import {upload} from "../../services/supabase_storage.js";
import {message} from "antd";

export const useBrandAPI = ({onSuccess, onUpdateSuccess}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);

  const addBrand = async (values) => {
    try {
      setIsLoading(true);
      const brandImage = values.brandImage[0]?.originFileObj;
      const brandUrl = await upload(brandImage, "brands", "brandImages");

      const data = {
        ...values,
        brandImage: brandUrl
      }

      const response = await createBrand(data);
      message.success("Brand Created successfully");
      await fetchBrand();
      if (onSuccess) onSuccess();
      return response;
    } catch (e) {
      setIsLoading(false);
      console.error("Failed to add brand", e);
      message.error("Failed to add brand");
    } finally {
      setIsLoading(false);
    }
  }

  const fetchBrand = async () => {
    try {
      setIsLoading(true);
      const response = await getBrands();
      setBrands(response);
      setBrandOptions(
        response.map(res => ({label: res.brandName, value: res.id}))
      );
      setBrandFilter(
        response.map(res => ({label: res.brandName, value: res.brandName}))
      );
    } catch (e) {
      console.error("Failed to fetch brands", e);
    } finally {
      setIsLoading(false);
    }
  }

  const updateBrand = async (values, id) => {
    try {
      setIsLoading(true);
      let brandImageUrl = values.brandImage[0]?.url;

      if (values.brandImage[0]?.originFileObj) {
        brandImageUrl = await upload(
          values.brandImage[0].originFileObj,
          "brand",
          "brandImages"
        );
      }

      const data = {
        ...values,
        brandImage: brandImageUrl
      }

      await updateBrandById(id, data);
      message.success("Brand updated successfully");
      await fetchBrand();
      if (onUpdateSuccess) onUpdateSuccess();
      return true;
    } catch (e) {
      message.error("Failed to update brand");
      console.error(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  const deleteBrand = async (id) => {
    try {
      setIsLoading(true);
      await deleteBrandById(id);
      await fetchBrand();
      message.success("Deleted brand Successfully");
      if (onSuccess) onSuccess();
    } catch (e) {
      message.error("Failed to delete brand");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBrand();
  }, []);

  return {
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
  };
};