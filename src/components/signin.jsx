import { useEffect } from "react";
import { SigninUser } from "../store/actions";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import Cookie from "js-cookie";

const Signin = () => {
  const loginAction = (resp) => {
    // setLoading(true);
    // dispatch({ type: ACTIONS.LOADING, payload: true });
    SigninUser({ token: resp.credential });
    // dispatch({ type: ACTIONS.LOADING, payload: false });
    // setLoading(false);
    showNotification({
      title: "Great",
      message: "Signed In Successfully.",
      color: "teal",
      icon: <IconCheck />,
    });
    Cookie.set("RentMineAuthToken", resp.credential);
  };
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: loginAction,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return <div id="signInDiv"></div>;
};

export default Signin;
