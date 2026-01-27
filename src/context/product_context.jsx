import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Form, message } from "antd";
import { upload } from "../services/supabase_storage.js";
import {
  createProduct,
  getLowStockProducts,
  getOutOfStockProducts,
  getProducts,
  getProductsByQuery,
} from "../services/product.service.js";

const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [form] = Form.useForm();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [productOptions, setProductOptions] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const debounce = useRef(null);

  const filteredData = products.filter((product) => {
    const matchesSearch =
      !searchText ||
      product.productName?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.skuNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.barcodeNumber?.includes(searchText);
    const matchesCategory =
      !selectedCategory || product.categoryName === selectedCategory;
    const matchesBrand = !selectedBrand || product.brand === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const handleOnSelect = (_, option) => {
    const product = option.product;
    console.log(product.categoryName);
    setSaleItems((prev) => {
      const exists = prev.some((i) => i.skuNumber === product.skuNumber);
      if (exists) return prev;
      if (product.quantity < 1) {
        message.warning("Product is out of stock");
        return;
      }
      return [
        ...prev,
        {
          skuNumber: product.skuNumber,
          productName: product.productName,
          categoryName: product.categoryName,
          brand: product.brand,
          unit: product.unit,
          price: product.unitPrice,
          discountType: product.discountType,
          discountValue: product.discountValue,
          quantity: 1,
          stock: product.quantity,
          subTotal: calculateSubTotal(1, product.unitPrice, product.discountType, product.discountValue),
        },
      ];
    });
  };

  const handleQuantityChange = (record, change) => {
    setSaleItems(
      (prev) => prev.map((item) => {
        if (item.skuNumber !== record.skuNumber) return item;
        const newQuantity = item.quantity + change;
        if (newQuantity < 1) return null;
        return {
          ...item,
          quantity: newQuantity,
          subTotal: calculateSubTotal(
            newQuantity,
            item.price,
            item.discountType,
            item.discountValue
          )
        }
      }).filter(Boolean)
    )
  }

  const calculateSubTotal = (quantity, price, discountType, discountValue) => {
    if (!discountValue) return quantity * price;

    if (discountType === "PERCENTAGE") {
      return quantity * price * (1 - discountValue / 100);
    }

    return quantity * price - discountValue;
  }

  const handleOnSearch = (value) => {
    clearTimeout(debounce.current);

    if (!value) {
      setProductOptions([]);
      return;
    }

    debounce.current = setTimeout(() => {
      fetchProductsByQuery(value);
    }, 100);
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
      const response = await createProduct(data);
      message.success("Added Product successfully");
      form.resetFields();
      await fetchProducts();
    } catch (e) {
      setSubmitting(false);
      console.error("Error Uploading the product:", e);
      message.error("Something went wrong uploading the Product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOnDelete = () => {

  }

  const handleOnCancel = () => {
    form.resetFields();
  };

  const fetchProductsByQuery = async (query) => {
    try {
      setLoadingProducts(true);
      const data = await getProductsByQuery(query);
      console.log(data);
      setProductOptions(
        data.map((product) => ({
          value: product.productName,
          label: (
            <div>
              <strong>{product.productName}</strong>
              <div style={{ fontSize: 12, color: "#888" }}>
                {product.skuNumber} · KES {product.unitPrice} · Quantity:{" "}
                {product.quantity}
              </div>
            </div>
          ),
          product: product,
        })),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProducts(false);
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
        loadingProducts,
        products,
        lowStockProducts,
        outOfStockProducts,
        filteredData,
        productOptions,
        saleItems,
        handleOnSearch,
        handleOnSelect,
        handleOnCancel,
        handleOnFinish,
        handleQuantityChange,
        calculateSubTotal,
        setSearchText,
        setSelectedCategory,
        setSelectedBrand,
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
