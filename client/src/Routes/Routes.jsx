import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import AddRestaurant from "../Pages/AddRestaurant";
import UpdateRestaurant from "../Pages/UpdateRestaurant";
import Search from "../Pages/Search";
import AboutUs from "../Pages/AboutUs";
import SweetAlertDemo from "../Pages/SweetAlertDemo";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import ProtectedRoute from "../Component/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/add-restaurant",
        element: <AddRestaurant />,
    },
    {
        path: "/update-restaurant/:id",
        element: <UpdateRestaurant />,
    },
    {
        path: "/search",
        element: <Search />,
    },
    {
        path: "/about-us",
        element: <AboutUs />,
    },
    {
        path: "/sweetalert-demo",
        element: <SweetAlertDemo />,
    },
]);
export default router;
