import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function SelfieUpload({ selfie, setSelfie, errors }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const selfieRef = useRef();

  const [size, setSize] = useState({ width: 320, height: 0 });

  function enableCamera() {
    let _width = 320,
      _height = 0;

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => {
          console.log("Error occured connecting video source", error);
        });

      videoRef.current.addEventListener("canplay", (ev) => {
        ev.preventDefault();
        _height =
          videoRef.current.videoHeight / (videoRef.current.videoWidth / _width);

        if (isNaN(_height)) _height = _width / (4 / 3);

        videoRef.current.setAttribute("width", _width);
        videoRef.current.setAttribute("height", _height);
        canvasRef.current.setAttribute("width", _width);
        canvasRef.current.setAttribute("height", _height);

        setSize({ width: _width, height: _height });
      });
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    enableCamera();
  }, []);

  function takePicture() {
    console.log("take picture");
    const context = canvasRef.current.getContext("2d");

    if (size.width && size.height) {
      canvasRef.current.width = size.width;
      canvasRef.current.height = size.height;
      context.drawImage(videoRef.current, 0, 0, size.width, size.height);
      const data = canvasRef.current.toDataURL("image/png");
      selfieRef.current.setAttribute("src", data);
      setSelfie(data);
    } else {
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, size.width, size.height);
      var data = canvasRef.current.toDataURL("image/png");
      selfieRef.setAttribute("src", data);
      setSelfie("");
    }
  }

  return (
    <div>
      <form>
        <div className="form-row row">
          <div className="form-group col-md-5">
            <h4>Capture photo ID</h4>
            <h6>
              Use your computer webcam or a mobile phone to capture your photo
              ID document
            </h6>
          </div>
        </div>
        <div className="form-row row justify-content-center">
          <div className="form-group col-md-4">
            <div className="camera">
              <video id="video" width="320" height="240" ref={videoRef}>
                Video stream not available.
              </video>
            </div>
            <canvas
              id="canvas"
              width="320"
              height="240"
              ref={canvasRef}
            ></canvas>
            <div className="output">
              <img
                id="photo"
                alt="The screen capture will appear in this box."
                ref={selfieRef}
              />
            </div>
            <button
              type="button"
              className="sr-btn"
              onClick={() => {
                // enableCamera();
                takePicture();
              }}
            >
              Take a selfie
            </button>
            <div className="text-danger">{errors?.selfie}</div>
          </div>
          <div className="form-group col-md-4">
            <div className="mobile-box">
              <img src="/images/mobile-device.png"></img>
              <h5>Mobile Phone</h5>
              <p>My device does not have a camera</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
