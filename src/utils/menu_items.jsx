import {
  FaBoxOpen,
  FaChartBar,
  FaShoppingCart,
  FaTachometerAlt,
  FaTags,
  FaTruck,
  FaUndoAlt,
  FaUsers,
  FaCog,
  FaBox,
  FaStore,
  FaWarehouse,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";
import useAuth  from "../hooks/useAuth.js";
import { useNavigate } from "react-router";

const getItems = (key, icon, label, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};


export const items = [
  getItems("/dashboard", <FaTachometerAlt />, "Dashboard"),
  getItems("/products", <FaBoxOpen />, "Products", [
    getItems("/products/add", null, "Add Product"),
    getItems("/products/list", null, "List Products"),
    getItems("/products/low-stocks", null, "Low Stocks"),
  ]),
  getItems("/categories", <FaTags />, "Categories", [
    getItems("/categories/list", null, "List Categories"),
  ]),
  getItems("/sales", <FaShoppingCart />, "Sales", [
    getItems("/sales/add", null, "Create Sale"),
    getItems("/sales/list", null, "List Sales"),
    getItems("/sales/returns", null, "Sales Returns"),
  ]),
  getItems("/purchases", <FaTruck />, "Purchases", [
    getItems("/purchases/list", null, "List Purchases"),
    getItems("/purchases/add", null, "Add Purchases"),
    getItems("/purchases/invoices", null, "Supplier Invoices"),
  ]),
  getItems("/returns", <FaUndoAlt />, "Returns", [
    getItems("/returns/list", null, "All Returns"),
    getItems("/returns/add", null, "Add Return"),
  ]),
  getItems("/people", <FaUsers />, "People", [
    getItems("/customers", null, "Customers"),
    getItems("/suppliers", null, "Suppliers"),
  ]),
  getItems("/analytics", <FaChartBar />, "Analytics"),
  getItems("/settings", <FaCog />, "Settings"),
];

export const itemDropdown = [
  {
    icon: <FaBox />,
    label: "Product",
    path: "/products/add",
  },
  {
    icon: <FaTruck />,
    label: "Purchase",
    path: "/purchases/add",
  },
  {
    icon: <FaShoppingCart />,
    label: "Sale",
    path: "/sales/list",
  },
  {
    icon: <FaStore />,
    label: "Store",
    path: null,
  },
  {
    icon: <FaWarehouse />,
    label: "Warehouse",
    path: null,
  },
  {
    icon: <FaUndoAlt />,
    label: "Returns",
    path: "/returns/add",
  },
];

export const useProfileDropdown = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return [
    {
      icon: <FaUser />,
      label: "My Profile",
      onClick: () => navigate("/profile"),
    },
    {
      icon: <FaChartBar />,
      label: "Analytics",
      onClick: () => navigate("/analytics"),
    },
    {
      icon: <FaCog />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      icon: <FaSignOutAlt />,
      label: "Logout",
      onClick: logout,
    },
  ];
};
