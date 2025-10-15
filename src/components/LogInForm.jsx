import Button from "./button.jsx";

import { useNavigate } from "react-router-dom";

function LogInForm() {
  const navigate = useNavigate();

  return (
    <>
      <form>
        <div className="form_title">Enter login and password</div>

        <div className="login_label">
          {/* <span>Login:</span> */}
          <input type="text" placeholder="Username" />
        </div>

        <div className="password_label">
          {/* <span>Password:</span> */}
          <input type="password" placeholder="Password" />{" "}
        </div>

        <Button className={"btn log_in_btn"} onClick={() => alert("Button clicked!")}>
          Log In
        </Button>
        <Button className={"btn back_btn"} onClick={() => navigate("/")}>
          Back
        </Button>
      </form>
    </>
  );
}

export default LogInForm;
