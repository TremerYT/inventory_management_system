import "./index.css";
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import PageLayout from "./components/layout/layout.jsx";

import Dashboard from "./pages/dashboard/dashboard.jsx";


import {AuthProvider} from "./context/auth_provider.jsx";
import {CategoryProvider} from "./context/category_provider.jsx";
import {ProductProvider} from "./context/product_context.jsx";
import {ProductDetailsProvider} from "./context/product_details_context.jsx";
import {SalesProvider} from "./context/sales_context.jsx";
import Login from "./pages/authentication/login.jsx";
import Register from "./pages/authentication/register.jsx";
import PrivateRoute from "./pages/authentication/private_route.jsx";
import AllProducts from "./pages/products/all_products.jsx";
import LowStocks from "./pages/products/low_stocks.jsx";
import Product from "./pages/products/product.jsx";
import Categories from "./pages/categories/categories.jsx";
import AddSale from "./pages/sales/add_sale.jsx";
import Purchases from "./pages/purchases/purchases.jsx";
import AddPurchase from "./pages/purchases/add-purchase.jsx";
import AddReturn from "./pages/returns/add_return.jsx";

import Customers from "./pages/people/customers.jsx";
import Suppliers from "./pages/people/suppliers.jsx";
import AllSales from "./pages/sales/list_sales.jsx";
import SaleReturns from "./pages/sales/sale_returns.jsx";

const ProductsRoute = () => (
  <ProductProvider>
    <CategoryProvider>
      <Outlet/>
    </CategoryProvider>
  </ProductProvider>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route
            element={
              <PrivateRoute>
                <PageLayout/>
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard/>}/>

            <Route element={<ProductsRoute/>}>
              <Route path="/products/list" element={<AllProducts/>}/>
              <Route path="/products/low-stocks" element={<LowStocks/>}/>
            </Route>

            <Route
              path="/products/add"
              element={
                <ProductProvider>
                  <CategoryProvider>
                    <ProductDetailsProvider>
                      <Product/>
                    </ProductDetailsProvider>
                  </CategoryProvider>
                </ProductProvider>
              }
            />
            <Route
              path="/products/edit/:id"
              element={
                <ProductProvider>
                  <CategoryProvider>
                    <ProductDetailsProvider>
                      <Product/>
                    </ProductDetailsProvider>
                  </CategoryProvider>
                </ProductProvider>
              }
            />

            <Route
              path="/categories/list"
              element={
                <CategoryProvider>
                  <Categories/>
                </CategoryProvider>
              }
            />

            <Route
              path="/sales/add"
              element={
                <SalesProvider>
                  <AddSale/>
                </SalesProvider>
              }
            />

            <Route
              path="/sales/list"
              element={
                <SalesProvider>
                  <AllSales/>
                </SalesProvider>
              }
            />

            <Route
              path="/sales/returns"
              element={
                <SalesProvider>
                  <SaleReturns/>
                </SalesProvider>
              }
            />

            {/*<Route path="/purchases/list" element={<Purchases/>}/>*/}
            {/*<Route path="/purchases/add" element={<AddPurchase/>}/>*/}
            {/*<Route path="/returns/add" element={<AddReturn/>}/>*/}
            {/*<Route path="/returns/list" element={<Returns/>}/>*/}
            {/*<Route path="/customers" element={<Customers/>}/>*/}
            {/*<Route path="/suppliers" element={<Suppliers/>}/>*/}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
