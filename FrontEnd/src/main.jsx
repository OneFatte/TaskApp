import React from 'react'
import './assets/main.css'
import './scss/style.scss'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './components/Layout'
import Task from './views/Task';
import Login from './views/Login';
import Tasks from './views/Tasks';

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login></Login>
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "task/:taskId",
        element: <Task></Task>
      },
      {
        path: "tasks",
        element: <Tasks></Tasks>
      }
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
