import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

const AppContent = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-200">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-xl shadow-lg font-medium"
      />
      <main className="pt-20 md:pt-24 pb-10">
        <div className="container-custom">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;