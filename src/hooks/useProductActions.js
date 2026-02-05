import {useState} from "react";
import {Form, message} from "antd";
import {upload} from "../services/supabase_storage.js";
import {createProduct, deleteProduct, getProductById, updateProduct} from "../services/product.service.js";
import {useNavigate} from "react-router";

export const useProductActions = (fetchProducts) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const navigate = useNavigate();

  const handleOnFinish = async (values) => {
    try {
      setSubmitting(true);
      const mainImage = values.mainImage[0]?.originFileObj;
      const mainImageUrl = await upload(mainImage, "main", "productImages");

      const galleryImagesUrl = await Promise.all(
        values.galleryImages.map((image) =>
          upload(image.originFileObj, "gallery", "productImages"),
        ),
      );

      const data = {
        ...values,
        mainImage: mainImageUrl,
        galleryImages: galleryImagesUrl,
      };
      await createProduct(data);
      message.success("Added Product successfully");
      form.resetFields();
      if (fetchProducts) fetchProducts();
    } catch (e) {
      console.error("Error Uploading the product:", e);
      message.error("Something went wrong uploading the Product");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProductsById = async (id) => {
    try {
      const data = await getProductById(id);

      form.setFieldsValue({
        ...data,
        mainImage: data.mainImage
          ? [{
            uid: "-1",
            name: "main-image",
            status: "done",
            url: data.mainImage,
          }]
          : [],
        galleryImages: data.galleryImages?.map((url, index) => ({
          uid: `-${index + 2}`,
          name: `gallery-${index + 1}`,
          status: "done",
          url,
        })) || [],
      });

      setIsEditMode(true);
      setEditingProductId(id);
    } catch (e) {
      message.error("failed to load product");
    }
  };

  const handleOnUpdate = async (values) => {
    try {
      setSubmitting(true);
      let mainImageUrl = values.mainImage;

      if (values.mainImage?.[0]?.originFileObj) {
        const mainImage = values.mainImage[0].originFileObj;
        mainImageUrl = await upload(mainImage, "main", "productImages");
      } else if (values.mainImage?.[0]?.url) {
        mainImageUrl = values.mainImage[0].url;
      }

      const galleryImagesUrl = await Promise.all(
        values.galleryImages.map((image) => {
          if (image.originFileObj) {
            return upload(image.originFileObj, "gallery", "productImages");
          }
          return image.url;
        })
      );

      const data = {
        ...values,
        mainImage: mainImageUrl,
        galleryImages: galleryImagesUrl,
      };

      await updateProduct(editingProductId, data);
      message.success("Updated Product sucessfully");
      setIsEditMode(false);
      setEditingProductId(null);
      if (fetchProducts) fetchProducts();
    } catch (e) {
      message.error("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOnDelete = async (id) => {
    try {
      await deleteProduct(id);
      if (fetchProducts) await fetchProducts();
      message.success("Deleted Product successfully");
    } catch (e) {
      console.error("Error deleting Product");
      message.error("Something went wrong deleting the Product");
    }
  };

  const handleOnCancel = () => {
    form.resetFields();
  };

  const handleEdit = (record) => {
    navigate(`/products/edit/${record.id}`);
  };

  return {
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
  };
};
