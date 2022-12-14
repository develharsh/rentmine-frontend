import { useEffect, useContext } from "react";
import { SigninUser, ACTIONS } from "../store/actions";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import Cookie from "js-cookie";
import { DataContext } from "../store/globalstate";
import { useSearchParams } from "react-router-dom";

const Signin = ({ uniqueId }) => {
  const [search] = useSearchParams();
  const callback = search.get("callback");
  const { dispatch, state } = useContext(DataContext);
  const loginAction = async (resp) => {
    dispatch({ type: ACTIONS.LOADING, payload: true });
    const response = await SigninUser({ token: resp.credential });
    dispatch({ type: ACTIONS.LOADING, payload: false });
    if (response.success) {
      showNotification({
        title: "Great",
        message: "Signed In Successfully.",
        color: "green",
        icon: <IconCheck />,
      });
      Cookie.set("RentMineAuthToken", resp.credential);
      dispatch({ type: ACTIONS.AUTH, payload: response.data });
      if (callback) {
        // alert(callback);
        window.open(`/${callback}`, "_self");
      }
      // else alert(callback);
    }
  };
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: loginAction,
    });
    google.accounts.id.renderButton(
      document.getElementById(`signInDiv-${uniqueId}`),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);
  return (
    <div
      id={`signInDiv-${uniqueId}`}
      style={{ display: state.userSession ? "none" : "block" }}
    ></div>
  );
};

export default Signin;
