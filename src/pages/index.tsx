import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./home";
import path from "../utils/path";
import ProductDetail from "./product";
import { Suspense } from "react";
import { Spin } from "antd";
import RootLayout from "../layouts/RootLayout";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Cart } from "./cart";
import { UploadImage } from "./upload";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: path.HOME,
        element: <DefaultLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: path.PRODUCT, element: <ProductDetail /> },
          { path: path.CART, element: <Cart /> },
          {path:path.UPLOAD,element:<UploadImage/>}
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="fixed flex h-screen w-screen items-center justify-center">
            <Spin size="large" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
