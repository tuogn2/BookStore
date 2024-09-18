import React from "react";
import { Carousel } from "antd";
import banner1 from "~/Images/banner.jpeg";
import banner2 from "~/Images/banner4.png";
import banner3 from "~/Images/bannerbook.jpeg";
import "antd/dist/reset.css"; // Import Ant Design CSS

const banners = [banner1, banner2, banner3];




const contentStyle = {
  height: "370px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

function Banner() {
  return (

    <>
      <Carousel dotPosition="bottom"  draggable arrows autoplay autoplaySpeed={1500} arrowSize={400}>
        {banners.map((banner, index) => (
            <div key={index}>
              <h3 style={contentStyle}>
                <img
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </h3>
            </div>
        ))}
      </Carousel>
    </>
  );
}

export default Banner;
