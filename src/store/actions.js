import axios from "axios";
import Utils from "../utils/hardcoded";
import cookie from "js-cookie";

export const ACTIONS = {
  AUTH: "AUTH",
  LOADING: "LOADING",
};

export const SigninUser = async (payload) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${Utils.BASE_URL}/v1/user/signin`,
      data: payload,
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

export const PropertyAddReq = async (payload) => {
  try {
    const token = cookie.get("RentMineAuthToken");
    const response = await axios({
      method: "POST",
      url: `${Utils.BASE_URL}/v1/property/add`,
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

export const sendMail = (type, message) => {
  //type: visitor, event
  try {
    axios({
      method: "POST",
      url: `${Utils.BASE_URL}/v1/general/sendmail/${type}`,
      data: { message },
    });
  } catch (err) {}
};
