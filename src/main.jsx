import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import route from "./component/routes/Route";
import { Provider } from "react-redux";
import store from "./component/redux/store/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route}>
      <App />
    </RouterProvider>
  </Provider>
);