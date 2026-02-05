import {Form, Input, Modal, Switch, Upload} from "antd";
import {useEffect} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {useCategory} from "../../context/category_provider.jsx";

const AddCategory = ({isOpen, handleCancel, handleOk, loading}) => {
  const {form, isEditMode} = useCategory();

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen]);


  const onFinish = async (values) => {
    try {
      await handleOk(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={isEditMode ? "Update Category" : "Add Category"}
      open={isOpen}
      onOk={() => form.submit()}
      okText={isEditMode ? "Update Category" : "Add Category"}
      onCancel={handleCancel}
      okButtonProps={{loading: loading}}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[{required: true, message: "Category is Required"}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="categoryImage"
          label="Category Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[
            {required: true, message: "Please upload at least one image"},
          ]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={1}
          >
            <div>
              <PlusOutlined/>
              <div style={{marginTop: 8}}>Upload</div>
            </div>

          </Upload>
        </Form.Item>
        <Form.Item name="isActive" valuePropName="checked">
          <Switch/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategory;
