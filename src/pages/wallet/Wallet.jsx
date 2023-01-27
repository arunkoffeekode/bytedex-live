import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { apis } from "../../apis.constants";
import WalletPageNavigation from "../../component/WalletPageNavigation";
import { setUserProfile } from "../../store/userSlice";
import { authenticatedInstance } from "../../utils/api";

export default function Wallet() {
  const dispatch = useDispatch();

  useEffect(() => {
    ProfileRequest();
  }, []);

  async function ProfileRequest() {
    try {
      const res = await authenticatedInstance({
        url: apis.profile,
        method: "GET",
      });

      if (res.data?.status === "Success") {
        dispatch(setUserProfile(res.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <WalletPageNavigation />
      <Outlet />
    </div>
  );
}
