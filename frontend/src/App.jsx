import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-purple-pink-vertical transition-colors duration-200">
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
        theme="dark"
        toastClassName="rounded-xl shadow-lg font-medium"
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;