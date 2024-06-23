import HomePage from "./routes/homePage/homePage.jsx";
import Listpage from "./routes/listPage/listpage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/layout/layout.jsx";
import SinglePage from "./routes/singlePage/singlePage.jsx";
import ProfilePage from "./routes/profilePage/profilePage.jsx";
import Login from "./routes/login/login.jsx";
import Register from "./routes/register/register.jsx";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage.jsx";
import NewPostPage from "./routes/newPostPage/newPostPage.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <Listpage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
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
          path: "/profileUpdatePage",
          element: <ProfileUpdatePage />,
        },
        { path: "/newPostPage", 
          element: <NewPostPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
