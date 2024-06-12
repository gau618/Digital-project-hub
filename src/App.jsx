import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import AuthForm from "./components/AuthForm";
import LandingPage from "./pages/page1/Landingpage";
import TaskDetailPage from "./pages/page2/Taskdetailpage";
import YourTaskPage from "./pages/page3/YourTaskpage";
import Header from "./header/header";
import Footer from "./Footer/Footer";
import AOS from "aos";
import "./App.css";
import "aos/dist/aos.css";
import UserProfile from "./components/Profile_page/Profile";
const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ConditionalHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ADDTASK" element={<TaskDetailPage />} />
          <Route path="/YOURTASKS" element={<YourTaskPage />} />
          <Route path="UserProfile/:id" element={<UserProfile />}></Route>
          <Route path="/auth" element={<AuthForm />} />
        </Routes>
        <Routes>
        <Route path="/" element={<Footer/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ConditionalHeader = () => {
  const location = useLocation();
  return location.pathname !== "/auth" ? <Header /> : null;
};

export default App;
