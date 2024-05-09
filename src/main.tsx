import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.tsx";
import "../styles/ShoppingCart.scss";
import "../styles/Home.scss";
import "../styles/Header.scss";
import "../styles/Footer.scss";
import "../styles/global.scss";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
