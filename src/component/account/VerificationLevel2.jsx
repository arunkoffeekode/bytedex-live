import React, { useEffect, useState } from "react";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";
import { useAccountVerificationContext } from "./AccountVerificationContext";
import DocumentIDUpload from "./DocumentIDUpload";
import SelfieUpload from "./SelfieUpload";
import nationalityOptions from "./nationalityOptions.json";
import { errorToast, successToast } from "../../utils/v2/toasts";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
// import aplhaCodeOptions

export default function VerificationLevel2() {
  const { t } = useTranslation();
  const { kycData } = useAccountVerificationContext();

  const [countryAlphaCode, setCountryAlphaCode] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentIdNumber, setDocumentIdNumber] = useState("");
  const [documentFront, setDocumentFront] = useState(null);
  const [documentBack, setDocumentBack] = useState(null);
  const [selfie, setSelfie] = useState(null);

  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   validateFields();
  // }, [
  //   countryAlphaCode,
  //   documentType,
  //   documentIdNumber,
  //   documentFront,
  //   documentBack,
  //   selfie,
  // ]);

  function validateFields() {
    // console.log({
    //   countryAlphaCode,
    //   documentType,
    //   documentIdNumber,
    //   documentFront,
    //   documentBack,
    //   selfie,
    // });

    let e = {};

    if (!countryAlphaCode) {
      e.countryAlphaCode = "Country Alpha Code must be selected.";
    }

    if (!documentType) {
      e.documentType = "Identity Document Type must be selected.";
    }

    if (!documentIdNumber) {
      e.documentIdNumber =
        "Identity Document Number must be provided correctly.";
    }

    if (!documentFront) {
      e.documentFront =
        "Image of Front of the Identity Document must be provided.";
    }

    if (!documentBack) {
      e.documentBack =
        "Image of Back of the Identity Document must be provided.";
    }

    if (!selfie) {
      e.selfie = "Selfie Image must be provided.";
    }

    setErrors({ ...e });

    if (Object.keys(e).length) {
      return false;
    } else {
      return true;
    }
  }

  async function SubmitIdentityRequest() {
    try {
      console.log(kycData.fieldsList);
      const data = {
        serviceProviderName: "Manual",
        fieldsList: [
          ...kycData,
          {
            fieldName: "Document",
            value: null,
            fieldsList: [
              { fieldName: "Type", value: documentType },
              { fieldName: "CountryAlpha2", value: countryAlphaCode },
              { fieldName: "Number", value: documentIdNumber },
              { fieldName: "Image", value: documentFront },
              { fieldName: "BackImage", value: documentBack },
            ],
          },
          {
            fieldName: "Selfie",
            value: null,
            fieldsList: [{ fieldName: "Image", value: selfie }],
          },
        ],
      };

      const res = await authenticatedInstance({
        url: apis.verificationLevel2,
        method: "POST",
        data,
      });

      if (res.data?.status === "Success") {
        successToast(
          "Your Data has been Submitted and will be reviewd shortly. You can Close this Window."
        );

        // localStorage.setItem(
        //   "verification_tracking_id",
        //   res.data?.data?.trackingId
        // );
      } else {
        errorToast(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ToastContainer />
      <DocumentIDUpload
        setCountryAlphaCode={setCountryAlphaCode}
        setDocumentType={setDocumentType}
        setDocumentIdNumber={setDocumentIdNumber}
        setDocumentFront={setDocumentFront}
        setDocumentBack={setDocumentBack}
        errors={errors}
      />
      <SelfieUpload setSelfie={setSelfie} errors={errors} />
      <div className="my-4 form-row row justify-content-center">
        <div className="form-group col-md-4">
          <button
            type="button"
            className="forgot-btn"
            onClick={() => {
              const validity = validateFields();
              if (validity) {
                SubmitIdentityRequest();
              } else {
                errorToast("Data provided in the Form is invalid.");
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
