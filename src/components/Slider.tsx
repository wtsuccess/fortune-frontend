import React from "react";

import LogoImage from "@/assets/images/logo.png";
import Image from "next/image";

type Props = {
  progress: number;
};

const Slider = ({ progress }: Props) => {
  return (
    <div className="w-full h-5 rounded-[4px] relative bg-white">
      <div
        className="bg-primary h-full rounded-[4px]"
        style={{ width: `${progress}%` }}
      ></div>
      <div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8"
        style={{ left: `${progress}%` }}
      >
        <Image src={LogoImage} alt="logo" className="w-8 h-8 absolute" />
      </div>
    </div>
  );
};

export default Slider;
