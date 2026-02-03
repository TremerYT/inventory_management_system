import {useEffect, useMemo, useState} from "react";
import {getLowStockProducts, getOutOfStockProducts, getProducts} from "../services/product.service.js";

export const useProductData = () => {
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingLowStock, setLoadingLowStock] = useState(false);
  const [loadingOutOfStock, setLoadingOutOfStock] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const filteredData = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchText ||
        product.productName?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.skuNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.barcodeNumber?.includes(searchText);
      const matchesCategory =
        !selectedCategory || product.categoryName === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, selectedCategory]);

  useEffect(() => {
    fetchProducts();
    fetchLowStockProducts();
    fetchOutOfStockProducts();
  }, []);

  return {
    products,
    lowStockProducts,
    outOfStockProducts,
    loadingProducts,
    loadingLowStock,
    loadingOutOfStock,
    searchText,
    setSearchText,
    selectedCategory,
    setSelectedCategory,
    filteredData,
    fetchProducts,
    fetchLowStockProducts,
    fetchOutOfStockProducts,
  };
};
