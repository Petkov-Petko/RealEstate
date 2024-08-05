import "./LoginForm.css";
import { useState } from "react";
import { UserLogIn } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/userAuthContext";
import { createUser } from "../../service/db-service";
import { assets } from "../../assets/assets";
import { checkIfUserExists } from "../../service/db-service";

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
      const userDetails = await googleSignIn();
      if (userDetails?.username && userDetails?.email) {
        const [usernameSnapshot, emailSnapshot] = await checkIfUserExists(userDetails.username, userDetails.email);
        const userExists = (usernameSnapshot && usernameSnapshot.exists()) || (emailSnapshot && emailSnapshot.exists());
  
        if (!userExists) {
          await createUser({
            username: userDetails.username,
            email: userDetails.email,
          });
        }
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <img src={assets.loginImage} alt="login" className="inset-0 w-full h-screen object-cover" />
      <img src={assets.logo} className="logo-position"></img>
      <div className="form-container">
        <p className="title">Welcome back</p>
        <p className="text-xs pb-3 opacity-75">
          Enter your credentials and get ready to explore!
        </p>
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
        <div className="buttons-container">
          <div className="google-login-button">
            <i className="fa-brands fa-google fa-xl"></i>
            <span onClick={handleGoogleSignIn}>Log in with Google</span>
          </div>
        </div>
        <p className="sign-up-label" onClick={() => navigate("/register")}>
          Don't have an account?<span className="sign-up-link">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
