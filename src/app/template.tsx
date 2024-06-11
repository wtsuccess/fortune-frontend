"use client";

import Footer from "@/components/layouts/Footer";
import { PropsWithChildren, useState } from "react";
import BubbleImage from "@/assets/images/bubble.png";
import PandaIcon from "@/assets/images/panda-icon.png";
import Image from "next/image";
import React from "react";
import cx from "classnames";

export default function RootTemplate({ children }: PropsWithChildren) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      {children}
      <Footer />
      <div onClick={() => setShow(true)} className="group">
        <Image
          src={PandaIcon}
          alt="PandaIcon"
          width={85}
          height={85}
          className="fixed bottom-4 left-4 cursor-pointer z-10"
        />
        <div className="cursor-pointer flex items-center justify-center fixed bottom-4 left-6 group-hover:opacity-100 group-hover:-translate-y-28 opacity-0 transition-all duration-500 ease-in-out z-20">
          <div className="relative">
            <Image
              src={BubbleImage}
              alt="BubbleImage"
              width={64}
              height={64}
              className="cursor-pointer z-30"
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              Swap
            </span>
          </div>
        </div>
      </div>
      <div
        className={cx(
          "fixed h-screen w-screen z-50 flex bottom-0 left-0 items-center justify-center transition-all ease-in-out duration-300 bg-black/20",
          show
            ? "pointer-events-auto opacity-100 h-screen w-screen scale-100"
            : "pointer-events-none opacity-0 h-0 w-0 scale-0"
        )}
      >
        <iframe
          title="PolarFi Fortune Widget"
          src="https://swapspace.co/widget/4c494778f45d93c66ad9431e"
          width="404px"
          height="536px"
          style={{
            zIndex: 10,
            width: "404px",
            height: "536px",
            borderRadius: "20px",
          }}
        />
        <div className="absolute inset-0" onClick={() => setShow(false)}></div>
      </div>
    </div>
  );
}
