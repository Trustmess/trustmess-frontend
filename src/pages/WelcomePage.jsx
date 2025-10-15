import Button from "../components/button.jsx";

import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome_page" id="welcomePage">
      <div className="welcome_page_container">
        <div className="welcome_page_title">Right Messenger</div>
        <Button className={"btn sign_up_btn"} onClick={() => navigate("/signup")}>
          Sign Up
        </Button>

        <Button className={"btn log_in_btn"} onClick={() => navigate("/login")}>
          Log In
        </Button>
      </div>
    </div>
  );
}

export default WelcomePage;
