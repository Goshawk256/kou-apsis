import All_Url from "../url";
import axios from "axios";

export const refreshTheToken = async () => {
  try {
    const response = await axios.post(
      `${All_Url.api_base_url}/auth/refresh`,
      {
        username: localStorage.getItem("username"),
        role: localStorage.getItem("role"),
      },
      {
        withCredentials: true,
      }
    );

    if (response) {
      localStorage.setItem("accessToken", response.data.accessToken);
    } else {
      console.log("Token yenileme başarısız");
    }
  } catch (error) {
    console.error("Token yenileme hatası:", error);
  }
};
