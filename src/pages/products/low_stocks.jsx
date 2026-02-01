import {Button, Table, Tabs} from "antd";
import {FileExcelFilled, FilePdfFilled, ReloadOutlined} from "@ant-design/icons";
import LowStockTable from "../../components/tables/low_stock.jsx";
import OutOfStockTable from "../../components/tables/out_of_stock.jsx";
import CustomHeader from "../../components/ui/custom_header.jsx";

const LowStocks = () => {
  const tables = [
    {
      key: '1',
      label: 'Low Stock',
      children: <LowStockTable/>
    },
    {
      key: '2',
      label: 'Out of Stock',
      children: <OutOfStockTable/>
    },
  ]
  return (
    <>
      <CustomHeader
        title={"Low Stocks"}
        subTitle={"Manage Your Low and Out of stocks Products"}
        buttonText={"Send Email"}
        handleOnClick={() => {}}
      />
      <div>
        <Tabs defaultActiveKey="1" items={tables}/>
      </div>
    </>
  );
};

export default LowStocks;