import axios from "axios";
import { Country, State, City } from "country-state-city";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { apis } from "../../apis.constants";
import { authenticatedInstance } from "../../utils/api";
import nationalityOptions from "./nationalityOptions.json";
import {
  INITIAL_COUNTRY,
  level1Initials,
  level1ValidationSchema,
} from "./verification.utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../utils/v2/toasts";
import { useTranslation } from "react-i18next";

export default function VerificationLevel1() {
  const { t } = useTranslation();
  const [_codes, _setCodes] = useState({
    ICountryCode: INITIAL_COUNTRY,
    IStates: [],
    IStateCode: "",
    ICities: [],
    ICityCode: "",
  });

  const [state, setState] = useState({
    fullName: "",
    gender: "Male",
    maritalStatus: "Single",
    dateOfBirth: "",
    documentIdNumber: "",
    guardian: "",
    mobile: "",
    email: "",
    nationality: INITIAL_COUNTRY,
    address1: "",
    address2: "",
    pin: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    (async () => {
      const res = await authenticatedInstance({
        url: apis.getVerificationForm,
        method: "GET",
      });
    })();

    (() => {
      _setCodes({
        ..._codes,
        IStates: State.getStatesOfCountry(_codes.ICountryCode),
      });
    })();
  }, []);

  async function SubmitLevel1VerificationRequest(values) {
    try {
      const state = values;
      const data = {
        ServiceProviderName: "Manual",
        FieldsList: [
          { FieldName: "FullName", Value: state.fullName },
          { FieldName: "IDCard Number", Value: state.documentIdNumber },
          { FieldName: "Job Info", Value: state.guardian },
          { FieldName: "Gender", Value: state.gender },
          { FieldName: "MaritalStatus", Value: state.maritalStatus },
          {
            FieldName: "DateOfBirth",
            Value: new Date(state.dateOfBirth).toISOString(),
          },
          {
            FieldName: "CurrentResident",
            Value: state.address1 + " " + state.address2,
          },
          { FieldName: "MobilePhone", Value: state.mobile },
          { FieldName: "Email", Value: state.email },
          {
            FieldName: "FullAdress",
            Value: state.address1 + " " + state.address2,
          },
          { FieldName: "Street", Value: state.address1 },
          { FieldName: "City", Value: state.city },
          { FieldName: "State", Value: state.state },
          { FieldName: "Nationality", Value: state.nationality },
          { FieldName: "ZipCode", Value: state.pin },
        ],
      };

      const res = await authenticatedInstance({
        url: apis.verificationLevel1,
        method: "POST",
        data: data,
      });

      if (res.data?.status === "Success") {
        // alert(
        //   "Your Data has been Submitted and will be reviewd shortly. You can Close this Window." +
        //     "tracling id" +
        //     res.data?.data?.trackingId
        // );

        // console.log(res.data?.trackingId);

        // localStorage.setItem(
        //   "verification_tracking_id",
        //   res.data?.data?.trackingId
        // );

        successToast(t(`messages.${res?.data?.message}`));
      } else {
        errorToast(t(`messages.${res?.data?.message}`));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ToastContainer />
      <Formik
        initialValues={level1Initials}
        validationSchema={level1ValidationSchema}
        onSubmit={(values) => {
          // console.log(values);
          SubmitLevel1VerificationRequest(values);
        }}
        validateOnBlur={false}
      >
        {({
          values,
          errors,
          touched,
          dirty,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form>
            <div className="row">
              <div className="col-lg-6 col-md-12 col-xl-6 col-sm-12">
                <div className="level-info">
                  <h5>Personal Information</h5>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label for="inputName">Full Name</label>
                      <Field
                        type="text"
                        name="fullName"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="fullName" />
                      </div>
                      {/* <input
                        id="inputemail"
                        name="fullName"
                        className="form-control"
                        // value={state.fullName}
                        // onChange={(e) => {
                        //   setState({ ...state, fullName: e.target.value });
                        // }}

                        // value={values.fullName}
                        // onChange={handleChange}
                        // onBlur={() => {
                        //   console.log(touched.fullName);
                        //   if (touched.fullName) {
                        //     handleBlur();
                        //   }
                        // }}
                      /> */}
                    </div>

                    <div className="form-group col-md-12">
                      <label for="inputName">Gender</label>
                      <Field name="gender" className="form-control" as="select">
                        {/* <select
                        className="form-control"
                        value={state.gender}
                        onChange={(e) => {
                          setState({ ...state, gender: e.target.value });
                        }}
                      > */}
                        <option value="Male" selected>
                          Male
                        </option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        {/* </select> */}
                      </Field>
                      <div className="text-danger">
                        <ErrorMessage name="gender" />
                      </div>
                    </div>

                    <div className="form-group col-md-12">
                      <label for="inputName">Marital Status</label>
                      <Field
                        name="maritalStatus"
                        className="form-control"
                        as="select"
                      >
                        {/* <select
                        className="form-control"
                        value={state.maritalStatus}
                        onChange={(e) => {
                          setState({ ...state, maritalStatus: e.target.value });
                        }}
                        > */}
                        <option value="Single" selected>
                          Single
                        </option>
                        <option value="Married">Married</option>
                        {/* </select> */}
                      </Field>
                      <div className="text-danger">
                        <ErrorMessage name="maritalStatus" />
                      </div>
                    </div>

                    <div className="form-group col-md-12">
                      <label for="inputName">Date of Birth</label>
                      <Field
                        type="date"
                        name="dateOfBirth"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="dateOfBirth" />
                      </div>
                      {/* <input
                        type="date"
                        className="form-control"
                        id="inputemail"
                        value={state.dateOfBirth}
                        onChange={(e) => {
                          setState({
                            ...state,
                            dateOfBirth: e.target.value,
                          });
                        }}
                        /> */}
                    </div>

                    <div className="form-group col-md-12">
                      <label for="inputName">Document ID Card Number</label>
                      <Field
                        type="text"
                        name="documentIdNumber"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="documentIdNumber" />
                      </div>
                      {/* <input
                        type="text"
                        className="form-control"
                        id="inputemail"
                        value={state.documentIdNumber}
                        onChange={(e) => {
                          setState({
                            ...state,
                            documentIdNumber: e.target.value,
                          });
                        }}
                      /> */}
                    </div>

                    <div className="form-group col-md-12">
                      <label for="inputName">Job Info(Guardian)</label>
                      <Field
                        type="text"
                        name="guardian"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="guardian" />
                      </div>
                      {/* <input
                        type="text"
                        className="form-control"
                        id="inputemail"
                        value={state.guardian}
                        onChange={(e) => {
                          setState({ ...state, guardian: e.target.value });
                        }}
                      /> */}
                    </div>

                    <div className="form-group col-md-12">
                      <label for="inputName">Mobile</label>
                      <Field
                        type="text"
                        name="mobile"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="mobile" />
                      </div>
                      {/* <input
                        type="text"
                        className="form-control"
                        id="inputemail"
                        value={state.mobile}
                        onChange={(e) => {
                          setState({ ...state, mobile: e.target.value });
                        }}
                      /> */}
                      <div>
                        Mobile Number with Country Code (eg. +91XXXXXXXXXX)
                      </div>
                    </div>

                    <div className="form-group col-md-12">
                      <label for="inputName">Email </label>
                      <Field
                        type="text"
                        name="email"
                        className="form-control"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="email" />
                      </div>
                      {/* <input
                        type="email"
                        className="form-control"
                        id="inputemail"
                        value={state.email}
                        onChange={(e) => {
                          setState({ ...state, email: e.target.value });
                        }}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-xl-6 col-sm-12">
                <div className="level-info">
                  <h5>Address Information</h5>
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label for="inputName">Nationality</label>
                        <select
                          name=""
                          id=""
                          className="form-control"
                          value={state.nationality}
                          onChange={(e) => {
                            _setCodes({
                              ..._codes,
                              ICountryCode: e.target.value,
                              IStates: State.getStatesOfCountry(e.target.value),
                            });

                            setState({ ...state, nationality: e.target.value });
                          }}
                        >
                          <option value={INITIAL_COUNTRY} selected>
                            India
                          </option>
                          {Object.keys(nationalityOptions).map((el) => (
                            <option
                              value={nationalityOptions[el]}
                              style={{ textTransform: "capitalize" }}
                            >
                              {el.charAt(0).toUpperCase() + el.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group col-md-12">
                        <label for="inputName">Residential Address</label>
                        <Field
                          type="text"
                          name="address1"
                          className="form-control"
                        />
                        {/* <input
                          type="text"
                          className="form-control"
                          id="inputemail"
                          value={state.address1}
                          onChange={(e) =>
                            setState({ ...state, address1: e.target.value })
                          }
                          maxLength="50"
                        /> */}
                        <div className="text-danger">
                          <ErrorMessage name="address1" />
                        </div>
                      </div>

                      <div className="form-group col-md-12">
                        <label for="inputName">Residential Address 2</label>
                        <Field
                          type="text"
                          name="address2"
                          className="form-control"
                        />
                        {/* <input
                          type="text"
                          className="form-control"
                          id="inputemail"
                          value={state.address2}
                          onChange={(e) =>
                            setState({ ...state, address2: e.target.value })
                          }
                          maxLength="50"
                        /> */}
                        <div className="text-danger">
                          <ErrorMessage name="address2" />
                        </div>
                      </div>

                      <div className="form-group col-md-12">
                        <label for="inputName">Pin</label>
                        <Field
                          type="text"
                          name="pin"
                          className="form-control"
                        />
                        {/* <input
                          type="text"
                          className="form-control"
                          id="inputemail"
                          value={state.pin}
                          onChange={(e) =>
                            setState({ ...state, pin: e.target.value })
                          }
                          pattern="\d*{5}"
                        /> */}
                        <div className="text-danger">
                          <ErrorMessage name="pin" />
                        </div>
                      </div>

                      <div className="form-group col-md-12">
                        <label for="inputName">State</label>
                        <select
                          name=""
                          id=""
                          className="form-control"
                          onChange={(e) => {
                            _setCodes({
                              ..._codes,
                              IStateCode: e.target.value,
                              ICities: City.getCitiesOfState(
                                _codes.ICountryCode,
                                e.target.value
                              ),
                            });

                            const _stateName = State.getStateByCodeAndCountry(
                              e.target.value,
                              _codes.ICountryCode
                            ).name;

                            setState({
                              ...state,
                              state: _stateName,
                            });
                            setFieldValue("state", _stateName);
                          }}
                        >
                          <option value="" selected>
                            Select State
                          </option>
                          {_codes.IStates.map((st, key) => (
                            <option value={st.isoCode} key={key} style={{}}>
                              {st.name}
                            </option>
                          ))}
                        </select>
                        <div className="text-danger">
                          <ErrorMessage name="state" />
                        </div>
                      </div>

                      <div className="form-group col-md-12">
                        <label for="inputName">City</label>
                        <select
                          name=""
                          id=""
                          className="form-control"
                          onChange={(e) => {
                            setState({ ...state, city: e.target.value });
                            setFieldValue("city", e.target.value);
                          }}
                        >
                          <option value="" selected>
                            Select City
                          </option>
                          {_codes.ICities.map((ct, key) => (
                            <option value={ct.name} selected>
                              {ct.name}
                            </option>
                          ))}
                        </select>
                        <div className="text-danger">
                          <ErrorMessage name="city" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                <div className="submit-btn">
                  <button type="submit" className="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {/* <pre>{JSON.stringify({ state }, null, 2)}</pre> */}
              </div>
              <div className="col">
                <pre>
                  {/* {JSON.stringify({ values, errors, touched, dirty }, null, 2)} */}
                </pre>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
