import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CommentContextProvider } from "./context/CommentContext";
import { AdminContextProvider } from "./context/AdminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AdminContextProvider>
    <AuthContextProvider>
      <CommentContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CommentContextProvider>
    </AuthContextProvider>
  </AdminContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
