
import React from "react";
import { createRoot } from "react-dom/client";
import Checkout from "./Checkout.jsx";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
const container = document.getElementById("checkout-page-container");
const root = createRoot(container);
root.render(
  <AppProvider i18n={en}>
    <Checkout />
  </AppProvider>
);
