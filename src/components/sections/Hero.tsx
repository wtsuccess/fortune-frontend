import cx from "classnames";

import MetamaskImage from "@/assets/images/metamask.png";
import polarLogo from "@/assets/images/polar.png";
import Image from "next/image";
import { openSans } from "@/app/fonts";
import { useAccount } from "wagmi";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { shortenAddress } from "@/lib/utils";

export default function HeroSection() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const scrollToTickets = () => {
    const ticketsSection = document.getElementById("tickets");
    if (ticketsSection) {
      ticketsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-[708px] relative flex items-center justify-center overflow-hidden bg-[url('/assets/images/hero_background.jpg')] sm:bg-[20%] bg-cover bg-center">
      <div className="flex absolute top-5 w-full justify-between items-center">
        <div>
          <nav className="flex items-center p-4 mt-2 text-white text-base text-lg text-xl text-center">
            <div className="flex items-center z-10">
              <Image className="w-20 h-auto" src={polarLogo} alt="Polar Logo" />
              <p className="mt-2 text-lg text-xl text-center md:hidden block ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="117"
                  height="29"
                  viewBox="0 0 117 29"
                  fill="none"
                >
                  <path
                    d="M19.8836 10.8702C19.8836 15.7853 15.86 19.7397 10.6719 19.7397H6.72307V27.8689H0.707031V1.99658H10.6761C15.86 1.99658 19.8836 5.95098 19.8836 10.8702ZM13.8676 10.8702C13.8676 8.9855 12.5134 7.54445 10.6719 7.54445H6.72307V14.1959H10.6719C12.5134 14.1918 13.8676 12.7508 13.8676 10.8702Z"
                    fill="#ECECEC"
                  />
                  <path
                    d="M20.6367 18.6269C20.6367 13.1198 25.0674 8.87012 30.6058 8.87012C36.1441 8.87012 40.5748 13.1198 40.5748 18.6269C40.5748 24.1339 36.1441 28.3836 30.6058 28.3836C25.0674 28.3836 20.6367 24.1325 20.6367 18.6269ZM34.9257 18.6269C34.9257 16.0033 33.0454 14.2724 30.6002 14.2724C28.155 14.2724 26.2762 16.0101 26.2762 18.6269C26.2762 21.2436 28.1564 22.9813 30.6002 22.9813C33.044 22.9813 34.9257 21.2504 34.9257 18.6269Z"
                    fill="#ECECEC"
                  />
                  <path
                    d="M43.7617 0.887451H49.4025V27.8648H43.7617V0.887451Z"
                    fill="#ECECEC"
                  />
                  <path
                    d="M72.8279 9.38721V27.8651H67.1871V26.1288C65.9409 27.5331 64.1036 28.3836 61.585 28.3836C56.6587 28.3836 52.5977 24.1325 52.5977 18.6269C52.5977 13.1212 56.6587 8.87012 61.585 8.87012C64.1036 8.87012 65.9465 9.7206 67.1871 11.1249V9.38721H72.8279ZM67.1871 18.6269C67.1871 15.855 65.3082 14.1186 62.7135 14.1186C60.1187 14.1186 58.2385 15.855 58.2385 18.6269C58.2385 21.3987 60.1187 23.1351 62.7135 23.1351C65.3082 23.1351 67.1871 21.3987 67.1871 18.6269Z"
                    fill="#ECECEC"
                  />
                  <path
                    d="M88.2451 9.01855V15.3012C85.9134 14.9311 82.6043 15.8551 82.6043 19.5196V27.8707H76.9648V9.38732H82.6043V12.6763C83.3506 10.2011 85.8761 9.01855 88.2451 9.01855Z"
                    fill="#ECECEC"
                  />
                  <path
                    d="M109.867 4.43461C109.867 3.77713 110.065 3.13441 110.437 2.58764C110.809 2.04088 111.337 1.61461 111.955 1.36269C112.572 1.11078 113.253 1.04452 113.909 1.1723C114.565 1.30007 115.168 1.61614 115.641 2.08057C116.115 2.545 116.438 3.13695 116.569 3.78163C116.701 4.42631 116.635 5.09479 116.379 5.7026C116.124 6.31042 115.692 6.83029 115.136 7.19654C114.581 7.5628 113.927 7.75899 113.258 7.76033C112.362 7.75324 111.505 7.4008 110.871 6.77882C110.237 6.15685 109.876 5.31506 109.867 4.43461ZM110.431 9.38646H116.072V27.8644H110.431V9.38646Z"
                    fill="#ECECEC"
                  />
                  <path
                    d="M97.0824 7.68733V12.6759H106.859V18.368H97.0824V27.8649H91.0664V1.99658H107.047V7.68733H97.0824Z"
                    fill="#ECECEC"
                  />
                </svg>
              </p>
            </div>
          </nav>
        </div>
       
          <button
            className="h-[70px] px-14 py-4 md:py-2 md:px-8 mr-8 bg-white rounded-full hover:scale-105 hover:bg-sky-500 ease-in duration-300 sm:text-base md:text-lg text-xl flex items-center gap-2"
            onClick={() => {
              open();
            }}
          >
            {!isConnected && (
              <Image
                src={MetamaskImage}
                alt="Metamask"
                width={32}
                height={32}
              />
            )}
            <span className="text-black text-base font-medium">
              {isConnected && address
                ? shortenAddress(address)
                : "Connect Wallet"}
            </span>
          </button>
  
      </div>
      <div className="container">
        <div className="max-w-[690px] mx-auto">
          <h4 className="text-primary">PolarFi Fortune</h4>
          <h1 className="text-text lg:text-[35px] lg:mb-2">Get the Jackpot</h1>
          <p className={cx("text text-text", openSans.className)}>
            Welcome to the PolarFi Fortune where dreams come true and the
            possibilities are endless. Buy tickets to participate in our global
            prize pool which is growing every moment!
          </p>
          <p className={cx("text mt-1 text-text", openSans.className)}>
            The more tickets you acquire, the greater your chances of winning
            the prize pool. Don&apos;t wait any longer, turn your luck into a
            fabulous victory !
          </p>
          <button
            className="rounded-full h-[54px] w-[196px] font-semibold text-text bg-blue block mx-auto mt-6 hover:bg-sky-400 ease-in transition-all"
            onClick={scrollToTickets}
          >
            Buy ticket
          </button>
        </div>
      </div>
    </div>
  );
}
