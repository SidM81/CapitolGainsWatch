import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StockPage from "./components/StockPage";
import { createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path: 'stock',
    element: <StockPage />
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
