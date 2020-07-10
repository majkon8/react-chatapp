import React from "react";
import "./HomeSection.scss";

interface IProps {
  image?: string;
  index: number;
  name?: string;
  textBig: string;
  textSmall: string;
}

export default function HomeSection({
  image,
  index,
  name,
  textBig,
  textSmall,
}: IProps) {
  return (
    <section
      id={name}
      className={
        "home-section" +
        (index === 0 ? " mobile-welcome-message" : "") +
        (index === 2 || index === 4 ? " wrap-reverse" : "")
      }
    >
      {index !== 0 && index % 2 !== 0 && (
        <div className="section-image section-image-left">
          <img src={image} alt={name} />
        </div>
      )}
      <div className="section-text">
        <div className="section-text-big">{textBig}</div>
        <div className="section-text-small">{textSmall}</div>
      </div>
      {index !== 0 && index % 2 === 0 && (
        <div className="section-image section-image-right">
          <img src={image} alt={name} />
        </div>
      )}
    </section>
  );
}
