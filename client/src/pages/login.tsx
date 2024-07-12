import { Helmet } from "react-helmet";
import { Form } from "../components/logIn/form";

export type TokenStateProps = {
  setTokenState: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ setTokenState }: TokenStateProps) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="canonical" href="https://evenue.ng/login" />
      </Helmet>
      <Form setTokenState={setTokenState} />
    </div>
  );
};
export default Login;
