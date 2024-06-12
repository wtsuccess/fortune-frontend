"use client";

import connectWalletImage from "@/assets/images/connect_wallet.png";
import buyTicketImage from "@/assets/images/buy_ticket.png";
import drawImage from "@/assets/images/draw.png";
import Card from "@/components/Card";
import BuyTicket from "../BuyTicket";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import GradientImage from "@/assets/images/bg_gradient.png";
import { getDistributionRate, getDraw } from "@/lib/contracts/drop";
import { formatUnits } from "viem";
import { calculateCompletionPercentage } from "@/lib/utils";

const steps: { image: StaticImageData; title: string; description: string }[] =
  [
    {
      image: connectWalletImage,
      title: "1.Connect Wallet",
      description: "Connect easily with your wallet (Metamask etc...)",
    },
    {
      image: buyTicketImage,
      title: "2.Buy tickets",
      description:
        "Buy as many tickets as you want, increase your chances of winning!",
    },
    {
      image: drawImage,
      title: "3.Wait for the draw",
      description: "Try to win the jackpot of 20.000AVAX !",
    },
  ];

export default function TicketSection() {
  const [progress, setProgress] = useState<number>(0);
  const [hardcap, setHardcap] = useState<number>(0);
  const [softcap, setSoftcap] = useState<number>(0);
  const [totalDistributionRate, setTotalDistributionRate] = useState<number>(0);
  const [depositedAmountForDraw, setDepositedAmountForDraw] =
    useState<number>(0);

  useEffect(() => {
    const fetchDraw: any = async () => {
      const draw = await getDraw();

      const hardcap = Number(formatUnits(draw[8], 6));
      const softcap = Number(formatUnits(draw[9], 6));
      const depositedAmountForDraw = Number(formatUnits(draw[3], 6));

      setHardcap(hardcap);
      setSoftcap(softcap);
      setDepositedAmountForDraw(depositedAmountForDraw);
    };

    const fetchDistributionRate = async () => {
      const distributionRate = await getDistributionRate();
      const totalDistributionRate = distributionRate.reduce(
        (total: any, num: any) => {
          return total + num;
        }
      );
      setTotalDistributionRate(Number(totalDistributionRate));
    };

    fetchDraw();
    fetchDistributionRate();
  }, []);

  useEffect(() => {
    const completionPercentage = calculateCompletionPercentage(
      depositedAmountForDraw,
      hardcap
    );
    setProgress(completionPercentage);
  }, [depositedAmountForDraw, hardcap]);

  return (
    <div className="py-[116px] lg:pt-0 relative">
      <div className="relative z-10 container">
        <div className="grid grid-cols-3 max-w-[1250px] w-full mx-auto justify-center gap-24 md:grid-cols-1 lg:gap-10 md:gap-5">
          {steps.map((step, i) => (
            <Card step={step} key={i} />
          ))}
        </div>
        <div id="tickets" className="max-w-[874px] mt-[116px] mx-auto">
          <h5 className="font-bold text-[40px] leading-normal text-center lg:text-3xl">
            {depositedAmountForDraw < softcap ? (
              "PolarFi Fortune"
            ) : (
              <>
                Only
                <span className="text-primary">
                  {hardcap - depositedAmountForDraw > 0
                    ? hardcap - depositedAmountForDraw
                    : 0}
                </span>
                to go
              </>
            )}
          </h5>
          <h6 className="lg:text-[15px]">
            Now&apos;s your chance to win{" "}
            {(hardcap * totalDistributionRate) / 10000} USDC
          </h6>
          <div className="relative pt-4 mt-[35px]">
            <h4 className="absolute -bottom-10 left-0">0</h4>
            <h4 className="absolute -bottom-10 right-0">{hardcap}</h4>
            <h4
              className="absolute bottom-4 -translate-x-1/2"
              style={{ left: `${progress}%` }}
            >
              {progress} %
            </h4>
            <Slider
              className="mySlider"
              disabled
              value={(progress * hardcap) / 100}
              // onChange={(e) => setProgress(e as number)}
              min={0}
              max={hardcap}
            />
            {/* <Slider progress={30} /> */}
          </div>
        </div>
        <div className="max-w-[706px] mt-20 mx-auto">
          <BuyTicket remainedUSDC={hardcap - depositedAmountForDraw} />
        </div>
      </div>
      <Image
        src={GradientImage}
        alt="Gradient"
        className="w-screen absolute bottom-0"
      />
    </div>
  );
}
