import React from "react";
import OwlCarousel from "react-owl-carousel";

function Home() {
  return (
    <div>
      <section className="banner_main">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="images/slider.png"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="images/slider.png"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="images/slider.png"
                alt="Third slide"
              />
            </div>
          </div>
        </div>
        <div className="booking_online">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 col-sm-12 col-xl-7">
                <div className="box">
                  <ul
                    id="myTab1"
                    role="tablist"
                    className="nav nav-tabs nav-pills"
                  >
                    <li className="nav-item">
                      <a
                        id="description-tab"
                        data-toggle="tab"
                        href="#description"
                        role="tab"
                        aria-controls="description"
                        aria-selected="false"
                        className="nav-link  active show"
                      >
                        Flights Booking
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        id="review-tab"
                        data-toggle="tab"
                        href="#review"
                        role="tab"
                        aria-controls="review"
                        aria-selected="true"
                        className="nav-link"
                      >
                        Manage Booking
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        id="Status-tab"
                        data-toggle="tab"
                        href="#Status"
                        role="tab"
                        aria-controls="Status"
                        aria-selected="true"
                        className="nav-link"
                      >
                        Flight Status
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        id="Check-tab"
                        data-toggle="tab"
                        href="#Check"
                        role="tab"
                        aria-controls="Check"
                        aria-selected="true"
                        className="nav-link"
                      >
                        Web Check-In
                      </a>
                    </li>
                  </ul>
                </div>
                <div id="myTab1Content" className="tab-content boook-details">
                  <div
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                    className="tab-pane fade show active"
                  >
                    <div className="drp-box">
                      <div className="left-drp">
                        <label for="">From</label>
                        <div className="dropdown">
                          <button
                            className="btn  dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Delhi (DEL)
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Surat
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Ahmedabad
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="box-logo">
                        <img src="images/swap.png" alt="" />
                      </div>
                      <div className="right-drp">
                        <label for="">To</label>
                        <div className="dropdown">
                          <button
                            className="btn  dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Select Destination
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Surat
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Ahmedabad
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="tirp-tab">
                      <ul
                        id="myTab1"
                        role="tablist"
                        className="nav nav-tabs nav-pills"
                      >
                        <li className="nav-item">
                          <a
                            id="description-tab"
                            data-toggle="tab"
                            href="#description1"
                            role="tab"
                            aria-controls="description"
                            aria-selected="true"
                            className="nav-link  active"
                          >
                            One Way
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            id="review-tab"
                            data-toggle="tab"
                            href="#Trip"
                            role="tab"
                            aria-controls="Trip"
                            aria-selected="false"
                            className="nav-link "
                          >
                            Round Trip
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div id="myTab1Content" className="tab-content">
                      <div
                        id="description1"
                        role="tabpanel"
                        aria-labelledby="description-tab"
                        className="tab-pane fade show active"
                      >
                        <div className="trip">
                          <form>
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                <label for="inputName">Departure Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="inputName"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label for="inputPhone">Return Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="inputPhone"
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label for="inputPhone">
                                  Number of Passenger
                                </label>
                                <select name="" id="" className="form-control">
                                  <option value="1" selected>
                                    01
                                  </option>
                                  <option value="1" selected>
                                    01
                                  </option>
                                  <option value="1" selected>
                                    01
                                  </option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-12 mt-4">
                      <div className="sky-cloud">
                        <img src="images/cloud-bg.png" alt="" />
                      </div>
                      <button type="button" className="sky-btn">
                        Book Now
                      </button>
                    </div>
                  </div>

                  <div
                    id="review"
                    role="tabpanel"
                    aria-labelledby="review-tab"
                    className="tab-pane fade"
                  >
                    <div className="manage-booking">
                      <h3>View / Manage Booking</h3>
                      <p>View, Modify or Cancel your bookings</p>
                      <div className="trip" style={{ marginTop: "50px" }}>
                        <form>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label for="inputName">
                                PNR Number / Ticket Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="e.g. VA904 "
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label for="inputPhone">
                                Email ID / Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputPhone"
                                placeholder="e.g. abc@gmail.com "
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="form-group col-md-12 mt-4">
                        <div className="sky-cloud">
                          <img src="images/cloud-bg.png" alt="" />
                        </div>
                        <button type="button" className="sky-btn">
                          Search Booking
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    id="Check"
                    role="tabpanel"
                    aria-labelledby="Check-tab"
                    className="tab-pane fade"
                  >
                    <div className="manage-booking">
                      <h3>Web Check-In</h3>
                      <p>
                        Web check-in is available for all flights and closes 60
                        mins prior to departure.
                      </p>
                      <div className="trip" style={{ marginTop: "50px" }}>
                        <form>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label for="inputName">
                                PNR Number / Ticket Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="e.g. VA904 "
                              />
                            </div>
                            <div className="form-group col-md-12">
                              <label for="inputPhone">
                                Email ID / Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputPhone"
                                placeholder="e.g. abc@gmail.com "
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="form-group col-md-12 mt-4">
                        <div className="sky-cloud">
                          <img src="images/cloud-bg.png" alt="" />
                        </div>
                        <button type="button" className="sky-btn">
                          Search Booking
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    id="Status"
                    role="tabpanel"
                    aria-labelledby="Status-tab"
                    className="tab-pane fade"
                  >
                    <div className="manage-booking">
                      <h3>Flight Status</h3>
                      <p>Get up-to-date flight status.</p>
                      <div className="trip" style={{ marginTop: "50px" }}>
                        <form>
                          <div className="form-row">
                            <div className="form-group col-md-12">
                              <label for="inputName">PNR No.</label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="e.g. VA904 "
                              />
                            </div>
                            <span className="mb-2">or</span>
                            <div className="form-group col-md-12">
                              <label for="inputPhone">
                                Email ID/Mobile Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputPhone"
                                placeholder="e.g. abc@gmail.com "
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="form-group col-md-12 mt-4">
                        <div className="sky-cloud">
                          <img src="images/cloud-bg.png" alt="" />
                        </div>
                        <button type="button" className="sky-btn">
                          Check Status
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="searches">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="main-title-black">
                <h2>Recent Searches</h2>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-4 col-sm-12">
              <div className="search-box">
                <div className="date">01-Apr-2022</div>
                <div className="way">one way</div>
                <div className="route">
                  <h5>Surat</h5>
                  <a href="">
                    <i className="fa fa-exchange" aria-hidden="true"></i>
                  </a>
                  <h5>Ahmedabad</h5>
                </div>
                <span>1 Adult, 0 child, 0 infant</span>
                <div className="btm">
                  <div className="result">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-result dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        Show Results
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Booking
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Pending
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Booking
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="share">
                    <ul className="wishlistShare">
                      <li
                        className="share-icon"
                        style={{ position: "relative" }}
                      >
                        <i className="fa fa-share-alt" aria-hidden="true">
                          <div className="shareSites">
                            <ul>
                              <li>
                                <a href="#" target="_blank">
                                  <i className="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" target="_blank">
                                  <i className="fa fa-google-plus"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" target="_blank">
                                  <i className="fa fa-pinterest"></i>
                                </a>
                              </li>
                              <li className="whatsup-icon">
                                {" "}
                                <a href="#" target="_blank">
                                  <i className="fa fa-whatsapp"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-4 col-sm-12">
              <div className="search-box">
                <div className="date">01-Apr-2022</div>
                <div className="way">one way</div>
                <div className="route">
                  <h5>Surat</h5>
                  <a href="">
                    <i className="fa fa-exchange" aria-hidden="true"></i>
                  </a>
                  <h5>Ahmedabad</h5>
                </div>
                <span>1 Adult, 0 child, 0 infant</span>
                <div className="btm">
                  <div className="result">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-result dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        Show Results
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Booking
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Pending
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Booking
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="share">
                    <ul className="wishlistShare">
                      <li
                        className="share-icon"
                        style={{ position: "relative" }}
                      >
                        <i className="fa fa-share-alt" aria-hidden="true">
                          <div className="shareSites">
                            <ul>
                              <li>
                                <a href="#" target="_blank">
                                  <i className="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" target="_blank">
                                  <i className="fa fa-google-plus"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" target="_blank">
                                  <i className="fa fa-pinterest"></i>
                                </a>
                              </li>
                              <li className="whatsup-icon">
                                {" "}
                                <a href="#" target="_blank">
                                  <i className="fa fa-whatsapp"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-xl-4 col-sm-12">
              <div className="search-box">
                <div className="date">01-Apr-2022</div>
                <div className="way">one way</div>
                <div className="route">
                  <h5>Surat</h5>
                  <a href="">
                    <i className="fa fa-exchange" aria-hidden="true"></i>
                  </a>
                  <h5>Ahmedabad</h5>
                </div>
                <span>1 Adult, 0 child, 0 infant</span>
                <div className="btm">
                  <div className="result">
                    <div className="dropdown">
                      <button
                        type="button"
                        className="btn btn-result dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        Show Results
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Booking
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Pending
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Booking
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="share">
                    <ul className="wishlistShare">
                      <li
                        className="share-icon"
                        style={{ position: "relative" }}
                      >
                        <i className="fa fa-share-alt" aria-hidden="true">
                          <div className="shareSites">
                            <ul>
                              <li>
                                <a href="#" target="_blank">
                                  <i className="fa fa-facebook"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" target="_blank">
                                  <i className="fa fa-google-plus"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#" target="_blank">
                                  <i className="fa fa-pinterest"></i>
                                </a>
                              </li>
                              <li className="whatsup-icon">
                                {" "}
                                <a href="#" target="_blank">
                                  <i className="fa fa-whatsapp"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-page-second-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <OwlCarousel
                className="owl-carousel owl-theme"
                loop
                margin={10}
                items={4}
                nav
              >
                <div className="item">
                  <div className="home-page-services">
                    <div className="icon-section">
                      <img src="images/assist.png" alt="" />
                    </div>
                    <h5>Change Assist</h5>
                    <p>
                      (Choose alternate flight or refund for changed / cancelled
                      flights)
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="home-page-services">
                    <div className="icon-section">
                      <img src="images/deals.png" alt="" />
                    </div>
                    <h5>Deals</h5>
                    <p>
                      Lorem ipsum dolor sit amet, adipiscing elit. Quisque morbi
                      amet nisl.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="home-page-services">
                    <div className="icon-section">
                      <img src="images/print.png" alt="" />
                    </div>
                    <h5>print tickets</h5>
                    <p>
                      Lorem ipsum dolor sit amet, adipiscing elit. Quisque morbi
                      amet nisl.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="home-page-services">
                    <div className="icon-section">
                      <img src="images/invoice.png" alt="" />
                    </div>
                    <h5>GST Invoice</h5>
                    <p>
                      Lorem ipsum dolor sit amet, adipiscing elit. Quisque morbi
                      amet nisl.
                    </p>
                  </div>
                </div>
                <div className="item">
                  <div className="home-page-services">
                    <div className="icon-section">
                      <img src="images/print.png" alt="" />
                    </div>
                    <h5>print tickets</h5>
                    <p>
                      Lorem ipsum dolor sit amet, adipiscing elit. Quisque morbi
                      amet nisl.
                    </p>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>

      <section className="charter">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12 col-xl-5">
              <div className="main-title-black mrt">
                <h2>Charter</h2>
              </div>
              <div className="sky-section">
                <h6>Your private space in the sky</h6>
                <p>
                  Now book a private charter for small
                  <br /> groups or big
                </p>
              </div>
              <div className="sky-cloud">
                <img src="images/cloud-bg.png" alt="" />
              </div>
              <button type="button" className="sky-btn">
                Book Now
              </button>
              <a href="">View all...</a>
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 col-xl-7">
              <div className="frame">
                <img src="images/chracter.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="visit">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="main-title-black">
                <h2>must Visit places </h2>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xl-4">
              <div className="visit-places">
                <img src="images/visit-1.png" alt="" />
                <div className="location">
                  <div className="left-section">
                    <h6>Surat</h6>
                    <p>From ₹2000</p>
                  </div>
                  <div className="right-section">
                    <button type="button" className="wishlist">
                      4.4 <i className="fa fa-star" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div className="cloud">
                  <img src="images/cloud-bg.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xl-4">
              <div className="visit-places">
                <img src="images/visit-2.png" alt="" />
                <div className="location">
                  <div className="left-section">
                    <h6>ahmedabad</h6>
                    <p>From ₹2000</p>
                  </div>
                  <div className="right-section">
                    <button type="button" className="wishlist">
                      4.4 <i className="fa fa-star" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div className="cloud">
                  <img src="images/cloud-bg.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xl-4">
              <div className="visit-places">
                <img src="images/visit-3.png" alt="" />
                <div className="location">
                  <div className="left-section">
                    <h6>bhavnagar</h6>
                    <p>From ₹2000</p>
                  </div>
                  <div className="right-section">
                    <button type="button" className="wishlist">
                      4.4 <i className="fa fa-star" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div className="cloud">
                  <img src="images/cloud-bg.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="youtube">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="content">
                <h5>PRIVATE CHARTERS</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque fusce donec turpis in ut. Cras consectetur
                  feugiat ridiculus amet, in est feugiat sed. A faucibus turpis
                  dictumst et enim sit et parturient ornare. Porta pretium sem
                  sem in ultricies tortor vel vitae diam. Aliquet tortor ac
                  magna vitae sem purus cursus augue. Blandit vitae, nibh mattis
                  orci massa montes. Dolor, consectetur vel nunc ut nunc morbi.
                  Purus neque sed eu nisi vestibulum bibendum porttitor purus
                  diam. Sit quis lectus velit est metus nec vulputate.
                </p>
                <p>
                  Sed magna faucibus in mauris, egestas non amet, a. Cursus eros
                  id purus proin tellus non. Turpis adipiscing volutpat
                  consequat morbi elit erat nec commodo turpis. Dignissim nam
                  amet amet neque a a ut a pellentesque. A aenean nec in tortor.
                  Scelerisque praesent sit integer proin molestie viverra
                  vivamus. Fusce mi porta amet.
                </p>
              </div>
              <div className="checkout-form-centre">
                <div className="checkout-login-step">
                  <div className="youtube-box">
                    <a href="" target="_blank">
                      <img src="images/video.jpg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="discover">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="main-title-black">
                <h2>DISCOVER </h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
              <div className="discover-box">
                <img src="images/discover.jpg" alt="" />
                <h5>ahmedabad</h5>
                <p>From ₹2000</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
              <div className="discover-box">
                <img src="images/discover.jpg" alt="" />
                <h5>ahmedabad</h5>
                <p>From ₹2000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-app">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="bx-details">
                <h2>
                  Deals from your favorite booking sites
                  <br />
                  Download our mobile app
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu id
                  sit lectus nibh. Sed massa, imperdiet commodo consectetur
                  commodo quam ante morbi sit. A amet consequat mi tellus nulla.
                  Justo.
                </p>
                <div className="app-img">
                  <div className="img-section">
                    <img src="images/desktp.png" alt="" />
                  </div>
                  <div className="img-barcode">
                    <img src="images/barcode.png" alt="" />
                    <div className="scan">
                      <span>Scan the QR code</span>
                      <div className="app">
                        <a href="" className="mr-1">
                          <img src="images/google-play.png" alt="" />
                        </a>
                        <a href="">
                          <img src="images/app-store.png" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
