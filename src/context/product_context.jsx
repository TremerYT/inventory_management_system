import {createContext, useContext, useEffect, useState} from "react";
import {Form, message} from "antd";
import {upload} from "../services/supabase_storage.js";
import {
  createProduct,
  deleteProduct,
  getLowStockProducts,
  getOutOfStockProducts,
  getProducts,
} from "../services/product.service.js";

const ProductContext = createContext();
export const ProductProvider = ({children}) => {
  const [form] = Form.useForm();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);

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
      const response = await createProduct(data);
      message.success("Added Product successfully");
      form.resetFields();
      // await fetchProducts();
    } catch (e) {
      setSubmitting(false);
      console.error("Error Uploading the product:", e);
      message.error("Something went wrong uploading the Product");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      console.error("Error fetching Products:", e);
    }
  };

  const handleOnDelete = async (id) => {
    try {
      setLoadingProducts(true);
      await deleteProduct(id);
      await fetchProducts();
    }
    catch (e) {
      console.error("Error deleting Product");
      message.error("Something went wrong deleting the Product");
    }
    finally {
      setLoadingProducts(false);
    }
  }

  const handleOnCancel = () => {
    form.resetFields();
  };

  const fetchLowStockProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await getLowStockProducts();
      setLowStockProducts(data);
    } catch (e) {
      console.error("Error fetching Products:", e);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchOutOfStockProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await getOutOfStockProducts();
      setOutOfStockProducts(data);
    } catch (e) {
      console.error("Error fetching Products:", e);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchLowStockProducts();
    fetchOutOfStockProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        form,
        submitting,
        loadingProducts,
        products,
        lowStockProducts,
        outOfStockProducts,
        handleOnCancel,
        handleOnFinish,
        handleOnDelete,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a Product context");
  }
  return context;
};
