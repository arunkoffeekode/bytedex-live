import React from "react";

function Kycverification5() {
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
                  <li className="active"></li>
                  <li className="active"></li>
                  <li className="active"></li>
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
                        <div className="form-group col-md-12">
                          <h4>Capture photo ID</h4>
                          <h6>
                            Use your computer webcam or a mobile phone to
                            capture your photo ID document
                          </h6>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="camera">
                            <video id="video" width="320" height="240">
                              Video stream not available.
                            </video>
                          </div>
                          <canvas id="canvas" width="320" height="240"></canvas>
                          <div className="output">
                            <img
                              id="photo"
                              alt="The screen capture will appear in this box."
                            />
                          </div>
                          <button id="startbutton" className="sr-btn">
                            Take a selfie
                          </button>
                        </div>
                        <div className="form-group col-md-6">
                          <div className="mobile-box">
                            <img src="images/mobile-device.png"></img>
                            <h5>Mobile Phone</h5>
                            <p>My device does not have a camera</p>
                          </div>
                        </div>

                        <div className="form-group col-md-12 mb-0">
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
        </div>
      </div>
    </div>
  );
}

export default Kycverification5;
