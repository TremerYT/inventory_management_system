import {useMemo, useRef, useState} from "react";
import {Form, message} from "antd";
import {getProductsByQuery} from "../services/product.service.js";

export const useSalesLogic = () => {
  const [saleItems, setSaleItems] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [form] = Form.useForm();
  const debounce = useRef(null);

  const calculateSubTotal = (quantity, price, discountType, discountValue) => {
    if (!discountValue) return quantity * price;

    if (discountType === "PERCENTAGE") {
      return quantity * price * (1 - discountValue / 100);
    }

    return quantity * price - discountValue;
  };

  const summaryItems = useMemo(() => [
    {
      label: "Total Items",
      value: saleItems.length,
    },
    {
      label: "Total Amount",
      value: saleItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2),
    },
    {
      label: "Shipping",
      value: form.getFieldValue("shipping") || 0,
    },
    {
      label: "Total Discount",
      value: saleItems
        .reduce(
          (sum, i) =>
            sum +
            (i.discountType === "PERCENTAGE"
              ? (i.discountValue * i.price * i.quantity) / 100
              : i.discountValue),
          0,
        )
        .toFixed(2),
    },
    {
      label: "Grand Total",
      value: saleItems.reduce((sum, i) => sum + i.subTotal, 0).toFixed(2),
    },
  ], [saleItems, form.getFieldValue("shipping")]);

  const handleOnSelect = (_, option) => {
    const product = option.product;
    setSaleItems((prev) => {
      const exists = prev.some((i) => i.skuNumber === product.skuNumber);
      if (exists) return prev;
      if (product.quantity < 1) {
        message.warning("Product is out of stock");
        return prev;
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
    setSaleItems((prev) =>
      prev
        .map((item) => {
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
            ),
          };
        })
        .filter(Boolean)
    );
  };

  const fetchProductsByQuery = async (query) => {
    try {
      setLoadingProducts(true);
      const data = await getProductsByQuery(query);
      setProductOptions(
        data.map((product) => ({
          value: product.productName,
          label: (
            <div>
              <strong>{product.productName}</strong>
              <div style={{fontSize: 12, color: "#888"}}>
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

  return {
    form,
    saleItems,
    setSaleItems,
    productOptions,
    loadingProducts,
    summaryItems,
    calculateSubTotal,
    handleOnSelect,
    handleQuantityChange,
    handleOnSearch,
  };
};
