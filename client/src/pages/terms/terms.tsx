import React, { useState } from "react";
import "./terms.scss";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import SideNav from "../../components/SideNav/SideNav";
import Footer from "../../components/Footer/Footer";

export default function Terms() {
  const [isSideOpen, setIsSideOpen] = useState(false);
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

  const toggleOpen = () => setIsSideOpen(!isSideOpen);

  return (
    <motion.div
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
        <div className="terms-container">
          <h1 className="title main-title">ChatApp terms of service</h1>
          <p className="update-info">Last updated: July 12, 2020</p>
          <h1 className="title">Nulla facilisi</h1>
          <p className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            imperdiet tempus dolor, eget suscipit tellus tempor vitae. Quisque
            pulvinar purus sit amet justo aliquam, eu condimentum enim
            vestibulum. Ut porttitor eros at quam varius facilisis. Sed iaculis,
            magna ullamcorper laoreet condimentum, sem leo porttitor leo, id
            vulputate tellus nisl ac neque. Cras vitae finibus ipsum. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Nulla gravida malesuada nunc a sollicitudin.
            Suspendisse potenti. Donec finibus feugiat tortor. Praesent a lectus
            eu sem mattis cursus nec nec metus. Praesent nec vestibulum erat.
            Maecenas elementum orci et nibh sollicitudin varius sit amet sit
            amet est. Curabitur augue magna, sollicitudin ac ante sed, posuere
            blandit metus. In lectus dui, auctor nec congue ac, condimentum sed
            nibh. Phasellus ac erat auctor, tincidunt leo in, facilisis diam.
          </p>
          <h1 className="title">Nam eu commodo nibh</h1>
          <p className="content">
            Proin sed ex sit amet ipsum aliquam lacinia. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Aliquam efficitur tristique vulputate. Quisque pharetra hendrerit
            tristique. Phasellus a lorem vitae risus consectetur blandit sed
            placerat mi. Nullam libero libero, rutrum vel finibus sit amet,
            laoreet id tellus. Nullam quis est pretium, iaculis nisi non, auctor
            sem. Maecenas ullamcorper est volutpat imperdiet eleifend. Donec a
            tortor non enim cursus tincidunt in vitae sapien. In hac habitasse
            platea dictumst. Cras tempor ligula sit amet pretium finibus. Duis
            ac ligula eget eros iaculis placerat. Sed et ultrices neque. Donec
            purus ex, condimentum eu lorem eget, condimentum dictum libero. Nam
            eu augue eros.
          </p>
          <h1 className="title">Pellentesque a ante</h1>
          <p className="content">
            Curabitur ut sapien lectus. Maecenas vehicula id lectus a iaculis.
            Nulla quis placerat magna. Praesent varius, nisi non tempor finibus,
            urna nisl molestie mauris, eget ornare libero ipsum ut mauris. Ut id
            velit ut velit consectetur placerat. Aenean finibus massa in nunc
            tempus cursus. Aenean cursus viverra iaculis. Sed posuere nunc urna,
            at posuere ex convallis non. Sed eu eros nec justo bibendum rutrum.
            Vivamus sit amet lorem fermentum, venenatis enim ac, varius arcu.
            Nam ultricies varius turpis, quis molestie libero tempor sed.
            Curabitur quis pharetra ligula.F
          </p>
          <h1 className="title">Morbi nec molestie ex</h1>
          <p className="content">
            Suspendisse tristique, leo eu aliquet laoreet, ex magna pulvinar
            enim, ut consectetur eros erat quis mauris. Praesent accumsan rutrum
            lectus at varius. Aliquam magna nisi, dapibus at porttitor eget,
            venenatis non leo. Aliquam laoreet risus orci, quis aliquet mauris
            vestibulum sit amet. Duis magna neque, fringilla eu ipsum quis,
            sodales imperdiet mauris. Nunc in blandit odio. Fusce a erat sed
            ipsum tincidunt accumsan. Praesent eget nisi fermentum, ornare massa
            ut, euismod velit. Pellentesque vel malesuada quam, a finibus
            tortor. Fusce dictum diam at eros eleifend, eget fermentum ligula
            vestibulum. Curabitur consequat lacinia nunc eu pulvinar. Praesent
            ultrices felis nisi, ultrices hendrerit dui commodo interdum.
          </p>
          <h1 className="title">Ut feugiat at lorem et congue</h1>
          <p className="content">
            Suspendisse rhoncus facilisis nibh, consequat euismod justo pretium
            non. Nulla fringilla quam ac ultrices imperdiet. Maecenas molestie
            nisl vel est imperdiet, semper elementum lacus molestie. Maecenas ac
            nisl eget justo sagittis faucibus vitae eu neque. Cras non massa
            lacus. Fusce quis pulvinar lorem. Integer at odio felis. Cras
            pulvinar odio ut suscipit sollicitudin. Curabitur a vehicula odio,
            auctor fermentum turpis. Sed aliquet vitae justo id fringilla. Donec
            eleifend pellentesque dui, non porta tortor posuere at. Morbi varius
            porttitor massa, eget commodo libero tristique a. Quisque metus
            felis, blandit eget sapien id, finibus blandit erat.
          </p>
          <h1 className="title">Sed interdum</h1>
          <p className="content">
            Mauris tincidunt accumsan dui, quis malesuada diam egestas ut.
            Vestibulum non accumsan justo, quis dignissim est. Vestibulum dictum
            lacus a aliquam bibendum. Donec ullamcorper felis at lacus
            hendrerit, sed varius ante pretium. Sed quis velit nunc. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Pellentesque orci
            est, lacinia sed congue eget, tempor id sem. Aenean dignissim ornare
            eleifend. Nunc condimentum vehicula gravida.
          </p>
          <h1 className="title">Aenean nec enim justo</h1>
          <p className="content">
            Pellentesque at facilisis quam. Donec sem mauris, sodales nec risus
            hendrerit, vehicula molestie sem. Duis efficitur diam id justo
            finibus dignissim. Curabitur placerat magna nec felis faucibus
            vulputate. Nulla facilisi. Sed aliquam enim vel lacus auctor
            maximus. Aenean vehicula pulvinar maximus. Duis eros leo, ornare
            eget justo scelerisque, dignissim sodales orci. Donec ac tincidunt
            eros, in tempus quam. Donec euismod at turpis ac dictum. Quisque
            justo magna, tincidunt ac velit in, efficitur faucibus nunc. Sed nec
            lacus ac ante pulvinar tincidunt sit amet ut nunc. Mauris nisl
            justo, mattis pretium ullamcorper in, varius nec tortor. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos.
          </p>
          <h1 className="title">Sed interdum, eros eget tincidunt</h1>
          <p className="content">
            Cras laoreet ut lacus at blandit. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Vestibulum volutpat, tortor vel
            hendrerit eleifend, ante magna feugiat purus, laoreet porttitor
            purus tellus eu eros. Donec eu odio massa. Integer ut posuere urna.
            Duis at turpis facilisis ipsum ornare egestas ac at libero. Etiam
            dolor justo, molestie quis diam eu, auctor feugiat felis. Nullam
            malesuada velit et venenatis auctor. Donec ullamcorper augue sed
            ipsum eleifend, a scelerisque diam rutrum. Aenean ut leo vel tortor
            pretium molestie. Donec viverra faucibus turpis, eget ultricies eros
            vehicula vel. Suspendisse potenti.
          </p>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
