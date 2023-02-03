import React from "react";

export default function BannerSlider() {
  return (
    // <div
    //   id="carouselExampleSlidesOnly"
    //   className="carousel slide"
    //   data-ride="carousel"
    // >
    //   <div className="carousel-inner">
    //     <div className="carousel-item active">
    //       <img
    //         className="d-block w-100"
    //         src="/images/market-trand.png"
    //         alt="First slide"
    //       />
    //     </div>
    //     <div className="carousel-item">
    //       <img
    //         className="d-block w-100"
    //         src="/images/market-trand1.png"
    //         alt="Second slide"
    //       />
    //     </div>
    //     <div className="carousel-item">
    //       <img
    //         className="d-block w-100"
    //         src="/images/market-trand.png"
    //         alt="Third slide"
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="row">
      <div className="container-fluid p-0">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-interval="10000">

          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                className="d-block w-100"
                src="/images/market-trand.png"
                alt="First slide"
              />
            </div>
            <div class="carousel-item">
              <img
                className="d-block w-100"
                src="/images/banner.png"
                alt="First slide"
              />
            </div>
            <div class="carousel-item">
              <img
                className="d-block w-100"
                src="/images/market-trand.png"
                alt="First slide"
              />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

  );
}
