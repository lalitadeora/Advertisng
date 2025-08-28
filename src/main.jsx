import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Booknow from "./Components/Booknow.jsx";
import Home from "./Home.jsx";
import Contactus from "./Components/Contactus.jsx";
import AboutUs from "./Components/About.jsx";
import Login from "./Components/Login.jsx";
import Privacypolicy from "./Components/Privacypolicy.jsx";
import Queries from "./Components/Queries.jsx";
import Bigclients from "./Components/Bigclients.jsx";
import Employeelogin from "./Components/Employeelogin.jsx";
import Preview from "./Components/Preview.jsx";
import Payment from "./Components/Payment.jsx";
import Ourpricing from "./Components/ourpricing.jsx"; // छोटे अक्षरों में अपडेट

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/book", element: <Booknow /> },
      { path: "/contactus", element: <Contactus /> },
      { path: "/aboutus", element: <AboutUs /> },
      { path: "/login", element: <Login /> },
      { path: "/privacypolicy", element: <Privacypolicy /> },
      { path: "/queries", element: <Queries /> },
      { path: "/bigclients", element: <Bigclients /> },
      { path: "/employeelogin", element: <Employeelogin /> },
      { path: "/preview", element: <Preview /> },
      { path: "/payment", element: <Payment /> },
      { path: "/ourpricing", element: <Ourpricing /> }, // सही पथ
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
