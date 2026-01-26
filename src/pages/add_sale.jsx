import {Button, Card, Descriptions, Space, Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import SalesForm from "../components/forms/sales_form.jsx";
import {useProduct} from "../context/product_context.jsx";

const AddSale = () => {
  const {saleItems, setSaleItems, calculateSubTotal, handleQuantityChange} =
    useProduct();

  const handleDeleteItem = (record) => {
    setSaleItems((prev) =>
      prev.filter((item) => item.skuNumber !== record.skuNumber),
    );
  };

  const customColumns = [
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      key: "quantity",
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
          <span style={{minWidth: 24, textAlign: "center"}}>
            {record.quantity}
          </span>
          <Button
            size="small"
            type="primary"
            onClick={() => handleQuantityChange(record, 1)}
          >
            +
          </Button>
        </Space>
      ),
    },
    {
      title: "Discount Type",
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: "Discount",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined style={{color: "red"}}/>}
            onClick={() => handleDeleteItem(record)}
          />
        </Space>
      ),
    },
  ];

  const summaryItems = [
    {
      label: "Total Items",
      value: saleItems.length,
    },
    {
      label: "Total Amount",
      value: saleItems.reduce((sum, i) => sum + i.price, 0).toFixed(2),
    },
    {
      label: "Total Discount",
      value: saleItems
        .reduce(
          (sum, i) =>
            sum +
            (i.discountType === "percentage"
              ? (i.discountValue * i.price) / 100
              : i.discountValue),
          0
        )
        .toFixed(2),
    },
    {
      label: "Grand Total",
      value: saleItems.reduce((sum, i) => sum + i.subTotal, 0).toFixed(2),
    },
  ];


  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">Create Sale</h2>
          <p>Create and manage your sales</p>
        </div>
      </div>
      <Card>
        <SalesForm/>
        <Table
          columns={customColumns}
          dataSource={saleItems}
          rowKey="skuNumber"
        />
        {saleItems.length > 0 && (
          <div className="flex justify-end">
            <Descriptions
              bordered
              size="small"
              layout="horizontal"
              column={1}
              className="w-1/2"
            >
              {summaryItems.map((item) => (
                <Descriptions.Item key={item.label} label={item.label}>
                  {item.value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </div>

        )}
      </Card>
    </>
  );
};

export default AddSale;
