import {Card} from "antd";
import CustomerForm from "../../components/forms/customers_form.jsx";

const AddCustomers = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">Create Customer</h2>
          <p>Create and manage your customers</p>
        </div>
      </div>
      <Card>
        <CustomerForm/>
      </Card>
    </>
  );
}

export default AddCustomers;