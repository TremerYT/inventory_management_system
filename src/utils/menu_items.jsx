import {
  FaBox,
  FaBoxOpen,
  FaChartBar,
  FaCog,
  FaMoneyBillWave,
  FaShoppingCart,
  FaSignOutAlt,
  FaStore,
  FaTachometerAlt,
  FaTags,
  FaTrademark,
  FaTruck,
  FaUndoAlt,
  FaUser,
  FaUsers,
  FaWarehouse
} from "react-icons/fa";
import {useNavigate} from "react-router";
import {useAuth} from "../context/auth/auth_provider.jsx";

const getItems = (key, icon, label, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};


export const items = [
  getItems("/dashboard", <FaTachometerAlt/>, "Dashboard"),
  getItems("/products", <FaBoxOpen/>, "Products", [
    getItems("/products/add", null, "Add Product"),
    getItems("/products/list", null, "List Products"),
    getItems("/products/low-stocks", null, "Low Stocks"),
  ]),
  getItems("/categories", <FaTags/>, "Categories", [
    getItems("/categories/list", null, "List Categories"),
  ]),
  getItems("/brands", <FaTrademark/>, "Brands", [
    getItems("/brands/list", null, "List Brands"),
  ]),
  getItems("/sales", <FaShoppingCart/>, "Sales", [
    getItems("/sales/add", null, "Create Sale"),
    getItems("/sales/list", null, "List Sales"),
  ]),
  getItems("/purchases", <FaTruck/>, "Purchases", [
    getItems("/purchases/add", null, "Add Purchases"),
    getItems("/purchases/list", null, "List Purchases"),
    getItems("/purchases/returns", null, "Purchase Returns"),
  ]),
  getItems("/Expenses", <FaMoneyBillWave/>, "Expenses", [
    getItems("/returns/list", null, "Add Expense"),
    getItems("/returns/add", null, "List Expenses"),
  ]),
  getItems("/people", <FaUsers/>, "People", [
    getItems("/customers/add", null, "Add Customers"),
    getItems("/customers/list", null, "List Customers"),
    getItems("/suppliers/add", null, "Add Suppliers"),
    getItems("/suppliers/list", null, "List Suppliers"),
  ]),
  getItems("/settings", <FaCog/>, "Settings"),
];

export const itemDropdown = [
  {
    icon: <FaBox/>,
    label: "Product",
    path: "/products/add",
  },
  {
    icon: <FaTruck/>,
    label: "Purchase",
    path: "/purchases/add",
  },
  {
    icon: <FaShoppingCart/>,
    label: "Sale",
    path: "/sales/list",
  },
  {
    icon: <FaStore/>,
    label: "Store",
    path: null,
  },
  {
    icon: <FaWarehouse/>,
    label: "Warehouse",
    path: null,
  },
  {
    icon: <FaUndoAlt/>,
    label: "Returns",
    path: "/returns/add",
  },
];

export const useProfileDropdown = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();

  return [
    {
      icon: <FaUser/>,
      label: "My Profile",
      onClick: () => navigate("/profile"),
    },
    {
      icon: <FaChartBar/>,
      label: "Analytics",
      onClick: () => navigate("/analytics"),
    },
    {
      icon: <FaCog/>,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      icon: <FaSignOutAlt/>,
      label: "Logout",
      onClick: logout,
    },
  ];
};


