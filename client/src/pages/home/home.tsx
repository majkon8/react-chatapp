import React, { useState, useEffect, useRef } from "react";
import "./home.scss";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Lottie from "react-lottie";
import SideNav from "../../components/SideNav/SideNav";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeSection from "../../components/HomeSection/HomeSection";
import Footer from "../../components/Footer/Footer";
// Assets
import mainAnimation from "../../assets/homeAnimation.json";
import aboutUs from "../../assets/about_us.jpg";
import features from "../../assets/features.jpg";
import security from "../../assets/security.jpg";
import support from "../../assets/support.jpg";
import download from "../../assets/download.jpg";

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
  let wrapper = useRef<HTMLDivElement>(null);
  let welcomeMessageBig = useRef(null);
  let welcomeMessageSmall = useRef(null);
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
      y: "100vh",
    },
    in: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    out: {
      opacity: 0,
      x: "100vw",
      y: "-100vh",
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8,
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const elements = wrapper!.current!.children[4];
    const sectionTextElements = elements.querySelectorAll(
      ".section-text-big, .section-text-small"
    );
    const sectionImageLeftElements = elements.querySelectorAll(
      ".section-image-left"
    );
    const sectionImageRightElements = elements.querySelectorAll(
      ".section-image-right"
    );
    sectionTextElements.forEach((element) => {
      ScrollTrigger.create({
        trigger: element,
        onEnter: () => {
          gsap.from(element, 0.5, {
            autoAlpha: 0,
            y: 100,
            ease: "Power3.inOut",
          });
        },
        onEnterBack: () => {
          gsap.from(element, 0.5, {
            autoAlpha: 0,
            y: -100,
            ease: "Power3.inOut",
          });
        },
      });
    });
    sectionImageLeftElements.forEach((element) => {
      gsap.from(element, 1, {
        scrollTrigger: {
          trigger: element,
          toggleActions: "restart none restart none",
        },
        autoAlpha: 0,
        x: -100,
        ease: "Power3.inOut",
      });
    });
    sectionImageRightElements.forEach((element) => {
      gsap.from(element, 1, {
        scrollTrigger: {
          trigger: element,
          toggleActions: "restart none restart none",
        },
        autoAlpha: 0,
        x: 100,
        ease: "Power3.inOut",
      });
    });
    const timeline = gsap.timeline();
    timeline
      .to(welcomeMessageBig.current, 0.5, { opacity: 0 })
      .to(welcomeMessageBig.current, 0.5, { opacity: 1 })
      .to(welcomeMessageSmall.current, 0.5, { opacity: 1 });
  }, []);

  const toggleOpen = () => setIsSideOpen(!isSideOpen);

  return (
    <motion.div
      ref={wrapper}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ backgroundColor: "white", position: "absolute", width: "100%" }}
    >
      <div className="container">
        <Navbar toggleOpen={toggleOpen} isOpen={isSideOpen} />
        <SideNav toggleOpen={toggleOpen} isOpen={isSideOpen} />
      </div>

      <div className="welcome-message">
        <div ref={welcomeMessageBig} className="big">
          Your place for chatting
        </div>
        <div ref={welcomeMessageSmall} className="small">
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
        isClickToPauseDisabled={true}
      />
      <div className="container">
        <HomeSection
          index={0}
          textBig="Your place for chatting"
          textSmall="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut
              dictum sapien. Maecenas elementum enim et ullamcorper iaculis. Sed
              maximus velit et quam ullamcorper, non malesuada purus aliquam."
        />
        <HomeSection
          image={aboutUs}
          index={1}
          name="about_us"
          textBig="From passionate team to everyone of you"
          textSmall="Fusce in dolor ac ex semper rutrum et rutrum nunc. Maecenas ac
              posuere orci. Cras quis ipsum tortor. Suspendisse potenti. Proin
              viverra porttitor interdum. Pellentesque in elit dui."
        />
        <HomeSection
          image={features}
          index={2}
          name="features"
          textBig="Chat with friend or group of friends"
          textSmall="Maecenas elementum non orci id sagittis. Ut efficitur lacinia
              lorem, sed tincidunt elit egestas in. Quisque dapibus tortor mi
              nec consequat nulla purus in nulla."
        />
        <HomeSection
          image={security}
          index={3}
          name="security"
          textBig="Designed with security in mind"
          textSmall="In non sapien vitae dui pulvinar accumsan. Nam gravida, elit
              bibendum accumsan iaculis, nulla lectus convallis ex. Nullam orci
              lorem, laoreet ac sem in."
        />
        <HomeSection
          image={support}
          index={4}
          name="support"
          textBig="You can always get help from our team"
          textSmall="Cras rutrum facilisis posuere. Suspendisse facilisis mollis leo.
              Phasellus sed fermentum ante, ut fermentum lacus. In non sapien
              vitae dui pulvinar accumsan."
        />
        <HomeSection
          image={download}
          index={5}
          name="download"
          textBig="Available on every device for every user"
          textSmall="In non sapien vitae dui pulvinar accumsan. Nam gravida, elit
              bibendum accumsan iaculis, nulla lectus convallis ex. Nullam orci
              lorem, laoreet ac sem in."
        />
      </div>
      <Footer />
    </motion.div>
  );
}
