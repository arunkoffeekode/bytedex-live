import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { apis } from "../../apis.constants";
import { selectProfile } from "../../store/userSlice";
import { authenticatedInstance } from "../../utils/api";

const AccountVerificationContext = createContext();

export function useAccountVerificationContext() {
  return useContext(AccountVerificationContext);
}

export default function AccountVerificationProvider({ children }) {
  const profile = useSelector(selectProfile);

  const [status, setStatus] = useState("");
  const [level, setLevel] = useState(0);

  const [kycData, setKycData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await authenticatedInstance({
        url: apis.getVerificationForm,
        method: "GET",
      });
    })();
  }, []);

  useEffect(() => {
    setStatus(profile?.kycStatus);
    setLevel(
      isNaN(parseInt(profile?.kycApprovedLevel))
        ? 0
        : parseInt(profile?.kycApprovedLevel)
    );
  }, [profile]);

  useEffect(() => {
    (async () => {
      const res = await authenticatedInstance({
        url: apis.getUserKycForm,
        method: "GET",
      });
      if (res.data?.status === "Success") {
        setKycData(res.data.data);
      }
    })();
  }, [profile]);

  return (
    <AccountVerificationContext.Provider
      value={{ status, setStatus, level, setLevel, kycData, setKycData }}
    >
      {children}
    </AccountVerificationContext.Provider>
  );
}
