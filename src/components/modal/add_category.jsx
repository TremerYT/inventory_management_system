import {Form, Modal, Switch, Input, Upload} from "antd";
import {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {useCategory} from "../../context/category_provider.jsx";

const AddCategory = ({ isOpen, handleCancel, handleOk}) => {
  const {form} = useCategory();
  const [categoryImage, setCategoryImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await handleOk(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryImageChange = ({ fileList }) => {
    setCategoryImage(fileList);
  };

  return (
    <Modal
      title="Add Category"
      open={isOpen}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okButtonProps={{loading: loading}}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[{ required: true, message: "Category is Required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="categoryImage"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[
            { required: true, message: "Please upload at least one image" },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={categoryImage}
            onChange={handleCategoryImageChange}
            beforeUpload={() => false}
            maxCount={1}
          >
            {categoryImage.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategory;
