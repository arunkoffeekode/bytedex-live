import React from "react";
import { Link } from "react-router-dom";
function AccountVerification3() {
  // Start upload photo
  const upload = () => {
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".drop-zone");

      dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
      });

      inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
      });

      dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
      });

      ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove("drop-zone--over");
        });
      });

      dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
          inputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    /**
     * Updates the thumbnail on a drop zone element.
     *
     * @param {HTMLElement} dropZoneElement
     * @param {File} file
     */
    function updateThumbnail(dropZoneElement, file) {
      let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

      // First time - remove the prompt
      if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
      }

      // First time - there is no thumbnail element, so lets create it
      if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
      }

      thumbnailElement.dataset.label = file.name;

      // Show thumbnail for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
      } else {
        thumbnailElement.style.backgroundImage = null;
      }
    }
  };
  const upload1 = () => {
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".drop-zone");

      dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
      });

      inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
      });

      dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
      });

      ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove("drop-zone--over");
        });
      });

      dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
          inputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    /**
     * Updates the thumbnail on a drop zone element.
     *
     * @param {HTMLElement} dropZoneElement
     * @param {File} file
     */
    function updateThumbnail(dropZoneElement, file) {
      let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

      // First time - remove the prompt
      if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
      }

      // First time - there is no thumbnail element, so lets create it
      if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
      }

      thumbnailElement.dataset.label = file.name;

      // Show thumbnail for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
      } else {
        thumbnailElement.style.backgroundImage = null;
      }
    }
  };
  // End upload photo

  return (
    <div>
      <div className="open-order">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="open-button">
                <ul>
                  <li>
                    <Link to="/account" href="#" className="open-btn">
                      Account{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/accountVerification" href="#" className="active">
                      Account Verification
                    </Link>
                  </li>
                  <li>
                    <Link to="/whitelisting" href="#" className="open-btn">
                      IP Whitelisting
                    </Link>
                  </li>
                  <li>
                    <Link to="/referrals" href="#" className="open-btn">
                      My Referrals{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/apikeys" href="#" className="open-btn">
                      Api Keys
                    </Link>
                  </li>
                  <li>
                    <Link to="/ExchangeToken" href="#" className="open-btn">
                      Exchange Token
                    </Link>
                  </li>
                  <li>
                    <Link to="/Volume" href="#" className="open-btn">
                      Volume Discount
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="verification-blue-box">
              <div className="flt">
                <h4>Your Account Identity Verification is</h4>
              </div>
              <div className="rlt">
                <button type="button" className="level">
                  Level 3
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-x-12">
            <div className="level-box">
              <div className="level-step">
                <ul>
                  <li>
                    <Link to="/accountVerification">
                      <button type="button" className="step active">
                        {" "}
                        <img src="images/level.png"></img>Level 1
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/accountVerification2">
                      <button type="button" className="step active">
                        {" "}
                        <img src="images/level.png"></img>Level 2
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/accountVerification3">
                      <button type="button" className="step active">
                        {" "}
                        <img src="images/level.png"></img>Level 3
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <h4>Address Proof</h4>
                    <h6>
                      Image file format must be jpg or png, file size cannot
                      exceed 4 MB. Image should be clearly visible! Note should
                      be clearly readable!{" "}
                    </h6>
                    <h4 className="mb-2">Upload a Photo of ID Card</h4>
                  </div>
                </div>
                <div className="form-row justify-content-center">
                  <div className="form-group col-md-5">
                    <div className="upload-section">
                      <div className="drop-zone" onClick={upload}>
                        <span className="drop-zone__prompt">
                          <img src="images/upload-icon.png"></img>
                          <br />
                          Front of Document
                        </span>
                        <input
                          type="file"
                          name="myFile"
                          className="drop-zone__input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-5">
                    <div className="upload-section">
                      <div className="drop-zone" onClick={upload1}>
                        <span className="drop-zone__prompt">
                          <img src="images/upload-icon.png"></img>
                          <br />
                          Back of Document
                        </span>
                        <input
                          type="file"
                          name="myFile"
                          className="drop-zone__input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row justify-content-center">
                  <div className="form-group col-md-4">
                    <button type="button" className="forgot-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountVerification3;
