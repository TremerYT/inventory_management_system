import {Form, message} from "antd";
import {upload} from "../../services/supabase_storage.js";
import {
  createProduct,
  deleteProduct,
  getLowStockProducts,
  getOutOfStockProducts,
  getProductById,
  getProducts,
  updateProduct
} from "../../services/product.service.js";
import {useState} from "react";
import {useNavigate} from "react-router";

export const useProductApi = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState([])
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [loadingLowStock, setLoadingLowStock] = useState(false);
  const [loadingOutOfStock, setLoadingOutOfStock] = useState(false);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.error("Error fetching Products:", e);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchLowStockProducts = async () => {
    try {
      setLoadingLowStock(true);
      const data = await getLowStockProducts();
      setLowStockProducts(data);
    } catch (e) {
      console.error("Error fetching low stock Products:", e);
    } finally {
      setLoadingLowStock(false);
    }
  };

  const fetchOutOfStockProducts = async () => {
    try {
      setLoadingOutOfStock(true);
      const data = await getOutOfStockProducts();
      setOutOfStockProducts(data);
    } catch (e) {
      console.error("Error fetching out of stock Products:", e);
    } finally {
      setLoadingOutOfStock(false);
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
    } catch (e) {
      console.error("Error Uploading the product:", e);
      message.error("Something went wrong uploading the Product");
    } finally {
      setSubmitting(false);
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
  };
}