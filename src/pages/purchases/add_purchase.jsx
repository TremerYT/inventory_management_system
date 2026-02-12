import {Button, Card, Descriptions, Table} from "antd";
import PurchaseForm from "../../components/forms/purchase_form.jsx";
import {usePurchase} from "../../context/purchases/purchases_provider.jsx";
import {addPurchaseColumns} from "../../utils/columns.jsx";

const AddPurchase = () => {
  const {
    purchaseItems: saleItems,
    setPurchaseItems: setSaleItems,
    isLoading: submitting,
    handleQuantityChange,
    form,
    summaryItems
  } = usePurchase();

  const handleDeleteItem = (record) => {
    setSaleItems((prev) =>
      prev.filter((item) => item.skuNumber !== record.skuNumber),
    );
  };

  const handleOnCancel = () => {
    form.resetFields();
  }

  const customColumns = addPurchaseColumns(handleQuantityChange, handleDeleteItem);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">Create Purchase</h2>
          <p>Create and manage your purchases</p>
        </div>
      </div>
      <Card>
        <PurchaseForm/>
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
        <div className="flex gap-4 justify-end mt-10">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={submitting}
          >
            Add Purchase
          </Button>
          <Button type="primary" danger onClick={handleOnCancel} size="large">
            Cancel
          </Button>
        </div>
      </Card>
    </>
  );
}

export default AddPurchase;
