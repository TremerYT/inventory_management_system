import {useState} from "react";
import {useNavigate} from "react-router";
import {mockProducts, mockReturns} from "../../mock/mock_data.jsx";
import {Button, Card, Input, Select, Table} from "antd";
import {FileExcelFilled, FilePdfFilled, PlusOutlined, ReloadOutlined} from "@ant-design/icons";
import {brands, categories} from "../../utils/select_items.js";
import {returnsColumns} from "../../utils/columns.jsx";

const Returns = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const { searchText, filteredData, handleSearch, handleSelect } = useFilter(
    mockProducts,
    {
      searchFields: ["p", "skuNumber"],
      selectFields: ["category", "brand"],
    }
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">Returns</h2>
          <p>Manage Your Returns</p>
        </div>
        <div className="flex gap-3">
          <Button
            type="text"
            icon={<FilePdfFilled style={{ fontSize: 20, color: "red" }} />}
            onClick={() => {}}
          />
          <Button
            type="text"
            icon={<FileExcelFilled style={{ fontSize: 20, color: "green" }} />}
            onClick={() => {}}
          />
          <Button
            type="text"
            icon={<ReloadOutlined style={{ fontSize: 20 }} />}
            onClick={() => {}}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => {navigate('/returns/add')}}>
            Add Return
          </Button>
        </div>
      </div>
      <Card
        title={
          <Input.Search
            value={searchText}
            onChange={handleSearch}
            className="w-1/4!"
          />
        }
        extra={
          <div className="flex gap-2 w-80">
            <Select
              defaultValue="Category"
              options={categories}
              className="w-full!"
              onSelect={(value) => handleSelect("category", value)}
            />
            <Select
              defaultValue="Brand"
              options={brands}
              className="w-full!"
              onSelect={(value) => handleSelect("brand", value)}
            />
          </div>
        }
      >
        <Table
          rowSelection={rowSelection}
          columns={returnsColumns}
          dataSource={mockReturns}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </>
  );
}

export default Returns;