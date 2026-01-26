import {Descriptions, Modal} from "antd";

const ProductView = ({isModalOpen, record}) => {
  return (
    <Modal open={isModalOpen} record>
      <Descriptions></Descriptions>
    </Modal>
  );
}

export default ProductView;