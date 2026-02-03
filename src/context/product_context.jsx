import {createContext, useContext, useEffect, useState} from "react";
import {Form, message} from "antd";
import {upload} from "../services/supabase_storage.js";
import {
  createProduct,
  deleteProduct,
  getLowStockProducts,
  getOutOfStockProducts,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/product.service.js";
import {useNavigate} from "react-router";

const ProductContext = createContext();
export const ProductProvider = ({children}) => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingLowStock, setLoadingLowStock] = useState(false);
  const [loadingOutOfStock, setLoadingOutOfStock] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  const filteredData = products.filter((product) => {
    const matchesSearch =
      !searchText ||
      product.productName?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.skuNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.barcodeNumber?.includes(searchText);
    const matchesCategory =
      !selectedCategory || product.categoryName === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
    } finally {
      setLoadingProducts(false);
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
        console.log(mainImageUrl)
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

      const response = await updateProduct(editingProductId, data);
      message.success("Updated Product sucessfully");
      setIsEditMode(false);
      setEditingProductId(null);
    } catch (e) {
      message.error("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  }

  const handleOnDelete = async (id) => {
    try {
      setLoadingProducts(true);
      await deleteProduct(id);
      await fetchProducts();
    } catch (e) {
      console.error("Error deleting Product");
      message.error("Something went wrong deleting the Product");
    } finally {
      setLoadingProducts(false);
    }
  }

  const handleOnCancel = () => {
    form.resetFields();
  };

  const fetchLowStockProducts = async () => {
    try {
      setLoadingLowStock(true);
      const data = await getLowStockProducts();
      setLowStockProducts(data);
    } catch (e) {
      console.error("Error fetching Products:", e);
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
      console.error("Error fetching Products:", e);
    } finally {
      setLoadingOutOfStock(false);
    }
  };

  const handleView = (record) => {
    setModalOpen(true);
    setSelectedProduct(record);
    console.log(selectedProduct);
  };

  const handleOnOk = () => setModalOpen(false);

  const handleEdit = (record) => {
    navigate(`/products/edit/${record.id}`);
  };

  const handleDelete = (record) => {
    setProductToDelete(record);
    setConfirmationOpen(true);
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  }

  const confirmDelete = async () => {
    if (!productToDelete) return;
    await handleOnDelete(productToDelete.id);
    setConfirmationOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setConfirmationOpen(false);
    setProductToDelete(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchLowStockProducts();
    fetchOutOfStockProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        form,
        submitting,
        loadingProducts,
        loadingLowStock,
        loadingOutOfStock,
        products,
        lowStockProducts,
        outOfStockProducts,
        isEditMode,
        filteredData,
        isConfirmationOpen,
        isModalOpen,
        selectedProduct,
        productToDelete,
        handleModalCancel,
        handleView,
        handleOnOk,
        handleEdit,
        handleDelete,
        confirmDelete,
        cancelDelete,
        fetchProducts,
        setSearchText,
        setSelectedCategory,
        fetchProductsById,
        handleOnUpdate,
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
