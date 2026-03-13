import { Card, Input, Modal, Select, Table } from 'antd';
import { useState } from 'react';
import AddExpense from '../components/modal/add_expense.jsx';
import AddExpenseCategory from '../components/modal/add_expense_category.jsx';
import CustomHeader from '../components/ui/custom_header.jsx';
import { useExpense } from '../context/expense/expense_provider.jsx';
import { useExpenseCategory } from '../context/expense_category/expense_category_provider.jsx';
import { createExpenseColumns } from '../utils/columns.jsx';
import { exportToExcel, exportToPdf } from '../utils/file_convert.js';

const Expenses = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { isLoading, expenses, deleteExpenses, fetchExpenses, fetchExpensesById, setIsEditMode } =
    useExpense();

  const {
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    handleCloseModal,
    createExpenseCategory,
    form,
    isLoading: categoryLoading,
    categoryOptions,
  } = useExpenseCategory();

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      !searchText ||
      expense.expenseName?.toLowerCase().includes(searchText.toLowerCase()) ||
      '' ||
      expense.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      '';
    const matchesCategory =
      selectedCategory === null || expense.expenseCategoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const columns = createExpenseColumns({
    onView: (id) => {
      fetchExpensesById(id);
      setIsEditMode(true);
      setIsModalOpen(true);
    },
    onEdit: (record) => {
      fetchExpensesById(record.id);
      setIsEditMode(true);
      setIsModalOpen(true);
    },
    onDelete: (record) => {
      setExpenseToDelete(record);
      setIsConfirmationOpen(true);
    },
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  const confirmDelete = async () => {
    if (expenseToDelete) {
      await deleteExpenses(expenseToDelete.id);
      setIsConfirmationOpen(false);
      setExpenseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsConfirmationOpen(false);
    setExpenseToDelete(null);
  };

  const handleAddExpense = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCategoryModalOk = async (values) => {
    try {
      await createExpenseCategory(values);
    } catch (error) {
      console.error('Category operation failed:', error);
    }
  };

  return (
    <>
      <CustomHeader
        title={'Expenses'}
        subTitle={'Manage Your expenses'}
        buttonText={'Add Expense'}
        handlePdfExport={() => exportToPdf(expenses, columns, 'expenses')}
        handleExcelExport={() => exportToExcel(expenses, columns, 'expenses')}
        handleOnClick={handleAddExpense}
        handleReload={() => fetchExpenses()}
      />

      <Card
        title={
          <Input.Search
            placeholder="Search expense name, description..."
            allowClear
            className="w-1/4!"
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={(value) => setSearchText(value)}
          />
        }
        extra={
          <div className="flex gap-2 w-80">
            <Select
              placeholder="Filter by category"
              allowClear
              options={categoryOptions}
              className="w-full!"
              onChange={(value) => setSelectedCategory(value)}
            />
          </div>
        }
      >
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredExpenses}
          pagination={{ pageSize: 10 }}
          loading={isLoading}
          rowKey="id"
        />
      </Card>

      <AddExpense
        isOpen={isModalOpen}
        handleCancel={handleModalClose}
        onOpenCategoryModal={handleOpenCategoryModal}
      />

      <AddExpenseCategory
        isOpen={isCategoryModalOpen}
        handleCancel={handleCloseModal}
        handleOk={handleCategoryModalOk}
        loading={categoryLoading}
      />

      <Modal
        open={isConfirmationOpen}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete <strong>{expenseToDelete?.expenseName}</strong>?
        </p>
      </Modal>
    </>
  );
};

export default Expenses;
