import Image, { StaticImageData } from "next/image";

interface IStep {
  image: StaticImageData;
  title: string;
  description: string;
}

export default function Card({ step }: { step: IStep }) {
  return (
    <div className="p-10 bg-[#1D1E2E] rounded-[20px]">
      <Image
        src={step.image}
        alt="Connect Wallet"
        width={70}
        height={70}
        className="mx-auto lg:w-14 lg:h-14"
      />
      <h3 className="text-text mt-8 lg:text-[25px]">{step.title}</h3>
      <p className="text-text title mt-3">{step.description}</p>
    </div>
  );
}
