import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Space, Tag, Tooltip } from 'antd';
import { FaFileInvoice } from 'react-icons/fa';

export const createProductColumns = ({ onView, onEdit, onDelete }) => [
  {
    title: 'SKU',
    dataIndex: 'skuNumber',
    key: 'skuNumber',
  },
  {
    title: 'Barcode',
    dataIndex: 'barcodeNumber',
    key: 'barcodeNumber',
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Brand',
    dataIndex: 'brandName',
    key: 'brandName',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EyeOutlined />} onClick={() => onView(record.id)} />
        <Button icon={<EditOutlined style={{ color: 'blue' }} />} onClick={() => onEdit(record)} />
        <Button
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          onClick={() => onDelete(record)}
        />
      </Space>
    ),
  },
];

export const createCategoryColumns = ({ onEdit, onDelete }) => [
  {
    title: 'Category Code',
    dataIndex: 'categoryCode',
    key: 'categoryCode',
  },
  {
    title: 'Category Name',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Created on',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive) => (
      <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined style={{ color: 'blue' }} />} onClick={() => onEdit(record)} />
        <Button
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          onClick={() => onDelete(record)}
        />
      </Space>
    ),
  },
];

export const createBrandColumns = ({ onEdit, onDelete }) => [
  {
    title: 'Brand Code',
    dataIndex: 'brandCode',
    key: 'brandCode',
  },
  {
    title: 'Brand Name',
    dataIndex: 'brandName',
    key: 'brandName',
  },
  {
    title: 'Created on',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive) => (
      <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined style={{ color: 'blue' }} />} onClick={() => onEdit(record)} />
        <Button
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          onClick={() => onDelete(record)}
        />
      </Space>
    ),
  },
];

export const createSalesColumns = (openViewModal) => [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Reference Number',
    dataIndex: 'referenceNumber',
    key: 'referenceNumber',
  },
  {
    title: 'Customer',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Sale Status',
    dataIndex: 'saleStatus',
    key: 'saleStatus',
    render: (status) => <Tag color={status === 'COMPLETED' ? 'green' : 'volcano'}>{status}</Tag>,
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    key: 'paymentStatus',
    render: (status) => <Tag color={status === 'COMPLETED' ? 'green' : 'volcano'}>{status}</Tag>,
  },
  {
    title: 'Shipping',
    dataIndex: 'shipping',
    key: 'shipping',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: 'Total',
    dataIndex: 'grandTotal',
    key: 'grandTotal',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: 'Paid',
    dataIndex: 'paid',
    key: 'paid',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: 'Due',
    dataIndex: 'due',
    key: 'due',
    render: (_, record) => {
      const grandTotal = Number(record.grandTotal) || 0;
      const paid = Number(record.paid) || 0;
      const due = grandTotal - paid;
      return `ksh${Math.max(0, due).toFixed(2)}`;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Tooltip title="View">
          <Button
            icon={<EyeOutlined style={{ color: 'blue' }} />}
            onClick={() => openViewModal(record)}
          />
        </Tooltip>

        <Tooltip title="Invoice">
          <Button icon={<FaFileInvoice style={{ color: 'blue' }} />} onClick={() => {}} />
        </Tooltip>

        <Tooltip title="Edit">
          <Button icon={<EditOutlined style={{ color: 'blue' }} />} onClick={() => {}} />
        </Tooltip>

        <Tooltip title="Add Payment">
          <Button
            icon={<PlusOutlined style={{ color: 'blue' }} />}
            disabled={
              Math.max(0, (Number(record.grandTotal) || 0) - (Number(record.paid) || 0)) === 0
            }
            onClick={() => {}}
          />
        </Tooltip>

        <Tooltip title="Delete">
          <Button danger icon={<DeleteOutlined />} onClick={() => {}} />
        </Tooltip>
      </Space>
    ),
  },
];

export const customersColumns = [
  {
    title: 'Customer Code',
    dataIndex: 'customerCode',
    key: 'customerCode',
  },
  {
    title: 'Customer Name',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Customer Type',
    dataIndex: 'customerCategory',
    key: 'customerCategory',
  },
  {
    title: 'Reward Points',
    dataIndex: 'rewardPoints',
    key: 'rewardPoints',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    render: (isActive) => (
      <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined style={{ color: 'blue' }} />} onClick={() => {}} />
        <Button icon={<DeleteOutlined style={{ color: 'red' }} />} onClick={() => {}} />
      </Space>
    ),
  },
];

export const createSuppliersColumns = ({ onEdit, onDelete }) => [
  {
    title: 'Supplier Id',
    dataIndex: 'supplierCode',
    key: 'supplierId',
  },
  {
    title: 'Supplier Name',
    key: 'fullName',
    render: (_, record) => `${record.firstName} ${record.lastName}`,
  },
  {
    title: 'Company',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined style={{ color: 'blue' }} />} onClick={() => onEdit(record)} />
        <Button
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          onClick={() => onDelete(record.id)}
        />
      </Space>
    ),
  },
];

export const suppliersColumn = createSuppliersColumns({
  onEdit: () => {},
  onDelete: () => {},
});

