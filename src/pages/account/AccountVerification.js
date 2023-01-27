import React from "react";
import AccountVerificationContainer from "../../component/account/AccountVerificationContainer";
import AccountVerificationProvider from "../../component/account/AccountVerificationContext";
import VerificationLevelIdentifier from "../../component/account/VerificationLevelIdentifier";
import VerificationLevelTabs from "../../component/account/VerificationLevelTabs";

function AccountVerification() {
  return (
    <div>
      <AccountVerificationProvider>
        <div className="container-fluid">
          <VerificationLevelIdentifier />
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-x-12">
              <div className="level-box">
                <VerificationLevelTabs />
                <AccountVerificationContainer />
              </div>
            </div>
          </div>
        </div>
      </AccountVerificationProvider>
    </div>
  );
}

export default AccountVerification;
