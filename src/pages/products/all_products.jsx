import { Card, Input, Modal, Select, Table } from "antd";
import { useState } from "react";
import { createProductColumns } from "../../utils/columns.jsx";
import { useProduct } from "../../context/product_context.jsx";
import { useCategory } from "../../context/category_provider.jsx";
import ProductView from "../../components/modal/product_view.jsx";
import CustomHeader from "../../components/ui/custom_header.jsx";
import {exportToExcel, exportToPdf} from "../../utils/file_convert.js";
import {useNavigate} from "react-router";

const AllProducts = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {
    loadingProducts,
    setSelectedCategory,
    setSearchText,
    products,
    handleOnDelete,
    filteredData,
    fetchProducts,
    handleView,
    handleOnOk,
    handleEdit,
    handleDelete,
    confirmDelete,
    cancelDelete,
    selectedProduct,
    isConfirmationOpen,
    isModalOpen,
    productToDelete
  } = useProduct();

  const { categoryFilter } = useCategory();
  const navigate = useNavigate();

  const columns = createProductColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  return (
    <>
      <CustomHeader
        title={"Products"}
        subTitle={"Manage Your products"}
        buttonText={"Add product"}
        handlePdfExport={() => exportToPdf(filteredData, columns)}
        handleExcelExport={() => exportToExcel(filteredData, columns)}
        handleOnClick={() => navigate("/products/add")}
        handleReload={() => fetchProducts()}
      />

      <Card
        title={
          <Input.Search
            placeholder="Search product name, SKU, barcode..."
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
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          loading={loadingProducts}
          rowKey="skuNumber"
        />
      </Card>
      <ProductView/>
      <Modal
        open={isConfirmationOpen}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{productToDelete?.productName}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default AllProducts;
