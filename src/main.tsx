import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AccountsProvider } from "./context/AccountsContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AccountsProvider>
            <App />
        </AccountsProvider>
    </React.StrictMode>,
);
