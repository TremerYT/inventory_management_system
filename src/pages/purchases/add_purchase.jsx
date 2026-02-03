import {Button, Card, Descriptions, Table} from "antd";
import CustomHeader from "../../components/ui/custom_header.jsx";
import PurchaseForm from "../../components/forms/purchase_form.jsx";
import {useSale} from "../../context/sales_context.jsx";
import {addPurchaseColumns} from "../../utils/columns.jsx";

const AddPurchase = () => {
  const {
    saleItems,
    setSaleItems,
    submitting,
    handleQuantityChange,
    form,
    summaryItems
  } = useSale();

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
      <CustomHeader title="Add Purchase" subTitle="Create and manage your Purchases"/>
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
            Add Sale
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
