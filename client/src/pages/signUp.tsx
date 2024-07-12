import { Helmet } from "react-helmet";
import { Form } from "../components/signUp/form";

const SignUp = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up</title>
        <link rel="canonical" href="https://evenue.ng/sign-up" />
      </Helmet>
      <Form />
    </div>
  );
};
export default SignUp;
