import Hero from "../components/Hero";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const HomeScreen = () => {

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToHomePage = (role) => {
      switch (role) {
        case 'admin':
          navigate("/adminhome");
          break;
        case 'teacher':
          navigate("/teacherhome");
          break;
        case 'student':
          navigate("/studenthome");
          break;
      }
    };

    if (userInfo && userInfo.role) {
      redirectToHomePage(userInfo.role);
    }
  }, [navigate, userInfo]);
    return <Hero />;
};
  export default HomeScreen;