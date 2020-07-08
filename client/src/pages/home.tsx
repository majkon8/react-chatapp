import React, { useState, useEffect } from "react";
import "./home.scss";
import Navbar from "../components/Navbar/Navbar";
import Lottie from "react-lottie";
import mainAnimation from "../assets/homeAnimation.json";
import SideNav from "../components/SideNav/SideNav";

function getWindowWidth() {
  const { innerWidth: width } = window;
  return width;
}

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowWidth;
}

export default function Home() {
  const [isSideOpen, setIsSideOpen] = useState(false);
  const width = useWindowWidth();

  const toggleOpen = () => setIsSideOpen(!isSideOpen);

  return (
    <>
      <div className="container">
        <Navbar toggleOpen={toggleOpen} isOpen={isSideOpen} />
      </div>
      <SideNav toggleOpen={toggleOpen} isOpen={isSideOpen} />
      <div className="welcome-message">
        <div className="big">Your place for chatting</div>
        <div className="small">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut
          dictum sapien. Maecenas elementum enim et ullamcorper iaculis. Sed
          maximus velit et quam ullamcorper, non malesuada purus aliquam.
        </div>
      </div>
      <Lottie
        style={{ position: "relative", top: width > 1024 ? -80 : 0 }}
        width="100%"
        options={{
          loop: true,
          autoplay: true,
          animationData: mainAnimation,
          rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
        }}
      />
    </>
  );
}
