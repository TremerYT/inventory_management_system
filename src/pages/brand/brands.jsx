import CustomHeader from "../../components/ui/custom_header.jsx";
import {useBrand} from "../../context/brand/brand_provider.jsx";
import {exportToExcel, exportToPdf} from "../../utils/file_convert.js";
import {createBrandColumns} from "../../utils/columns.jsx";
import {Card, Input, Modal, Select, Table} from "antd";
import {useState} from "react";
import AddBrand from "../../components/modal/add_brand.jsx";

const Brands = () => {
  const {
    form,
    brands,
    setIsEditMode,
    setIsBrandModalOpen,
    openDeleteConfirmation,
    setBrandToEdit,
    isLoading,
    isConfirmationOpen,
    deleteBrand,
    closeDeleteConfirmation,
    brandToDelete,
    handleOnCancel,
    isBrandModalOpen,
    isEditMode,
    addBrand,
    updateBrand,
  } = useBrand();
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleOnEdit = (record) => {
    setIsEditMode(true);
    form.setFieldsValue({
      ...record,
      brandImage: [{
        uid: "-1",
        name: "image.png",
        status: "done",
        url: record.brandImage,
      }],
    });
    setIsBrandModalOpen(true);
  }

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      !searchText || (
        (brand.brandName?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
        (brand.brandCode?.toLowerCase().includes(searchText.toLowerCase()) || '')
      );
    const matchesStatus =
      selectedStatus === null || brand.isActive === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOk = async (values) => {
    if (isEditMode) {
      await updateBrand(values, form.getFieldValue("id"));
    } else {
      await addBrand(values);
    }
  };

  const columns = createBrandColumns(
    {
      onEdit: handleOnEdit,
      onDelete: openDeleteConfirmation
    }
  )
  return (
    <>
      <CustomHeader
        title="Brands"
        subTitle="Manage Your Brands"
        buttonText="Add Brand"
        handleOnClick={() => {
          setIsEditMode(false);
          form.resetFields();
          setIsBrandModalOpen(true);
        }}
        handlePdfExport={() => exportToPdf(filteredBrands, columns, "brands")}
        handleExcelExport={() => exportToExcel(filteredBrands, columns, "brands")}
      />
      <Card
        title={
          <Input.Search
            placeholder="Search brand name or code"
            allowClear
            className="w-1/4!"
            onChange={(e) => setSearchText(e.target.value)}
          />
        }
        extra={
          <Select
            placeholder="Filter by status"
            allowClear
            options={[
              {label: "Active", value: true},
              {label: "Inactive", value: false}
            ]}
            className="w-40!"
            onChange={(value) => setSelectedStatus(value)}
          />
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredBrands}
          pagination={{pageSize: 10}}
          loading={isLoading}
        />
        <AddBrand
          handleOk={handleOk}
          handleCancel={handleOnCancel}
          isOpen={isBrandModalOpen}
        />
      </Card>

      <Modal
        title="Confirm Delete"
        open={isConfirmationOpen}
        onOk={() => deleteBrand(brandToDelete?.id)}
        onCancel={closeDeleteConfirmation}
        okText="Delete"
        okButtonProps={{danger: true, loading: isLoading}}
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{brandToDelete?.brandName}</strong>?
        </p>
      </Modal>
    </>
  );
}

export default Brands;