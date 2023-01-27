import React from "react";
import aplhaCodeOptions from "./aplhaCodeOptions.json";

export default function DocumentIDUpload({
  setCountryAlphaCode,
  setDocumentType,
  setDocumentIdNumber,
  setDocumentFront,
  setDocumentBack,
  errors,
}) {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-xl-6 col-sm-12">
          <div className="level-info">
            <h5>Identity Document</h5>
            <form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="inputName">Country Alpha Code</label>
                  <select
                    name=""
                    id=""
                    className="form-control"
                    onChange={(e) => {
                      setCountryAlphaCode(e.target.value);
                    }}
                  >
                    <option value={null} selected>
                      Select Country
                    </option>
                    {Object.keys(aplhaCodeOptions).map((el) => (
                      <option value={aplhaCodeOptions[el]}>{el}</option>
                    ))}
                  </select>
                  <div className="text-danger">{errors?.countryAlphaCode}</div>
                </div>

                <div className="form-group col-md-12">
                  <label for="inputName">Identity Document Type</label>
                  <select
                    name=""
                    id=""
                    className="form-control"
                    onChange={(e) => {
                      setDocumentType(e.target.value);
                    }}
                  >
                    <option value="" selected>
                      Select Document
                    </option>
                    {documentTypes.map((dt, key) => (
                      <option key={key} value={dt.value}>
                        {dt.name}
                      </option>
                    ))}
                  </select>
                  <div className="text-danger">{errors?.documentType}</div>
                </div>

                <div className="form-group col-md-12">
                  <label for="inputName">Identity Document Number </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputemail"
                    onChange={(e) => {
                      setDocumentIdNumber(e.target.value);
                    }}
                  />
                  <div className="text-danger">{errors?.documentIdNumber}</div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-6 col-md-12 col-xl-6 col-sm-12">
          <div className="level-info mt-5">
            <h4>Use a valid government-issued document</h4>
            <p>
              Image file format must be jpg or png, file size cannot exceed 1
              MB. Face should be clearly visible! Note should be clearly
              readable!
            </p>
          </div>
        </div>
      </div>

      <form>
        <div className="form-row row">
          <div className="form-group col-md-6">
            <h4 className="mb-2">Upload a Photo of ID Card</h4>
          </div>
        </div>
        <div className="form-row row justify-content-center">
          <div className="form-group col-md-5">
            <div className="upload-section">
              <label
                htmlFor="documentFront"
                className="drop-zone"
                onClick={() => {
                  console.log("Upload 1");
                }}
              >
                <span className="drop-zone__prompt">
                  <img src="/images/upload-icon.png"></img>
                  <br />
                  Front of Document
                </span>
                <input
                  type="file"
                  id="documentFront"
                  name="myFile"
                  className="drop-zone__input"
                  onChange={(e) => {
                    // console.log(e.target.files[0]);
                    const file = e.target.files[0];
                    if (file.size > 1000 * 1000 * 4) {
                      alert("File size exceeds the Allowed document size.");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onloadend = function () {
                      // console.log("RESULT", reader.result);
                      setDocumentFront(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
              <div className="text-danger">{errors?.documentFront}</div>
            </div>
          </div>
          <div className="form-group col-md-5">
            <div className="upload-section">
              <label
                htmlFor="documentBack"
                className="drop-zone"
                onClick={() => {
                  console.log("Upload 2");
                }}
              >
                <span className="drop-zone__prompt">
                  <img src="/images/upload-icon.png"></img>
                  <br />
                  Back of Document
                </span>
                <input
                  type="file"
                  id="documentBack"
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
                      setDocumentBack(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
              <div className="text-danger">{errors?.documentBack}</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const documentTypes = [
  { name: "Passport", value: "PP" },
  { name: "Aadhar Card", value: "ID" },
  { name: "Voter ID Card", value: "ID" },
  { name: "Driver License", value: "DL" },
];
