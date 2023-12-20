
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../img/dance-mate-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../App.css"

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', position: 'relative', zIndex: '100' }}>
      <Navbar
        className="bg-gradient"
        expand="lg"
        collapseOnSelect
        style={{ background: 'linear-gradient(135deg, #f39c12, #e74c3c, #c0392b)', position: 'relative', zIndex: '1' }}
      >
        <Container className="text-dark">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt="dance-mate-logo"
                src={logo}
                width="relative"
                height="75"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler">
            <div className="custom-toggler-icon"></div>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <span
                        style={{
                          color: "#000",
                          fontSize: "20px",
                          border: "3px solid #000",
                          borderRadius: "10px",
                          padding: "5px",
                          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        {userInfo.name}
                      </span>
                    }
                    id="username"
                  >
                    {userInfo.role === 'admin' && (
                      <>
                      <LinkContainer to="/adminhome">
                        <NavDropdown.Item>Home</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/createslots">
                        <NavDropdown.Item>Create a Slot</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/slotsview">
                        <NavDropdown.Item>View Schedule</NavDropdown.Item>
                      </LinkContainer>
                      </>
                    )}
                    {userInfo.isActive && ( 
                      <>
                        {userInfo.role === 'teacher' && (
                          <>
                            <LinkContainer to="/teacherhome">
                              <NavDropdown.Item>Teacher Dashboard</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/createslots">
                              <NavDropdown.Item>Create A Slot</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/slotsview">
                              <NavDropdown.Item>View Schedule</NavDropdown.Item>
                            </LinkContainer>
                          </>
                        )}
                        {userInfo.role === 'student' && (
                          <LinkContainer to="/studenthome">
                            <NavDropdown.Item>Student Dashboard</NavDropdown.Item>
                          </LinkContainer>
                        )}
                      </>
                    )}
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;