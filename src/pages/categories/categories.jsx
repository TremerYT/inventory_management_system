import {useState} from "react";
import {Card, Input, Modal, Select, Table} from "antd";
import AddCategory from "../../components/modal/add_category.jsx";
import CustomHeader from "../../components/ui/custom_header.jsx";
import {useCategory} from "../../context/category_provider.jsx";
import {createCategoryColumns} from "../../utils/columns.jsx";

const Categories = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  const {
    categories,
    isLoading,
    isEditMode,
    setIsEditMode,
    updateCategory,
    deleteCategory,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    handleonCancel,
    isConfirmationOpen,
    categoryToDelete,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    setCategoryToEdit,
    categoryToEdit,
    form,
    createCategory
  } = useCategory();

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  const onEdit = (record) => {
    setIsEditMode(true);
    setCategoryToEdit(record);
    form.setFieldsValue({
      ...record,
      categoryImage: [{
        uid: "-1",
        name: "image.png",
        status: "done",
        url: record.categoryImage,
      }],
    });
    setIsCategoryModalOpen(true);
  };

  const columns = createCategoryColumns({
    onEdit: onEdit,
    onDelete: openDeleteConfirmation,
  });

  const filteredCategory = categories.filter((cat) => {
    const matchesSearch =
      cat.categoryName.toLowerCase().includes(searchText.toLowerCase()) ||
      cat.categoryCode.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus =
      selectedStatus === null || cat.isActive === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOnOk = async (values) => {
    if (isEditMode) {
      await updateCategory(values, categoryToEdit.id);
    } else {
      await createCategory(values);
    }
  };

  return (
    <>
      <CustomHeader
        title={"Categories"}
        subTitle={"Manage Your Categories"}
        buttonText={"Add Category"}
        handleOnClick={() => {
          setIsEditMode(false);
          setIsCategoryModalOpen(true);
        }}
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
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredCategory}
          pagination={{pageSize: 10}}
          loading={isLoading}
        />
        <AddCategory
          isOpen={isCategoryModalOpen}
          handleOk={handleOnOk}
          handleCancel={handleonCancel}
          loading={isLoading}
        />
      </Card>

      <Modal
        title="Confirm Delete"
        open={isConfirmationOpen}
        onOk={() => deleteCategory(categoryToDelete?.id)}
        onCancel={closeDeleteConfirmation}
        okText="Delete"
        okButtonProps={{danger: true, loading: isLoading}}
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
