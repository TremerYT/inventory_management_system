import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import PageLayout from './components/layout/layout.jsx';
import './index.css';

import Dashboard from './pages/dashboard/dashboard.jsx';

import { AuthProvider } from './context/auth/auth_provider.jsx';
import { BrandProvider } from './context/brand/brand_provider.jsx';
import { CategoryProvider } from './context/category/category_provider.jsx';
import { CustomerProvider } from './context/customer/customer_provider.jsx';
import { ProductProvider } from './context/product/product_context.jsx';
import { ProductDetailsProvider } from './context/product/product_details_context.jsx';
import { PurchaseProvider } from './context/purchases/purchases_provider.jsx';
import { SalesProvider } from './context/sales/sales_provider.jsx';
import { SupplierProvider } from './context/supplier/supplier_provider.jsx';
import Login from './pages/authentication/login.jsx';
import PrivateRoute from './pages/authentication/private_route.jsx';
import Register from './pages/authentication/register.jsx';
import Brands from './pages/brand/brands.jsx';
import Categories from './pages/categories/categories.jsx';
import AddCustomers from './pages/people/add_customers.jsx';
import AddSuppliers from './pages/people/add_suppliers.jsx';
import Customers from './pages/people/customers.jsx';
import Suppliers from './pages/people/suppliers.jsx';
import AllProducts from './pages/products/all_products.jsx';
import LowStocks from './pages/products/low_stocks.jsx';
import Product from './pages/products/product.jsx';
import AddPurchase from './pages/purchases/add_purchase.jsx';
import PurchaseReturns from './pages/purchases/purchase_returns.jsx';
import Purchases from './pages/purchases/purchases.jsx';
import AddSale from './pages/sales/add_sale.jsx';
import AllSales from './pages/sales/list_sales.jsx';
import SaleReturns from './pages/sales/sale_returns.jsx';

const ProductsRoute = () => (
  <ProductProvider>
    <CategoryProvider>
      <Outlet />
    </CategoryProvider>
  </ProductProvider>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <PrivateRoute>
                <PageLayout />
              </PrivateRoute>
            }
          >
            <Route
              path="/dashboard"
              element={
                <ProductProvider>
                  <Dashboard />
                </ProductProvider>
              }
            />

            <Route element={<ProductsRoute />}>
              <Route path="/products/list" element={<AllProducts />} />
              <Route path="/products/low-stocks" element={<LowStocks />} />
            </Route>

            <Route
              path="/products/add"
              element={
                <ProductProvider>
                  <CategoryProvider>
                    <BrandProvider>
                      <ProductDetailsProvider>
                        <Product />
                      </ProductDetailsProvider>
                    </BrandProvider>
                  </CategoryProvider>
                </ProductProvider>
              }
            />
            <Route
              path="/products/edit/:id"
              element={
                <ProductProvider>
                  <CategoryProvider>
                    <BrandProvider>
                      <ProductDetailsProvider>
                        <Product />
                      </ProductDetailsProvider>
                    </BrandProvider>
                  </CategoryProvider>
                </ProductProvider>
              }
            />

            <Route
              path="/categories/list"
              element={
                <CategoryProvider>
                  <Categories />
                </CategoryProvider>
              }
            />
            <Route
              path="/brands/list"
              element={
                <BrandProvider>
                  <Brands />
                </BrandProvider>
              }
            />

            <Route
              path="/sales/add"
              element={
                <CustomerProvider>
                  <SalesProvider>
                    <AddSale />
                  </SalesProvider>
                </CustomerProvider>
              }
            />

            <Route
              path="/sales/list"
              element={
                <SalesProvider>
                  <AllSales />
                </SalesProvider>
              }
            />

            <Route
              path="/sales/returns"
              element={
                <CustomerProvider>
                  <SalesProvider>
                    <SaleReturns />
                  </SalesProvider>
                </CustomerProvider>
              }
            />

            <Route
              path="/purchases/add"
              element={
                <PurchaseProvider>
                  <AddPurchase />
                </PurchaseProvider>
              }
            />
            <Route
              path="/purchases/list"
              element={
                <PurchaseProvider>
                  <Purchases />
                </PurchaseProvider>
              }
            />
            <Route
              path="/purchases/returns"
              element={
                <PurchaseProvider>
                  <PurchaseReturns />
                </PurchaseProvider>
              }
            />
            <Route
              path="/customers/add"
              element={
                <CustomerProvider>
                  <AddCustomers />
                </CustomerProvider>
              }
            />
            <Route
              path="/customers/list"
              element={
                <CustomerProvider>
                  <Customers />
                </CustomerProvider>
              }
            />
            <Route
              path="/suppliers/add"
              element={
                <SupplierProvider>
                  <AddSuppliers />
                </SupplierProvider>
              }
            />

            <Route
              path="/suppliers/list"
              element={
                <SupplierProvider>
                  <Suppliers />
                </SupplierProvider>
              }
            />

            {/*<Route path="/returns/add" element={<AddReturn/>}/>*/}
            {/*<Route path="/returns/list" element={<Returns/>}/>*/}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
