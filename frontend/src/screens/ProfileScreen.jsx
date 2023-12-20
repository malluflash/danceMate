import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../Slices/userApiSlice";
import { setCredentials } from "../Slices/authSlice";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setContactNumber(userInfo.contactNumber);
  }, [userInfo.email, userInfo.name, userInfo.contactNumber]);

  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else if (password.length === 0) {
      toast.error("Please enter your passowrd");
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          contactNumber,
          password
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
      
    }
  };

  return (
    <FormContainer>
      <h1 className="text-dark">Update Profile</h1>

      <Form onSubmit={submitHandler} className="text-dark">
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="mobile">
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="phone"
            placeholder="Enter your mobile number with country code"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <div className="text-center">
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
