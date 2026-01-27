import {Carousel, Col, Descriptions, Image, Modal, Row} from "antd";

const ProductView = ({isModalOpen, record, handleOnOK, handleOnCancel}) => {
  const productDescription = [
    {label: "Barcode Number", value: record?.barcodeNumber},
    {label: "SKU Number", value: record?.skuNumber},
    {label: "Product Name", value: record?.productName},
    {label: "Category", value: record?.categoryName},
    {label: "Brand", value: record?.brand},
    {label: "Description", value: record?.description},
    {label: "Quantity", value: record?.quantity},
    {label: "Cost Price", value: record?.costPrice},
    {label: "Unit Price", value: record?.unitPrice},
    {label: "Discount Value", value: record?.discountValue},
    {label: "Stock Alert", value: record?.minStock}
  ];

  return (
    <Modal open={isModalOpen} width={900} onOk={handleOnOK} onCancel={handleOnCancel}>
      <Row gutter={24}>
        <Col span={14}>
          <Descriptions layout="horizontal" column={1} bordered size="small">
            {productDescription.map((product) => (
              <Descriptions.Item key={product.label} label={product.label}>
                {product.value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Col>

        <Col span={10}>
          <Carousel arrows={true} infinite={false} dotPlacement="bottom">
            {record?.galleryImages?.map((image, index) => (
              <div
                key={index}
              >
                <Image
                  width="100%"
                  height={200}
                  src={image}
                  style={{ objectFit: "contain" }}
                  alt="product"
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>

    </Modal>
  );
};

export default ProductView;
