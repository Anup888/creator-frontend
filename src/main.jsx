import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { persistor, store } from "./store";
import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <ErrorBoundary>

            <App />
            </ErrorBoundary>
          </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
