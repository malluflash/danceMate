import Hero from "../components/Hero";
import AboutUs from "../components/sections/AboutUs";
import Services from "../components/sections/Services";
import StatsSection from "../components/sections/StatsSection";
import DanceSchools from "../components/sections/DanceSchools";
import HowItWorks from "../components/sections/HowItWorks";
import Benefits from "../components/sections/Benefits";
import Testimonials from "../components/sections/Testimonials";
import ContactUs from "../components/sections/ContactUs";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top and force layout recalculation when navigating to homepage
  useEffect(() => {
    if (location.pathname === '/') {
      // Check if there's a hash in the URL
      const hash = location.hash;
      if (hash) {
        // Remove the # from hash
        const sectionId = hash.substring(1);
        // Wait for page to render, then scroll to section
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 100);
      } else {
        // No hash, scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });
        
        // Force a reflow to ensure all sections are properly laid out
        setTimeout(() => {
          document.body.offsetHeight;
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 0);
      }
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const redirectToHomePage = (role) => {
      switch (role) {
        case 'superadmin':
          navigate("/superadminhome");
          break;
        case 'admin': // Legacy admin role
          navigate("/adminhome");
          break;
        case 'schooladmin':
          navigate("/schooladminhome");
          break;
        case 'teacher':
          navigate("/teacherhome");
          break;
        case 'student':
          navigate("/studenthome");
          break;
        default:
          // No role or unknown role, stay on homepage
          break;
      }
    };

    if (userInfo && userInfo.role) {
      redirectToHomePage(userInfo.role);
    }
  }, [navigate, userInfo]);
  
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <StatsSection />
      <AboutUs />
      <Services />
      <DanceSchools />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomeScreen;