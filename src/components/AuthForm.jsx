import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Auth.css";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { signUp, signIn, signInWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
 
  const backToHome=()=>{
     navigate("/");
  }
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedRememberMe) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(savedRememberMe);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
        console.log("signUp")
      } else {
        await signIn(email, password);
        console.log("signIn")
      }
      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberMe", rememberMe);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberMe");
      }
      navigate("/");
    } catch (err) {
      if (!isSignUp && err.message.includes("user-not-found")) {
        alert("User not found. Please sign up first.");
        setIsSignUp(true);
        setActive(true);
      } else {
        alert(err.message);
      }
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert("Please enter your email to reset password.");
      return;
    }
    try {
      await resetPassword(email);
      alert("Password reset email sent.");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
    <div className={`auth_page ${active ? "auth-right":'auth-left'}`}>
    <button className="Home_button" onClick={backToHome}>Home</button>
      <div className={`container ${active === true && "active"}`} id="container">
        <div className="form-container sign-up">
          <div className="auth_phone">
        <button className="Sign-phone" onClick={()=>{setActive(false)}}>Sign In</button>
        </div>
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="social-icons">
              <a href="#" className="icon" onClick={handleGoogleSignIn}>
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" required/>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" onClick={()=>{
              setIsSignUp(true);
            }}> Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
        <div className="auth_phone">
        <button className="Sign-phone" onClick={()=>{setActive(true)}}>Sign Up</button>
        </div>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon" onClick={handleGoogleSignIn}>
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email account</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password_remember">
              <div className="remember">
            <label id='rememberMe'>
            Remember
            </label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              </div>
            <div className="password">
            <a href="#" onClick={handlePasswordReset}>
              Forget Password?
            </a>
            </div>
            </div>
            <button type="submit" onClick={
              ()=>{
              setIsSignUp(false);
              }
              }>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>
                Unlock the full experience! Enter your details to access all
                features
              </p>
              <button
                className="hidden"
                id="login"
                onClick={() => {
                  setActive(false);
                }}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to unlock all our site
                features!
              </p>
              <button
                className="hidden"
                id="register"
                onClick={() => {
                  setIsSignUp(true);
                  setActive(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AuthForm;
