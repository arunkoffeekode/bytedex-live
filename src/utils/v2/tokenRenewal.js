import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../api";

export async function renewAccessToken() {
  try {
    const res = await authenticatedInstance({
      url: apis.renewBearerToken,
      method: "POST",
    });

    // console.log(res);
    // console.log(res.data.status);

    if (res.data?.status === "Success") {
      // console.log({
      //   prev: localStorage.getItem("token"),
      //   curr: res.data?.data?.access_token?.split(" ")[1],
      // });

      localStorage.setItem(
        "token",
        res.data?.data?.access_token?.split(" ")[1]
      );

      // console.log({
      //   next: localStorage.getItem("token"),
      //   curr: res.data?.data?.access_token?.split(" ")[1],
      // });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
