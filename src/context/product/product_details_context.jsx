import {createContext, useContext, useEffect, useRef} from "react";
import {useProduct} from "./product_context.jsx";
import {Form} from "antd";
import JsBarcode from "jsbarcode";

export const ProductDetailsContext = createContext();
export const ProductDetailsProvider = ({children}) => {
  const {form} = useProduct();
  const barcodeValue = Form.useWatch("barcodeNumber", form);
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeValue && barcodeRef.current) {
      JsBarcode(barcodeRef.current, barcodeValue, {
        format: "CODE128",
        width: 2,
        height: 50,
        displayValue: true,
      });
    }
  }, [barcodeValue]);

  const generateSKU = (productName) => {
    if (!productName) return "";
    const code = productName.substring(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    form.setFieldsValue({skuNumber: `${code}-${random}`});
  };

  const generateBarcode = () => {
    const barcode = String(
      Math.floor(100000000000 + Math.random() * 900000000000)
    );
    form.setFieldsValue({barcodeNumber: barcode});
  };

  return (
    <ProductDetailsContext.Provider value={{barcodeValue, barcodeRef, generateBarcode, generateSKU}}>
      {children}
    </ProductDetailsContext.Provider>
  )
}

export const useProductDetails = () => {
  const context = useContext(ProductDetailsContext);
  if (!context) {
    throw new Error("useProductDetails must be used within a Product details context");
  }
  return context;
}