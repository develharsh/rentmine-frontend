import ReactDOM from "react-dom/client";
import App from "./App";

import { DataProvider } from "./store/globalstate";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

// import { Provider } from "react-redux";
// import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
        breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1200,
          xl: 1400,
        },
      }}
    >
      <NotificationsProvider autoClose={4000}>
        <App />
      </NotificationsProvider>
    </MantineProvider>
  </DataProvider>
);
