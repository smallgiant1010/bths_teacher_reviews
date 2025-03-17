import React from "react"
import ReactDOM from "react-dom/client"
import "./css/index.css"
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"
import { AdminContextProvider } from "./context/AdminContext"
import { TeacherContextProvider } from "./context/TeachersContext"
import { CookiesProvider } from "react-cookie"
import { HeadProvider } from "react-head"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HeadProvider> 
    <CookiesProvider>
      <AdminContextProvider>
        <AuthContextProvider>
          <TeacherContextProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </TeacherContextProvider>
        </AuthContextProvider>
      </AdminContextProvider>
    </CookiesProvider>
  </HeadProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
