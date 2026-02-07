import {createContext, useContext} from "react";
import {useSalesLogic} from "../../hooks/useSalesLogic.jsx";

const SalesContext = createContext();

export const SalesProvider = ({children}) => {
  const {
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
  } = useSalesLogic();

  return (
    <SalesContext.Provider value={{
      form,
      saleItems,
      setSaleItems,
      calculateSubTotal,
      handleQuantityChange,
      handleOnSelect,
      handleOnSearch,
      productOptions,
      loadingProducts,
      summaryItems,
    }}>
      {children}
    </SalesContext.Provider>
  )
}

export const useSale = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useProduct must be used within a Product context");
  }
  return context;
};
