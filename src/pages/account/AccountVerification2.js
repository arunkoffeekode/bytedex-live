import React from "react";
import { Link } from "react-router-dom";

function AccountVerification2() {
  // Camera start
  /* JS comes here */
  (function () {
    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
      video = document.getElementById("video");
      canvas = document.getElementById("canvas");
      photo = document.getElementById("photo");
      startbutton = document.getElementById("startbutton");

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        })
        .catch(function (err) {
          console.log("An error occurred: " + err);
        });

      video.addEventListener(
        "canplay",
        function (ev) {
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);

            if (isNaN(height)) {
              height = width / (4 / 3);
            }

            video.setAttribute("width", width);
            video.setAttribute("height", height);
            canvas.setAttribute("width", width);
            canvas.setAttribute("height", height);
            streaming = true;
          }
        },
        false
      );

      startbutton.addEventListener(
        "click",
        function (ev) {
          takepicture();
          ev.preventDefault();
        },
        false
      );

      clearphoto();
    }

    function clearphoto() {
      var context = canvas.getContext("2d");
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);

      var data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    }

    function takepicture() {
      var context = canvas.getContext("2d");
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataURL("image/png");
        photo.setAttribute("src", data);
      } else {
        clearphoto();
      }
    }

    window.addEventListener("load", startup, false);
  })();
  // Camera End
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
                      Account
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
                  Level 2
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountVerification2;
