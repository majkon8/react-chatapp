import React, { useState, useEffect } from "react";
import "./home.scss";
import Navbar from "../components/Navbar/Navbar";
import Lottie from "react-lottie";
import SideNav from "../components/SideNav/SideNav";
// Assets
import mainAnimation from "../assets/homeAnimation.json";
import aboutUs from "../assets/about_us.jpg";
import features from "../assets/features.jpg";
import security from "../assets/security.jpg";
import support from "../assets/support.jpg";
import download from "../assets/download.jpg";
// Icons
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";

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
      <div className="container">
        <section className="home-section mobile-welcome-message">
          <div className="section-text">
            <div className="section-text-big">Your place for chatting</div>
            <div className="section-text-small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut
              dictum sapien. Maecenas elementum enim et ullamcorper iaculis. Sed
              maximus velit et quam ullamcorper, non malesuada purus aliquam.
            </div>
          </div>
        </section>
        <section id="about_us" className="home-section">
          <div className="section-image">
            <img src={aboutUs} alt="about us" />
          </div>
          <div className="section-text">
            <div className="section-text-big">
              From passionate team to everyone of you
            </div>
            <div className="section-text-small">
              Fusce in dolor ac ex semper rutrum et rutrum nunc. Maecenas ac
              posuere orci. Cras quis ipsum tortor. Suspendisse potenti. Proin
              viverra porttitor interdum. Pellentesque in elit dui.
            </div>
          </div>
        </section>
        <section id="features" className="home-section wrap-reverse">
          <div className="section-text">
            <div className="section-text-big">
              Chat with friend or group of friends
            </div>
            <div className="section-text-small">
              Maecenas elementum non orci id sagittis. Ut efficitur lacinia
              lorem, sed tincidunt elit egestas in. Quisque dapibus tortor mi
              nec consequat nulla purus in nulla.
            </div>
          </div>
          <div className="section-image">
            <img src={features} alt="features" />
          </div>
        </section>
        <section id="security" className="home-section">
          <div className="section-image">
            <img src={security} alt="security" />
          </div>
          <div className="section-text">
            <div className="section-text-big">
              Designed with security in mind
            </div>
            <div className="section-text-small">
              In non sapien vitae dui pulvinar accumsan. Nam gravida, elit
              bibendum accumsan iaculis, nulla lectus convallis ex. Nullam orci
              lorem, laoreet ac sem in.
            </div>
          </div>
        </section>
        <section id="support" className="home-section wrap-reverse">
          <div className="section-text">
            <div className="section-text-big">
              You can always get help from our team
            </div>
            <div className="section-text-small">
              Cras rutrum facilisis posuere. Suspendisse facilisis mollis leo.
              Phasellus sed fermentum ante, ut fermentum lacus. In non sapien
              vitae dui pulvinar accumsan.
            </div>
          </div>
          <div className="section-image">
            <img src={support} alt="support" />
          </div>
        </section>
        <section id="download" className="home-section">
          <div className="section-image">
            <img src={download} alt="download" />
          </div>
          <div className="section-text">
            <div className="section-text-big">
              Available on every device for every user
            </div>
            <div className="section-text-small">
              In non sapien vitae dui pulvinar accumsan. Nam gravida, elit
              bibendum accumsan iaculis, nulla lectus convallis ex. Nullam orci
              lorem, laoreet ac sem in.
            </div>
          </div>
        </section>
      </div>
      <footer className="my-footer">
        <a href="/" className="logo">
          <span className="has-text-white">CHAT</span>
          <span className="has-text-primary">APP</span>
        </a>
        <span className="socials">
          <a href="https://www.facebook.com/">
            <FacebookIcon />
          </a>
          <a href="https://www.github.com/majkon8/chatapp">
            <GitHubIcon />
          </a>
          <a href="https://www.twitter.com/">
            <TwitterIcon />
          </a>
        </span>
        <span className="copyrights">
          Copyright ® All rights reserved ChatApp
        </span>
      </footer>
    </>
  );
}
