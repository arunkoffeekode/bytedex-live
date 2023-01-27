import React, { useState } from "react";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";
import { errorToast, successToast } from "../../utils/v2/toasts";
import { useAccountVerificationContext } from "./AccountVerificationContext";

export default function VerificationLevel3() {
  const { kycData } = useAccountVerificationContext();
  const [addressDocumentFront, setAddressDocumentFront] = useState("");
  // const [addressDocumentBack, setAddressDocumentBack] = useState("");
  const [errors, setErrors] = useState({});

  // const addressData = {
  //   serviceProviderName: "Manual",
  //   fieldsList: [
  //     {
  //       fieldName: "Address",
  //       value: null,
  //     },
  //   ],
  // };

  // // Start upload photo
  // const upload = () => {
  //   document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  //     const dropZoneElement = inputElement.closest(".drop-zone");

  //     dropZoneElement.addEventListener("click", (e) => {
  //       inputElement.click();
  //     });

  //     inputElement.addEventListener("change", (e) => {
  //       if (inputElement.files.length) {
  //         updateThumbnail(dropZoneElement, inputElement.files[0]);
  //       }
  //     });

  //     dropZoneElement.addEventListener("dragover", (e) => {
  //       e.preventDefault();
  //       dropZoneElement.classList.add("drop-zone--over");
  //     });

  //     ["dragleave", "dragend"].forEach((type) => {
  //       dropZoneElement.addEventListener(type, (e) => {
  //         dropZoneElement.classList.remove("drop-zone--over");
  //       });
  //     });

  //     dropZoneElement.addEventListener("drop", (e) => {
  //       e.preventDefault();

  //       if (e.dataTransfer.files.length) {
  //         inputElement.files = e.dataTransfer.files;
  //         updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
  //       }

  //       dropZoneElement.classList.remove("drop-zone--over");
  //     });
  //   });

  //   /**
  //    * Updates the thumbnail on a drop zone element.
  //    *
  //    * @param {HTMLElement} dropZoneElement
  //    * @param {File} file
  //    */
  //   function updateThumbnail(dropZoneElement, file) {
  //     let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  //     // First time - remove the prompt
  //     if (dropZoneElement.querySelector(".drop-zone__prompt")) {
  //       dropZoneElement.querySelector(".drop-zone__prompt").remove();
  //     }

  //     // First time - there is no thumbnail element, so lets create it
  //     if (!thumbnailElement) {
  //       thumbnailElement = document.createElement("div");
  //       thumbnailElement.classList.add("drop-zone__thumb");
  //       dropZoneElement.appendChild(thumbnailElement);
  //     }

  //     thumbnailElement.dataset.label = file.name;

  //     // Show thumbnail for image files
  //     if (file.type.startsWith("image/")) {
  //       const reader = new FileReader();

  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
  //       };
  //     } else {
  //       thumbnailElement.style.backgroundImage = null;
  //     }
  //   }
  // };
  // const upload1 = () => {
  //   document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  //     const dropZoneElement = inputElement.closest(".drop-zone");

  //     dropZoneElement.addEventListener("click", (e) => {
  //       inputElement.click();
  //     });

  //     inputElement.addEventListener("change", (e) => {
  //       if (inputElement.files.length) {
  //         updateThumbnail(dropZoneElement, inputElement.files[0]);
  //       }
  //     });

  //     dropZoneElement.addEventListener("dragover", (e) => {
  //       e.preventDefault();
  //       dropZoneElement.classList.add("drop-zone--over");
  //     });

  //     ["dragleave", "dragend"].forEach((type) => {
  //       dropZoneElement.addEventListener(type, (e) => {
  //         dropZoneElement.classList.remove("drop-zone--over");
  //       });
  //     });

  //     dropZoneElement.addEventListener("drop", (e) => {
  //       e.preventDefault();

  //       if (e.dataTransfer.files.length) {
  //         inputElement.files = e.dataTransfer.files;
  //         updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
  //       }

  //       dropZoneElement.classList.remove("drop-zone--over");
  //     });
  //   });

  //   /**
  //    * Updates the thumbnail on a drop zone element.
  //    *
  //    * @param {HTMLElement} dropZoneElement
  //    * @param {File} file
  //    */
  //   function updateThumbnail(dropZoneElement, file) {
  //     let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  //     // First time - remove the prompt
  //     if (dropZoneElement.querySelector(".drop-zone__prompt")) {
  //       dropZoneElement.querySelector(".drop-zone__prompt").remove();
  //     }

  //     // First time - there is no thumbnail element, so lets create it
  //     if (!thumbnailElement) {
  //       thumbnailElement = document.createElement("div");
  //       thumbnailElement.classList.add("drop-zone__thumb");
  //       dropZoneElement.appendChild(thumbnailElement);
  //     }

  //     thumbnailElement.dataset.label = file.name;

  //     // Show thumbnail for image files
  //     if (file.type.startsWith("image/")) {
  //       const reader = new FileReader();

  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
  //       };
  //     } else {
  //       thumbnailElement.style.backgroundImage = null;
  //     }
  //   }
  // };
  // // End upload photo

  function validateFields() {
    let e = {};

    if (!addressDocumentFront) {
      e.addressDocumentFront =
        "Image of Front of the Address Document must be provided.";
    }

    setErrors({ ...e });

    if (Object.keys(e).length) {
      return false;
    } else {
      return true;
    }
  }

  async function SubmitAddressDocumentRequest() {
    try {
      const data = {
        serviceProviderName: "Manual",
        fieldsList: [
          ...kycData,
          {
            fieldName: "Address",
            value: addressDocumentFront,
          },
        ],
      };

      const res = await authenticatedInstance({
        url: apis.verificationLevel3,
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
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-x-12">
          <form>
            <div className="form-row row">
              <div className="form-group col-md-6">
                <h4>Address Proof</h4>
                <h6>
                  Image file format must be jpg or png, file size cannot exceed
                  4 MB. Image should be clearly visible! Note should be clearly
                  readable!{" "}
                </h6>
                <h4 className="mb-2">Upload a Photo of ID Card</h4>
              </div>
            </div>
            <div className="form-row row justify-content-center">
              <div className="form-group col-md-5">
                <label className="upload-section">
                  <div className="drop-zone" htmlFor="addressDocumentFront">
                    <span className="drop-zone__prompt">
                      <img src="/images/upload-icon.png"></img>
                      <br />
                      Front of Document
                    </span>
                    <input
                      type="file"
                      id="addressDocumentFront"
                      name="myFile"
                      className="drop-zone__input"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file.size > 1000 * 1000 * 4) {
                          alert("File size exceeds the Allowed document size.");
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = function () {
                          // console.log("RESULT", reader.result);
                          setAddressDocumentFront(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>
                  <div className="text-danger">
                    {errors?.addressDocumentFront}
                  </div>
                </label>
              </div>
              {/* <div className="form-group col-md-5">
                <label className="upload-section" htmlFor="addressDocumentBack">
                  <div className="drop-zone">
                    <span className="drop-zone__prompt">
                      <img src="/images/upload-icon.png"></img>
                      <br />
                      Back of Document
                    </span>
                    <input
                      type="file"
                      id="addressDocumentBack"
                      name="myFile"
                      className="drop-zone__input"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = function () {
                          // console.log("RESULT", reader.result);
                          setAddressDocumentBack(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>
                </label>
              </div> */}
            </div>
            <div className="form-row row justify-content-center">
              <div className="form-group col-md-4">
                <button
                  type="button"
                  className="forgot-btn"
                  onClick={() => {
                    const validity = validateFields();
                    if (validity) {
                      SubmitAddressDocumentRequest();
                    } else {
                      errorToast("Data provided in the Form is invalid.");
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
