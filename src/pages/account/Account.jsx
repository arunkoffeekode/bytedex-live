import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { apis } from "../../apis.constants";
import AccountNavigation from "../../component/account/AccountNavigation";
import { setUserProfile } from "../../store/userSlice";
import { authenticatedInstance } from "../../utils/api";

export default function Account() {
  const dispatch = useDispatch();

  useEffect(() => {
    AccountRequest();
  }, []);

  async function AccountRequest() {
    try {
      const res = await authenticatedInstance({
        url: apis.profile,
        method: "GET",
      });

      // console.log(res);
      // console.log(res.data);

      if (res.data?.status === "Success") {
        dispatch(setUserProfile(res.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <AccountNavigation />
      <Outlet />
    </div>
  );
}
