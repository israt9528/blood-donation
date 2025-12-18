import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../Pages/Dashboard/Profile/Profile";
import HomePage from "../Pages/Dashboard/HomePage/HomePage";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";
import UpdateDonationRequest from "../Pages/Dashboard/UpdateDonationRequest/UpdateDonationRequest";
import DonationRequestDetails from "../Pages/Dashboard/DonationRequestDetails/DonationRequestDetails";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AllBloodDonationRequest from "../Pages/Dashboard/AllBloodDonationRequest/AllBloodDonationRequest";
import AllBloodDonationRequestVolunteer from "../Pages/Dashboard/Volunteer/AllBloodDonationRequestVolunteer/AllBloodDonationRequestVolunteer";
import VolunteerRoute from "./VolunteerRoute";
import SearchDonors from "../Pages/SearchDonors/SearchDonors";
import Funding from "../Pages/Funding/Funding";
import FundSuccessful from "../Pages/Funding/FundSuccessful";
import FundCancelled from "../Pages/Funding/FundCancelled";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "donation-requests",
        Component: DonationRequests,
      },
      {
        path: "search-donors",
        Component: SearchDonors,
        loader: () => fetch("/districtsInfo.json").then((res) => res.json()),
      },
      {
        path: "funding",
        element: (
          <PrivateRoute>
            <Funding></Funding>
          </PrivateRoute>
        ),
      },
      {
        path: "fund-successful",
        element: (
          <PrivateRoute>
            <FundSuccessful></FundSuccessful>
          </PrivateRoute>
        ),
      },
      {
        path: "fund-cancelled",
        element: (
          <PrivateRoute>
            <FundCancelled></FundCancelled>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "auth/login",
        Component: Login,
      },
      {
        path: "auth/register",
        Component: Register,
        loader: () => fetch("/districtsInfo.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllBloodDonationRequest></AllBloodDonationRequest>
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request/volunteer",
        element: (
          <VolunteerRoute>
            <AllBloodDonationRequestVolunteer></AllBloodDonationRequestVolunteer>
          </VolunteerRoute>
        ),
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequests,
      },
      {
        path: "update-donation-request/:id",
        Component: UpdateDonationRequest,
      },
      {
        path: "donation-request-details/:id",
        Component: DonationRequestDetails,
      },
    ],
  },
]);
