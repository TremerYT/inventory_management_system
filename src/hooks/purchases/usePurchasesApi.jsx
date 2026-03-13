import {useEffect, useMemo, useRef, useState} from "react";
import {Form, message, Input} from "antd";
import {
  createPurchase as createPurchaseApi,
  deletePurchaseById,
  getPurchases,
  getPurchaseById,
  updatePurchaseById
} from "../../services/purchases.service.js";
import {getProductsByQuery} from "../../services/product.service.js";

export const usePurchasesApi = ({onSuccess, onUpdateSuccess} = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [form] = Form.useForm();
  const debounce = useRef(null);

  const fetchPurchases = async () => {
    try {
      setIsLoading(true);
      const res = await getPurchases();
      setPurchases(res);
    } catch (e) {
      console.error("Failed to fetch purchases", e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPurchaseById = async (id) => {
    try {
      setIsLoading(true);
      console.log('Fetching purchase with ID:', id);
      const res = await getPurchaseById(id);
      console.log('Purchase data received:', res);
      return res;
    } catch (e) {
      console.error('Failed to fetch purchase by ID', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const createPurchase = async (values) => {
    try {
      if (purchaseItems.length === 0) {
        message.error('Please add at least one item to the purchase');
        return false;
      }
      setIsLoading(true);
      const purchaseData = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        shipping: Number(values.shipping),
        paid: Number(values.paid),
        items: purchaseItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
          discount:
            item.discountType === 'PERCENTAGE'
              ? (item.discountValue * item.price * item.quantity) / 100
              : item.discountValue,
        })),
      };
      console.log('Purchase payload being sent:', purchaseData);
      await createPurchaseApi(purchaseData);
      message.success("Purchase created successfully");
      form.resetFields();
      setPurchaseItems([]);
      await fetchPurchases();
      if (onSuccess) onSuccess();
      return true;
    } catch (e) {
      message.error("Failed to create purchase");
      console.error("Failed to create purchase: ", e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePurchase = async (values, id) => {
    try {
      setIsLoading(true);
      await updatePurchaseById(id, values);
      message.success("Purchase updated successfully");
      await fetchPurchases();
      if (onUpdateSuccess) onUpdateSuccess();
      return true;
    } catch (e) {
      message.error("Failed to update purchase");
      console.error(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePurchase = async (id) => {
    try {
      setIsLoading(true);
      await deletePurchaseById(id);
      await fetchPurchases();
      message.success("Deleted purchase successfully");
      if (onSuccess) onSuccess();
    } catch (e) {
      message.error("Failed to delete purchase");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSubTotal = (quantity, price, discountType, discountValue) => {
    if (!discountValue) return quantity * price;

    if (discountType === "PERCENTAGE") {
      return quantity * price * (1 - discountValue / 100);
    }

    return quantity * price - discountValue;
  };

  const shippingValue = Form.useWatch('shipping', form);

  const summaryItems = useMemo(() => {
    return [
      {
        label: "Total Items",
        value: purchaseItems.length,
      },
      {
        label: "Total Amount",
        value: purchaseItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2),
      },
      {
        label: "Shipping",
        value: Number(shippingValue) || 0,
      },
      {
        label: "Total Discount",
        value: purchaseItems
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
        value: (purchaseItems.reduce((sum, i) => sum + i.subTotal, 0) + Number(shippingValue)).toFixed(2),
      },
    ];
  }, [purchaseItems, shippingValue]);

  const handleOnSelect = (_, option) => {
    const product = option.product;
    setPurchaseItems((prev) => {
      const exists = prev.some((i) => i.skuNumber === product.skuNumber);
      if (exists) return prev;
      return [
        ...prev,
        {
          productId: product.id,
          skuNumber: product.skuNumber,
          productName: product.productName,
          categoryName: product.categoryName,
          brandName: product.brand,
          unit: product.unit,
          price: product.unitPrice,
          discountType: product.discountType,
          discountValue: product.discountValue,
          quantity: 1,
          subTotal: calculateSubTotal(
            1,
            product.unitPrice,
            product.discountType,
            product.discountValue
          ),
        },
      ];
    });
  };

  const handleQuantityChange = (record, change) => {
    setPurchaseItems((prev) =>
      prev.map((item) => {
        if (item.skuNumber !== record.skuNumber) return item;
        const newQuantity = item.quantity + change;
        return {
          ...item,
          quantity: newQuantity,
          subTotal: calculateSubTotal(newQuantity, item.price, item.discountType, item.discountValue)
        };
      })
    );
  };

  const handleOnSearch = async (query) => {
    if (debounce.current) clearTimeout(debounce.current);

    debounce.current = setTimeout(async () => {
      if (!query) {
        setProductOptions([]);
        return;
      }
      try {
        setLoadingProducts(true);
        const products = await getProductsByQuery(query);
        setProductOptions(
          products.map((p) => ({
            value: p.productName,
            label: (
              <div>
                <strong>{p.productName}</strong>
                <div style={{ fontSize: 12, color: '#888' }}>
                  {p.skuNumber} · KES {p.unitPrice} · Quantity: {p.quantity}
                </div>
              </div>
            ),
            product: p,
          }))
        );
      } catch (e) {
        console.error("Search failed", e);
      } finally {
        setLoadingProducts(false);
      }
    }, 300);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return {
    isLoading,
    isEditMode,
    setIsEditMode,
    purchases,
    purchaseItems,
    setPurchaseItems,
    productOptions,
    loadingProducts,
    summaryItems,
    form,
    fetchPurchases,
    fetchPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase,
    calculateSubTotal,
    handleOnSelect,
    handleQuantityChange,
    handleOnSearch,
  };
};
