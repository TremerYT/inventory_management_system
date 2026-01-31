import LoginForm from "../../components/forms/login_form.jsx";
import AuthLayout from "../../components/layout/auth_layout.jsx";

const Login = () => {
  return (
    <AuthLayout
      title="Login to your account"
      subtitle="Welcome back, please enter your details"
      footerText="Not registered yet?"
      footerActionText="Create an account"
      footerActionPath="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;