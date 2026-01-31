import {Button, Table, Tabs} from "antd";
import {FileExcelFilled, FilePdfFilled, ReloadOutlined} from "@ant-design/icons";
import LowStockTable from "../../components/tables/low_stock.jsx";
import OutOfStockTable from "../../components/tables/out_of_stock.jsx";

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
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">Low Stocks</h2>
          <p>Manage Your Low and Out of Stock Products</p>
        </div>
        <div className="flex gap-3">
          <Button
            type="text"
            icon={<FilePdfFilled style={{fontSize: 20, color: "red"}}/>}
            onClick={() => {
            }}
          />
          <Button
            type="text"
            icon={<FileExcelFilled style={{fontSize: 20, color: "green"}}/>}
            onClick={() => {
            }}
          />
          <Button
            type="text"
            icon={<ReloadOutlined style={{fontSize: 20}}/>}
            onClick={() => {
            }}
          />
          <Button type="primary" onClick={()=>{}}>
            Send Email
          </Button>
        </div>
      </div>

      <div>
        <Tabs defaultActiveKey="1" items={tables}/>
      </div>
    </>
  );
};

export default LowStocks;