export const purchasesColumns = (openViewModal) => [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Reference Number',
    dataIndex: 'referenceNumber',
    key: 'referenceNumber',
  },
  {
    title: 'Supplier',
    dataIndex: 'supplierName',
    key: 'supplierName',
  },
  {
    title: 'Purchase Status',
    dataIndex: 'purchaseStatus',
    key: 'purchaseStatus',
    render: (status) => <Tag color={status === 'COMPLETED' ? 'green' : 'volcano'}>{status}</Tag>,
  },
  {
    title: 'Shipping',
    dataIndex: 'shipping',
    key: 'shipping',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: 'Total',
    dataIndex: 'grandTotal',
    key: 'grandTotal',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: 'Paid',
    dataIndex: 'paid',
    key: 'paid',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: 'Due',
    dataIndex: 'due',
    key: 'due',
    render: (_, record) => {
      const grandTotal = Number(record.grandTotal) || 0;
      const paid = Number(record.paid) || 0;
      const due = grandTotal - paid;
      return `ksh${Math.max(0, due).toFixed(2)}`;
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Tooltip title="View">
          <Button
            icon={<EyeOutlined style={{ color: 'blue' }} />}
            onClick={() => {
              console.log('View button clicked, record:', record);
              openViewModal(record);
            }}
          />
        </Tooltip>

        <Tooltip title="Edit">
          <Button icon={<EditOutlined style={{ color: 'blue' }} />} onClick={() => {}} />
        </Tooltip>

        <Tooltip title="Delete">
          <Button danger icon={<DeleteOutlined />} onClick={() => {}} />
        </Tooltip>
      </Space>
    ),
  },
];

export const saleReturnsColumns = [
  {
    title: 'Return Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Reference Number',
    dataIndex: 'returnNo',
    key: 'returnNo',
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Status',
    dataIndex: 'received',
    key: 'received',
    render: (status) => <Tag color={status === 'Yes' ? 'green' : 'volcano'}>{status}</Tag>,
  },
  {
    title: 'Refund',
    dataIndex: 'refund',
    key: 'refund',
    render: (value) => `KES ${Number(value).toLocaleString()}`,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EyeOutlined />} onClick={() => console.log('View return:', record)} />
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => console.log('Delete return:', record)}
        />
      </Space>
    ),
  },
];

export const purchaseReturnsColumns = [
  {
    title: 'Return Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Reference Number',
    dataIndex: 'returnNo',
    key: 'returnNo',
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Status',
    dataIndex: 'received',
    key: 'received',
    render: (status) => <Tag color={status === 'Yes' ? 'green' : 'volcano'}>{status}</Tag>,
  },
  {
    title: 'Refund',
    dataIndex: 'refund',
    key: 'refund',
    render: (value) => `KES ${Number(value).toLocaleString()}`,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EyeOutlined />} onClick={() => console.log('View return:', record)} />
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => console.log('Delete return:', record)}
        />
      </Space>
    ),
  },
];

export const lowStockColumns = [
  {
    title: 'SKU',
    dataIndex: 'skuNumber',
    key: 'skuNumber',
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Quantity remaining',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Alert Quantity',
    dataIndex: 'minStock',
    key: 'minStock',
  },
];

export const outOfStockColumns = [
  {
    title: 'SKU',
    dataIndex: 'skuNumber',
    key: 'skuNumber',
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Quantity remaining',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Alert Quantity',
    dataIndex: 'minStock',
    key: 'minStock',
  },
];

export const createExpenseColumns = ({ onView, onEdit, onDelete }) => [
  {
    title: 'Expense Name',
    dataIndex: 'expenseName',
    key: 'expenseName',
  },
  {
    title: 'Category',
    dataIndex: 'categoryName',
    key: 'categoryName',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Amount',
    dataIndex: 'expenseAmount',
    key: 'expenseAmount',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'PAID' ? 'green' : status === 'PENDING' ? 'orange' : 'red'}>
        {status}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button icon={<EditOutlined style={{ color: 'blue' }} />} onClick={() => onEdit(record)} />
        <Button
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          onClick={() => onDelete(record)}
        />
      </Space>
    ),
  },
];

export const addPurchaseColumns = (handleQuantityChange, handleDeleteItem) => [
  {
    title: 'SKU',
    dataIndex: 'skuNumber',
    key: 'skuNumber',
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    key: 'quantity',
    render: (_, record) => (
      <Space>
        <Button
          size="small"
          type="primary"
          onClick={() => handleQuantityChange(record, -1)}
          disabled={record.quantity <= 1}
        >
          -
        </Button>
        <span style={{ minWidth: 24, textAlign: 'center' }}>{record.quantity}</span>
        <Button size="small" type="primary" onClick={() => handleQuantityChange(record, 1)}>
          +
        </Button>
      </Space>
    ),
  },
  {
    title: 'Discount Type',
    dataIndex: 'discountType',
    key: 'discountType',
  },
  {
    title: 'Discount',
    dataIndex: 'discountValue',
    key: 'discountValue',
  },
  {
    title: 'Sub Total',
    dataIndex: 'subTotal',
    key: 'subTotal',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          icon={<DeleteOutlined style={{ color: 'red' }} />}
          onClick={() => handleDeleteItem(record)}
        />
      </Space>
    ),
  },
];
