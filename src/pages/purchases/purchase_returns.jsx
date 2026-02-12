import {Card, Input, Table} from "antd";
import {purchaseReturnsColumns} from "../../utils/columns.jsx";
import {purchaseReturnsMockData} from "../../mock/mock_data.jsx";
import CustomHeader from "../../components/ui/custom_header.jsx";
import PurchaseReturnsModal from "../../components/modal/purchase_returns_modal.jsx";
import {usePurchase} from "../../context/purchases/purchases_provider.jsx";

const PurchaseReturns = () => {
  const {isPurchaseReturnModalOpen, setIsPurchaseReturnModalOpen} = usePurchase();

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <>
      <CustomHeader
        title={"Purchase Returns"}
        subTitle={"Manage Your Purchase Returns"}
        buttonText={"Add Return"}
        handleOnClick={() => setIsPurchaseReturnModalOpen(true)}
      />
      <Card
        title={
          <Input.Search
            placeholder="Search supplier name"
            allowClear
            className="w-1/4!"
          />
        }
      >
        <Table
          pagination={{pageSize: 10}}
          rowSelection={rowSelection}
          rowKey="key"
          columns={purchaseReturnsColumns}
          dataSource={purchaseReturnsMockData}
        />
      </Card>
      <PurchaseReturnsModal isModalOpen={isPurchaseReturnModalOpen}/>
    </>
  );
}

export default PurchaseReturns;
