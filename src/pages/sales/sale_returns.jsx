import {Card, Input, Select, Table} from "antd";
import {paymentStatus, saleStatus} from "../../utils/select_items.js";
import {saleReturnsColumns} from "../../utils/columns.jsx";
import {saleReturnsMockData} from "../../mock/mock_data.jsx";
import CustomHeader from "../../components/ui/custom_header.jsx";
import {useState} from "react";
import SaleReturnsModal from "../../components/modal/sale_returns_modal.jsx";
import {useSale} from "../../context/sales/sales_provider.jsx";

const SaleReturns = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {isSalesReturnModalOpen, setIsSalesReturnModalOpen} = useSale()
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };
  return (
    <>
      <CustomHeader
        title={"Sale Returns"}
        subTitle={"Manage Your Sale Returns"}
        buttonText={"Add Return"}
        handleOnClick={() => setIsSalesReturnModalOpen(true)}
      />
      <Card
        title={
          <Input.Search
            placeholder="Search customer name"
            allowClear
            className="w-1/4!"
          />
        }
        extra={
          <div className="flex gap-2 w-80">
            <Select
              placeholder="Payment Status"
              allowClear
              options={paymentStatus}
              className="w-full!"
            />
            <Select
              placeholder="Sale status"
              allowClear
              options={saleStatus}
              className="w-full!"
            />
          </div>
        }
      >
        <Table
          pagination={{pageSize: 10}}
          rowSelection={rowSelection}
          rowKey="key"
          columns={saleReturnsColumns}
          dataSource={saleReturnsMockData}
        />
      </Card>
      <SaleReturnsModal isModalOpen={isSalesReturnModalOpen}/>
    </>

  );
}

export default SaleReturns;