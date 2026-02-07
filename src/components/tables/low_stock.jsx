import {Card, Input, Select, Table} from "antd";
import {lowStockColumns} from "../../utils/columns.jsx";
import {useProduct} from "../../context/product/product_context.jsx";
import {useCategory} from "../../context/category/category_provider.jsx";
import {useState} from "react";

const LowStockTable = () => {
  const {loadingLowStock, setSelectedCategory, setSearchText, lowStockProducts} = useProduct();
  const {categoryFilter} = useCategory();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };
  return (
    <Card
      title={
        <Input.Search
          placeholder="Search product name, SKU"
          allowClear
          className="w-1/4!"
          onChange={(e) => setSearchText(e.target.value)}
        />
      }
      extra={
        <div className="flex gap-2 w-80">
          <Select
            placeholder="Category"
            allowClear
            options={categoryFilter}
            className="w-full!"
            onChange={(value) => setSelectedCategory(value)}
          />
        </div>
      }
    >
      <Table
        rowSelection={rowSelection}
        columns={lowStockColumns}
        dataSource={lowStockProducts}
        pagination={{pageSize: 10}}
        loading={loadingLowStock}
      />
    </Card>
  );
}

export default LowStockTable;