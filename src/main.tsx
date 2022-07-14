import React from "react";
import ReactDOM from "react-dom/client";
import FetchForm from "./FetchForm";
import "./index.css";
import { QueryProvider } from "./query";

async function prepare() {
  if (import.meta.env.DEV) {
    // @ts-ignore
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
  return Promise.resolve();
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryProvider>
        <FetchForm personId="abcd" />
      </QueryProvider>
    </React.StrictMode>
  );
});
