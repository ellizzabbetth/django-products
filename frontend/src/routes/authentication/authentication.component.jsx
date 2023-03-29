// import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
// import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignIn from "../sign-in/sign-in.component";
import Register from "../register/register.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">

      <SignIn />
      <Register />
      {/* <SignInForm />
      <SignUpForm /> */}
    </div>
  );
};

export default Authentication;