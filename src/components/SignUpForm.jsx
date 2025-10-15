import Button from "./button.jsx";

import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();

  return (
    <>
      <form>
        <div className="form_title">Create account</div>

        <div className="login_label">
          {/* <span>Sign Up</span> */}
          <input type="text" placeholder="Username" />
        </div>

        <div className="password_label">
          <input type="password" placeholder="Password" />
        </div>

        <div className="password_label">
          <input type="password" placeholder="Confirm Password" />
        </div>

        <Button className={"btn log_in_btn"} onClick={() => alert("Button clicked!")}>
          Sign Up
        </Button>
        <Button className={"btn back_btn"} onClick={() => navigate("/")}>
          Back
        </Button>
      </form>
    </>
  );
}

export default SignUpForm;
