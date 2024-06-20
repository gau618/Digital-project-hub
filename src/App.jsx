import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import LandingPage from "./pages/page1/Landingpage";
import TaskDetailPage from "./pages/page2/Taskdetailpage";
import YourProjects from "./components/YourProject/YourProject";
import ProjectApplyPage from "./components/ProjectApplyPage/ProjectApplyPage";
import Moderator from "./components/Moderator/Moderator";
import Header from "./header/header";
import Footer from "./Footer/Footer";
import AOS from "aos";
import "./App.css";
import "aos/dist/aos.css";
import UserProfile from "./components/Profile_page/Profile";
import { useAuth } from "./AuthContext";

const App = () => {
  const { storeInitialData } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
  // useEffect(()=>{
  //   storeInitialData();
  // },[])
  return (
    <Router>
      <ConditionalHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ADDTASK" element={<TaskDetailPage />} />
        <Route path="/YourProjects/:id" element={<YourProjects />} />
        <Route path="/UserProfile/:id" element={<UserProfile />} />
        <Route path="/ModeratorPage/:id" element={<Moderator/>}/>
        <Route path="/auth" element={<AuthForm />} />
        <Route path='/Project/:id' element={<ProjectApplyPage/>}> </Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Footer/>} />
        </Routes>
    </Router>
  );
};

const ConditionalHeader = () => {
  const location = useLocation();
  return location.pathname !== "/auth" ? <Header /> : null;
};

export default App;
