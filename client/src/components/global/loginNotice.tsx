import { Link, useLocation } from "react-router-dom";

export const LoginNotice = () => {
  const location = useLocation();
  return (
    <p>
      <Link
        to="/login"
        state={{ from: location }}
        replace
      >
        Login
      </Link>{" "}
      to continue
    </p>
  );
};
