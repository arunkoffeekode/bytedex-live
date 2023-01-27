import React from "react";

function Kycverification2() {
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
      <div className="forgot">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="checkout-form-centre">
              <h1>KYC Verification</h1>
              <p>
                Complete verification to access services. Get verified to <br />
                achieve higher trading capacity.
              </p>
              <div className="section-complete">
                <ul>
                  <li className="active"></li>
                  <li className="active"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="checkout-login-step mt-5">
                <div id="myTab1Content" className="tab-content">
                  <div
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                    className="tab-pane fade active show"
                  >
                    <form>
                      <div className="form-row">
                        <h4 className="mb-2">PAN Details</h4>
                        <h6>
                          Only the following documents listed below will be
                          accepted, all other documents will be rejected.
                        </h6>
                        <div className="form-group col-md-12">
                          <label for="inputName">PAN Number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputemail"
                          />
                        </div>
                        <h6 className="mb-2">Take a Photo of ID </h6>
                        <p className="photo">
                          File size must be between 10KB and 5120KB in
                          ..jpg/.jpeg/.png format.
                        </p>

                        <div className="form-group col-md-6">
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
                        <div className="form-group col-md-6">
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

                        <div className="form-group col-md-12 mb-0">
                          <button type="button" className="forgot-btn">
                            Continue
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kycverification2;
