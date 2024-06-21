import "./RegisterForm.css";
import { useState } from "react";
import { UserSignIn } from "../../types/types";
import { useNavigate } from "react-router-dom";
import {
  username_min_length,
  username_max_length,
  regex_password,
} from "../../common/constants";
import { useUserAuth } from "../../context/userAuthContext";
import { createUser, checkIfUserExists } from "../../service/db-service";

const initialValue: UserSignIn = {
  username: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const { signUp, googleSignIn } = useUserAuth();
  const [userDetails, setUserDetails] = useState<UserSignIn>(initialValue);

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userDetails.username.length < username_min_length) {
        alert(`Username must be at least ${username_min_length} characters`);
        return;
      }
      if (userDetails.username.length > username_max_length) {
        alert(`Username must be at most ${username_max_length} characters`);
        return;
      }
      if (!regex_password.test(userDetails.password)) {
        alert(
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
        );
        return;
      }

      const [usernameExists, emailExists] =
        (await checkIfUserExists(userDetails.username, userDetails.password)) ||
        [];
      if (usernameExists && !usernameExists.exists()) {
        if (emailExists && !emailExists.exists()) {
          await createUser({
            username: userDetails.username,
            email: userDetails.email,
          });
          await signUp(
            userDetails.email,
            userDetails.password,
            userDetails.username
          );
        } else {
          alert("Email already exists");
        }
      } else {
        alert("Username already exists");
      }

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
        await createUser({
          username: userDetails.username,
          email: userDetails.email,
        });
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <p className="title">Create account</p>
      <form onSubmit={register} className="form">
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, username: e.target.value })
          }
          value={userDetails.username}
          type="text"
          className="input"
          placeholder="Name"
          required
        />
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
          value={userDetails.email}
          type="email"
          className="input"
          placeholder="Email"
          required
        />
        <input
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
          value={userDetails.password}
          type="password"
          className="input"
          placeholder="Password"
          required
        />
        <button className="form-btn">Create account</button>
      </form>
      <p className="sign-up-label" onClick={() => navigate("/login")}>
        Already have an account?<span className="sign-up-link">Log in</span>
      </p>
      <div className="buttons-container">
        <div className="google-login-button">
          <span onClick={handleGoogleSignIn}>Sign up with Google</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
