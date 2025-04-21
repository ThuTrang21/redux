import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/configureStore.ts";
import App from "./pages";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
  </Provider>
);
