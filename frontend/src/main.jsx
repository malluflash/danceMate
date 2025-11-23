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

import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/Auth/LoginScreen.jsx";
import SuperAdminLoginScreen from "./screens/Auth/SuperAdminLoginScreen.jsx";
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

// New components for school admin structure
import SuperAdminHome from "./screens/Home/SuperAdminHome.jsx";
import SchoolAdminHome from "./screens/Home/SchoolAdminHome.jsx";
import SchoolForm from "./screens/SchoolForm.jsx";
import SchoolAdminAssignment from "./screens/SchoolAdminAssignment.jsx";
import SchoolUsersView from "./screens/SchoolUsersView.jsx";
import SuperAdminRoute from "./components/SuperAdminRoute.jsx";
import SchoolAdminRoute from "./components/SchoolAdminRoute.jsx";
import SchoolTeachersView from "./screens/ViewScreeens/SchoolTeachersView.jsx";
import SchoolStudentsView from "./screens/ViewScreeens/SchoolStudentsView.jsx";

// Super Admin pages
import SchoolsListPage from "./screens/SuperAdmin/SchoolsList.jsx";
import AssignUsersPage from "./screens/SuperAdmin/AssignUsers.jsx";
import StudentInterestsPage from "./screens/SuperAdmin/StudentInterests.jsx";
import SchoolInterestsPage from "./screens/SuperAdmin/SchoolInterests.jsx";
import SEOPagesPage from "./screens/SuperAdmin/SEOPages.jsx";
import MarketingFunnelsPage from "./screens/SuperAdmin/MarketingFunnels.jsx";
import StatsDashboardPage from "./screens/SuperAdmin/StatsDashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/superadmin/login" element={<SuperAdminLoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="/regmsg" element={<SuccessReg />} />
      <Route path="/notauth" element={<NotAuth />} />

      {/* Student routes */}
      <Route path="" element={<StudentRoute />}>
        <Route path="/studenthome" element={<StudentHome />} />
        <Route path="/viewbookings" element={<ViewBookings />} />
        <Route path="/viewschedule" element={<ScheduledClass />} />
      </Route>

      {/* Legacy Admin routes (now used by superadmin) */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/card" element={<DanceSlotCard />} />
      </Route>

      {/* Super Admin routes */}
      <Route path="" element={<SuperAdminRoute />}>
        <Route path="/superadminhome" element={<SuperAdminHome />} />
        <Route path="/usertable" element={<UserTable />} />
        <Route path="/schools/create" element={<SchoolForm />} />
        <Route path="/schools/:id" element={<SchoolForm />} />
        <Route path="/schools/:id/assign-admin" element={<SchoolAdminAssignment />} />
        <Route path="/schools/:id/users" element={<SchoolUsersView />} />
        <Route path="/superadmin/schools" element={<SchoolsListPage />} />
        <Route path="/superadmin/users/assign" element={<AssignUsersPage />} />
        <Route path="/superadmin/interests/students" element={<StudentInterestsPage />} />
        <Route path="/superadmin/interests/schools" element={<SchoolInterestsPage />} />
        <Route path="/superadmin/seo" element={<SEOPagesPage />} />
        <Route path="/superadmin/marketing" element={<MarketingFunnelsPage />} />
        <Route path="/superadmin/stats" element={<StatsDashboardPage />} />
      </Route>

      {/* School Admin routes */}
      <Route path="" element={<SchoolAdminRoute />}>
        <Route path="/schooladminhome" element={<SchoolAdminHome />} />
        <Route path="/schooladmin/teachers" element={<SchoolTeachersView />} />
        <Route path="/schooladmin/students" element={<SchoolStudentsView />} />
      </Route>

      {/* Teacher and Admin shared routes */}
      <Route path="" element={<TeacherAndAdminRoute />}>
        <Route path="/slotsview" element={<SlotsView />} />
        <Route path="/editslot" element={<SlotScreen />} />
        <Route path="/createslots" element={<SlotCreation />} />
        <Route path="/teacherhome" element={<TeacherHome />} />
      </Route>

      {/* Common private routes */}
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
