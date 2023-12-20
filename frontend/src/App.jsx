import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import "./App.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
    <Header />
    <ToastContainer/>
    <Container className='my-2 '>
      <Outlet />
    </Container>
    </>
    
  )
}

export default App;