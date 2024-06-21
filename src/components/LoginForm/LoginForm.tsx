import "./LoginForm.css";
import { useState } from "react";
import { UserLogIn } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/userAuthContext";

const initialValue: UserLogIn = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { logIn, googleSignIn } = useUserAuth();
  const [userLogInInfo, setUserLogInInfo] = useState<UserLogIn>(initialValue);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await logIn(userLogInInfo.email, userLogInInfo.password);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <p className="title">Welcome back</p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          value={userLogInInfo.email}
          onChange={(e) =>
            setUserLogInInfo({ ...userLogInInfo, email: e.target.value })
          }
          type="email"
          className="input"
          placeholder="Email"
          required
        />
        <input
          value={userLogInInfo.password}
          onChange={(e) =>
            setUserLogInInfo({ ...userLogInInfo, password: e.target.value })
          }
          type="password"
          className="input"
          placeholder="Password"
          required
        />
        <button className="form-btn">Log in</button>
      </form>
      <p className="sign-up-label" onClick={() => navigate("/register")}>
        Don't have an account?<span className="sign-up-link">Sign up</span>
      </p>
      <div className="buttons-container">
        <div className="google-login-button">
          <span onClick={handleGoogleSignIn}>Log in with Google</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
