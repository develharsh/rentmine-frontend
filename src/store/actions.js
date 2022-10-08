import axios from "axios";
import { BASE_URL } from "../utils/hardcoded";

export const SigninUser = async (payload) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/v1/user/signin`,
      data: payload,
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};
