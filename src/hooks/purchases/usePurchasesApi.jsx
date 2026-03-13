import {useEffect, useMemo, useRef, useState} from "react";
import {Form, message} from "antd";
import {
  createPurchase as createPurchaseApi,
  deletePurchaseById,
  getPurchases,
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

  const createPurchase = async (values) => {
    try {
      setIsLoading(true);
      await createPurchaseApi(values);
      message.success("Purchase created successfully");
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

  const summaryItems = useMemo(() => {
    const isFormConnected = form && form.getInternalHooks?.("RC_FORM_INTERNAL_HOOKS");
    const shipping = isFormConnected ? form.getFieldValue("shipping") || 0 : 0;

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
        value: Number(shipping).toFixed(2),
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
        value: (purchaseItems.reduce((sum, i) => sum + i.subTotal, 0) + Number(shipping)).toFixed(2),
      },
    ];
  }, [purchaseItems, form]);

  const handleOnSelect = (_, option) => {
    const product = option.product;
    setPurchaseItems((prev) => {
      const existingItem = prev.find((i) => i.skuNumber === product.skuNumber);
      if (existingItem) {
        return prev.map((i) =>
          i.skuNumber === product.skuNumber
            ? {
              ...i,
              quantity: i.quantity + 1,
              subTotal: calculateSubTotal(i.quantity + 1, i.price, i.discountType, i.discountValue)
            }
            : i
        );
      }
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          discountType: "PERCENTAGE",
          discountValue: 0,
          subTotal: product.price,
        },
      ];
    });
  };

  const handleQuantityChange = (skuNumber, quantity) => {
    setPurchaseItems((prev) =>
      prev.map((i) =>
        i.skuNumber === skuNumber
          ? {...i, quantity, subTotal: calculateSubTotal(quantity, i.price, i.discountType, i.discountValue)}
          : i
      )
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
    createPurchase,
    updatePurchase,
    deletePurchase,
    calculateSubTotal,
    handleOnSelect,
    handleQuantityChange,
    handleOnSearch,
  };
};
