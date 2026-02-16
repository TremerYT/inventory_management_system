import {Card} from "antd";
import SupplierForm from "../../components/forms/supplier_form.jsx";

const AddSuppliers = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">Create Supplier</h2>
          <p>Create and manage your supplier</p>
        </div>
      </div>
      <Card>
        <SupplierForm/>
      </Card>
    </>
  );
}

export default AddSuppliers;