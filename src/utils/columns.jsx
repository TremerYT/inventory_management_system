import {Button, Space, Tag} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";

export const createProductColumns = ({onView, onEdit, onDelete}) => [
  {
    title: "SKU",
    dataIndex: "skuNumber",
    key: "skuNumber",
  },
  {
    title: "Barcode",
    dataIndex: "barcodeNumber",
    key: "barcodeNumber",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EyeOutlined/>} onClick={() => onView(record)}/>
        <Button icon={<EditOutlined style={{color: "blue"}}/>} onClick={() => onEdit(record)}/>
        <Button icon={<DeleteOutlined style={{color: "red"}}/>} onClick={() => onDelete(record)}/>
      </Space>
    ),
  },
];

export const categoryColumns = ({onEdit, onDelete}) => [
  {
    title: "Category Code",
    dataIndex: "categoryCode",
    key: "categoryCode",
  },
  {
    title: "Category Name",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Created on",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: "Status",
    dataIndex: "isActive",
    key: "isActive",
    render: (isActive) => (
      <Tag color={isActive ? "green" : "red"}>{isActive ? "Active" : "Inactive"}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined style={{color: "blue"}}/>}
          onClick={() => onEdit(record)}
        />
        <Button
          icon={<DeleteOutlined style={{color: "red"}}/>}
          onClick={() => onDelete(record)}
        />
      </Space>
    ),
  },
];

export const salesColumns = [
  {
    title: "Customer",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Reference Number",
    dataIndex: "referenceNumber",
    key: "referenceNumber",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Completed" ? "green" : "volcano"}>{status}</Tag>
    ),
  },
  {
    title: "Grand Total",
    dataIndex: "grandTotal",
    key: "grandTotal",
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: "Paid",
    dataIndex: "paid",
    key: "Paid",
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: "Amount Due",
    dataIndex: "due",
    key: "due",
    render: (_, record) => {
      const due = record.grandTotal - record.paid;
      return `ksh${(due || 0).toFixed(2)}`;
    },
  },
  {
    title: "Payment Status",
    dataIndex: "paymentStatus",
    key: "paymentStatus",
    render: (status) => {
      let color;

      switch (status.toLowerCase()) {
        case "paid":
          color = "green";
          break;
        case "overdue":
          color = "gold";
          break;
        case "unpaid":
          color = "volcano";
          break;
        default:
          color = "default";
      }
      const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

      return <Tag color={color}>{displayStatus}</Tag>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EyeOutlined style={{color: "blue"}}/>}
          onClick={() => {
          }}
        />
        <Button
          icon={<DeleteOutlined style={{color: "red"}}/>}
          onClick={() => {
          }}
        />
      </Space>
    ),
  },
];

export const customersColumns = [
  {
    title: "Customer Id",
    dataIndex: "customerId",
    key: "customerId",
  },
  {
    title: "Customer",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Postal Code",
    dataIndex: "postalCode",
    key: "postalCode",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined style={{color: "blue"}}/>}
          onClick={() => {
          }}
        />
        <Button
          icon={<DeleteOutlined style={{color: "red"}}/>}
          onClick={() => {
          }}
        />
      </Space>
    ),
  },
];

export const suppliersColumn = [
  {
    title: "Supplier Id",
    dataIndex: "supplierId",
    key: "supplierId",
  },
  {
    title: "Supplier",
    dataIndex: "supplierName",
    key: "supplierName",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Postal Code",
    dataIndex: "postalCode",
    key: "postalCode",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined style={{color: "blue"}}/>}
          onClick={() => {
          }}
        />
        <Button
          icon={<DeleteOutlined style={{color: "red"}}/>}
          onClick={() => {
          }}
        />
      </Space>
    ),
  },
];

export const purchasesColumns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: "Purchase Number",
    dataIndex: "purchaseNumber",
    key: "purchaseNumber",
  },
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Paid",
    dataIndex: "paid",
    key: "paid",
  },
  {
    title: "Balance",
    dataIndex: "balance",
    key: "balance",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined style={{color: "blue"}}/>}
          onClick={() => {
          }}
        />
        <Button
          icon={<DeleteOutlined style={{color: "red"}}/>}
          onClick={() => {
          }}
        />
      </Space>
    ),
  },
];

export const returnsColumns = [
  {
    title: "Return Date",
    dataIndex: "date",
    key: "date",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: "Return No",
    dataIndex: "returnNo",
    key: "returnNo",
  },
  {
    title: "Product",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "Status",
    dataIndex: "received",
    key: "received",
    render: (status) => (
      <Tag color={status === "Yes" ? "green" : "volcano"}>
        {status}
      </Tag>
    ),
  },
  {
    title: "Refund",
    dataIndex: "refund",
    key: "refund",
    render: (value) => `KES ${Number(value).toLocaleString()}`,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EyeOutlined/>}
          onClick={() => console.log("View return:", record)}
        />
        <Button
          danger
          icon={<DeleteOutlined/>}
          onClick={() => console.log("Delete return:", record)}
        />
      </Space>
    ),
  },
];

export const lowStockColumns = [
  {
    title: "SKU",
    dataIndex: "skuNumber",
    key: "skuNumber",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Quantity remaining",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Alert Quantity",
    dataIndex: "minStock",
    key: "minStock",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined style={{color: "blue"}}/>}
          onClick={() => {
          }}
        />
        <Button
          icon={<DeleteOutlined style={{color: "red"}}/>}
          onClick={() => {
          }}
        />
      </Space>
    ),
  },
];

export const outOfStockColumns = [
  {
    title: "SKU",
    dataIndex: "skuNumber",
    key: "skuNumber",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
  },
  {
    title: "Quantity remaining",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Alert Quantity",
    dataIndex: "minStock",
    key: "minStock",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<EditOutlined style={{color: "blue"}}/>}
          onClick={() => {
          }}
        />
        <Button
          icon={<DeleteOutlined style={{color: "red"}}/>}
          onClick={() => {
          }}
        />
      </Space>
    ),
  },
]
