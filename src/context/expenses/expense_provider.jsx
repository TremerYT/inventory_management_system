import {createContext, useContext} from "react";


const ExpenseContext = createContext(null);
const ExpenseProvider = ({children}) => {
  return (
    <ExpenseContext.Provider value={{}}>

    </ExpenseContext.Provider>
  );
}

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used in an expense Context");
  }
  return context;
}