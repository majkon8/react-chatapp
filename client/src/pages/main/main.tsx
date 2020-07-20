import React, { useRef } from "react";
import "./main.scss";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../home/home";

export default function Home() {
  let wrapper = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={wrapper}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        overflowX: "hidden",
      }}
    ></motion.div>
  );
}
