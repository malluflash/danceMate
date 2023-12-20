import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import store from "./store.js";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/Auth/LoginScreen.jsx";
import RegisterScreen from "./screens/Auth/RegisterScreen.jsx";
import DanceSlotCard from "./components/DanceSlotCard.jsx";
import SlotCreation from "./screens/Slots/SlotCreation.jsx";
import SuccessReg from "./screens/Auth/SuccessReg.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminHome from "./screens/Home/AdminHome.jsx";
import SlotsView from "./screens/ViewScreeens/SlotsView.jsx";
import TeacherHome from "./screens/Home/TeacherHome.jsx";
import StudentHome from "./screens/Home/StudentHome.jsx";
import UserTable from "./screens/ViewScreeens/UserTable.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import TeacherAndAdminRoute from "./components/TeacherAndAdminRoute.jsx";
import StudentRoute from "./components/StudentRoute.jsx";
import NotAuth from "./screens/Auth/NotAuth.jsx";
import ViewBookings from "./screens/ViewScreeens/viewBookings.jsx";
import SlotScreen from "./screens/SlotScreen.jsx";
import ScheduledClass from "./components/ScheduledClass.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="/regmsg" element={<SuccessReg />} />
      <Route path="/notauth" element={<NotAuth />} />

      <Route path="" element={<StudentRoute />}>
        <Route path="/studenthome" element={<StudentHome />} />
        <Route path="/viewbookings" element={<ViewBookings />} />
        <Route path="/viewschedule" element={<ScheduledClass />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/usertable" element={<UserTable />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/card" element={<DanceSlotCard />} />
      </Route>

      <Route path="" element={<TeacherAndAdminRoute />}>
        <Route path="/slotsview" element={<SlotsView />} />
        <Route path="/editslot" element={<SlotScreen />} />
        <Route path="/createslots" element={<SlotCreation />} />
        <Route path="/teacherhome" element={<TeacherHome />} />
      </Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
