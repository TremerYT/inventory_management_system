import {useMemo, useState} from "react";
import {Card, Input, Modal, Select, Table} from "antd";
import {categoryColumns} from "../../utils/columns.jsx";
import AddCategory from "../../components/modal/add_category.jsx";
import {useCategory} from "../../context/category_provider.jsx";
import CustomHeader from "../../components/ui/custom_header.jsx";

const Categories = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const {
    form,
    isModalOpen,
    setIsEditMode,
    categories,
    setSearchText,
    isLoading,
    filteredCategory,
    setSelectedStatus,
    categoryFilter,
    addCategory,
    handleOnDelete,
    handleOnOk,
    handleCancel,
    setIsModalOpen,
    editingCategoryId,
    setEditingCategoryId,
    fetchCategories
  } = useCategory();

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    await handleOnDelete(categoryToDelete.id);
    setConfirmationOpen(false);
    setCategoryToDelete(null);
  }

  const handleEdit = (record) => {
    setIsEditMode(true);
    setIsModalOpen(true);
    setEditingCategoryId(record.id);
    form.setFieldsValue({
      categoryName: record.categoryName,
      isActive: record.isActive,
      categoryImage: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: record.categoryImage,
        }
      ]
    })
  }

  const handleDelete = (record) => {
    setCategoryToDelete(record);
    setConfirmationOpen(true);
  }

  const cancelDelete = () => {
    setConfirmationOpen(false);
    setCategoryToDelete(null);
  };

  const columns = useMemo(
    () =>
      categoryColumns({
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [handleEdit, handleDelete]
  )

  return (
    <>
      <CustomHeader
        title={"Categories"}
        subTitle={"Manage Your Categories"}
        buttonText={"Add Category"}
        handleOnClick={() => setIsModalOpen(true)}
      />

      <Card
        title={
          <Input.Search
            placeholder="Search category name or code"
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
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredCategory}
          pagination={{pageSize: 10}}
          loading={isLoading}
        />
        <AddCategory
          isOpen={isModalOpen}
          handleOk={handleOnOk}
          handleCancel={() => setIsModalOpen(false)}
          loading={isLoading}
        />
      </Card>

      <Modal
        open={isConfirmationOpen}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        okButtonProps={{danger: true}}
      >
        <p>
          Are you sure you want to delete{" "}
          <strong>{categoryToDelete?.categoryName}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default Categories;
