import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
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
);
