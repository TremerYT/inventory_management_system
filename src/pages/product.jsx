import {Button, Form, message} from "antd";
import ProductDetails from "../components/forms/product_details.jsx";
import ProductMetrics from "../components/forms/product_metrics.jsx";
import ProductImages from "../components/forms/product-images.jsx";
import {useProduct} from "../context/product_context.jsx";


const Product = () => {
  const {form, handleOnFinish, handleOnCancel, submitting} = useProduct();
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleOnFinish}
    >
      <div className="flex flex-col gap-6">
        <ProductDetails/>
        <ProductMetrics/>
        <ProductImages/>
      </div>
      <div className="flex gap-4 justify-end mt-10">
        <Button type="primary" htmlType="submit" size="large" loading={submitting}>
          Add Product
        </Button>
        <Button type="primary" danger onClick={handleOnCancel} size="large">
          Cancel
        </Button>
      </div>
    </Form>
  );
}

export default Product;
