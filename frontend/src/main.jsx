import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StorePage from './pages/StorePage'
import CheckoutPage from './pages/CheckoutPage'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from './pages/SignupPage.jsx'

const router = createBrowserRouter([
  {
    path: "/store",
    element: <StorePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
