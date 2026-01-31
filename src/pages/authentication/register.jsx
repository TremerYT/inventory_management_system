import AuthLayout from "../../components/layout/auth_layout.jsx";
import RegisterForm from "../../components/forms/register_form.jsx";

const Register = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to get started"
      footerText="Already have an account?"
      footerActionText="Login"
      footerActionPath="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register