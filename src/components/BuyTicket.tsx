import Image from "next/image";
import buyTicketImage from "@/assets/images/buy_ticket.png";
import { useEffect, useRef, useState } from "react";
import {
  drop,
  getDepositedAmount,
  getDraw,
  getIsExpired,
  getIsRefund,
  refund,
} from "@/lib/contracts/drop";
import toast from "react-hot-toast";
import { formatEther } from "viem";

import PandaImage from "@/assets/images/panda2.png";

export default function BuyTicket({ remainedUSDC }: { remainedUSDC: number }) {
  const [numTicket, setNumTicket] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [isExpired, setIsExpired] = useState();
  const [depositedAmount, setDepositedAmount] = useState<number>(0);
  const [status, setStatus] = useState();
  const [isRefunded, setIsRefunded] = useState<boolean>(false);

  useEffect(() => {
    const fetchTicketPrice = async () => {
      const draw = await getDraw();
      const ticketPrice = Number(formatEther(draw[2]));
      setTicketPrice(ticketPrice);
    };
    fetchTicketPrice();
  }, [ticketPrice]);

  useEffect(() => {
    const fetchIsExpired = async () => {
      const isExpired = await getIsExpired();
      setIsExpired(isExpired);
    };
    fetchIsExpired();
  }, [isExpired]);

  useEffect(() => {
    const fetchDepositedAmount = async () => {
      const depositedAmount = await getDepositedAmount();
      setDepositedAmount(depositedAmount);
    };
    fetchDepositedAmount();
  }, [depositedAmount]);

  useEffect(() => {
    const fetchStatus = async () => {
      const draw = await getDraw();
      const status = draw[1];
      setStatus(status);
    };
    fetchStatus();
  }, [status]);

  useEffect(() => {
    const fetchIsRefunded = async () => {
      try {
        const isRefunded = await getIsRefund();
        setIsRefunded(isRefunded);
      } catch (err: any) {
        toast.error(err.message);
      }
    };
    fetchIsRefunded();
  }, [isRefunded]);

  const decreaseNumTicket = () => {
    if (numTicket > 0) setNumTicket(numTicket - 1);
  };

  const increaseNumTicket = () => {
    if (numTicket < remainedUSDC / ticketPrice) setNumTicket(numTicket + 1);
  };

  const handleDrop = async () => {
    try {
      await drop(numTicket);
      toast.success("Transaction Successful!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleRefund = async () => {
    try {
      await refund();
      toast.success("Transaction Successful!");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div className="rounded-[20px] border-primary border-[3px] relative">
      <div className="bg-background rounded-t-[20px] pt-[30px] pb-[64px] px-[30px] lg:pb-6">
        {!isExpired && status === 1 ? (
          <Image
            src={buyTicketImage}
            alt="Buy Ticket"
            width={80}
            height={80}
            className="mx-auto"
          />
        ) : (
          <svg
            width="80"
            height="80"
            viewBox="0 0 81 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            <path
              d="M49.0406 12.1161C48.566 11.6421 47.9226 11.3759 47.2519 11.3759C46.5811 11.3759 45.9377 11.6421 45.4631 12.1161L12.1181 45.4611C11.6441 45.9358 11.3778 46.5791 11.3778 47.2499C11.3778 47.9207 11.6441 48.564 12.1181 49.0386L15.726 52.6431C17.49 51.6576 19.5276 51.2746 21.5291 51.5525C23.5306 51.8304 25.3867 52.7539 26.8156 54.1828C28.2445 55.6116 29.168 57.4678 29.4459 59.4693C29.7237 61.4708 29.3408 63.5083 28.3552 65.2724L31.9631 68.8836C32.1982 69.1189 32.4773 69.3055 32.7845 69.4328C33.0917 69.5601 33.421 69.6256 33.7535 69.6256C34.0861 69.6256 34.4154 69.5601 34.7226 69.4328C35.0298 69.3055 35.3089 69.1189 35.544 68.8836L68.8856 35.542C69.3596 35.0674 69.6259 34.4241 69.6259 33.7533C69.6259 33.0825 69.3596 32.4391 68.8856 31.9645L65.2743 28.3499C63.5103 29.3355 61.4728 29.7184 59.4712 29.4405C57.4697 29.1626 55.6136 28.2391 54.1847 26.8103C52.7559 25.3814 51.8324 23.5253 51.5545 21.5238C51.2766 19.5222 51.6595 17.4847 52.6451 15.7206L49.0406 12.1161ZM41.8856 8.53864C42.5907 7.83349 43.4279 7.27413 44.3492 6.8925C45.2705 6.51087 46.258 6.31445 47.2552 6.31445C48.2525 6.31445 49.2399 6.51087 50.1613 6.8925C51.0826 7.27413 51.9197 7.83349 52.6249 8.53864L56.577 12.4941C58.3016 14.2154 57.9945 16.6353 57.1237 18.0966C56.6451 18.9028 56.4486 19.8454 56.5653 20.7756C56.6819 21.7059 57.1052 22.5707 57.7681 23.2337C58.431 23.8966 59.2959 24.3198 60.2261 24.4365C61.1564 24.5532 62.099 24.3567 62.9051 23.878C64.3665 23.0106 66.7864 22.7001 68.5076 24.4248L72.4631 28.3836C73.1683 29.0888 73.7276 29.9259 74.1092 30.8472C74.4909 31.7686 74.6873 32.756 74.6873 33.7533C74.6873 34.7505 74.4909 35.738 74.1092 36.6593C73.7276 37.5806 73.1683 38.4178 72.4631 39.1229L39.1249 72.4611C38.4197 73.1663 37.5826 73.7257 36.6612 74.1073C35.7399 74.4889 34.7525 74.6853 33.7552 74.6853C32.758 74.6853 31.7705 74.4889 30.8492 74.1073C29.9279 73.7257 29.0907 73.1663 28.3856 72.4611L24.4301 68.509C22.7088 66.7878 23.0126 64.3645 23.8834 62.9065C24.362 62.1004 24.5585 61.1578 24.4418 60.2276C24.3251 59.2973 23.9019 58.4324 23.239 57.7695C22.576 57.1066 21.7112 56.6834 20.7809 56.5667C19.8507 56.45 18.9081 56.6465 18.102 57.1251C16.6406 57.9925 14.2207 58.2996 12.4995 56.575L8.5406 52.6195C7.83544 51.9144 7.27608 51.0772 6.89446 50.1559C6.51283 49.2346 6.31641 48.2471 6.31641 47.2499C6.31641 46.2527 6.51283 45.2652 6.89446 44.3439C7.27608 43.4226 7.83544 42.5854 8.5406 41.8803L41.8856 8.53864Z"
              fill="#27AAE1"
            />
            <rect
              x="71.6621"
              y="67.0604"
              width="5.09375"
              height="82.1098"
              transform="rotate(135 71.6621 67.0604)"
              fill="#27AAE1"
            />
          </svg>
        )}
        <h2 className="lg:text-3xl mt-1">
          {!isExpired && status === 1 && "Buy Your Tickets"}
          {!isExpired && status === 3 && "Draw Closed"}
          {isExpired && "Draw Expired"}
        </h2>
        {!isExpired && status === 1 && (
          <>
            <p className="title mt-1">1 ticket = {ticketPrice} USDC</p>
            <div className="flex gap-10 justify-center items-center mt-12 lg:mt-6">
              <button
                className="rounded-full border-[3px] text-white w-14 h-14 text-3xl cursor-pointer"
                onClick={() => decreaseNumTicket()}
                disabled={!isExpired && status === 1 ? false : true}
              >
                -
              </button>
              <h2>{numTicket}</h2>
              <button
                className="rounded-full border-[3px] text-white w-14 h-14 text-3xl cursor-pointer"
                onClick={() => increaseNumTicket()}
                disabled={!isExpired && status === 1 ? false : true}
              >
                +
              </button>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col bg-[#2E3452] py-5 px-[30px] rounded-b-[20px]">
        {!isExpired && status === 1 && (
          <>
            <p className="title">Total</p>
            <h2 className="text-center lg:text-3xl">
              {numTicket * ticketPrice} USDC
            </h2>
            <button
              className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
              onClick={handleDrop}
            >
              Enter Now
            </button>
            <p className="text mt-5">You have bonus ?</p>
          </>
        )}

        {isExpired && depositedAmount > 0 && !isRefunded && (
          <button
            className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
            onClick={handleRefund}
          >
            Withdraw USDC
          </button>
        )}

        {isExpired && depositedAmount > 0 && isRefunded && (
          <button
            className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
            disabled
          >
            Already Refunded
          </button>
        )}

        {isExpired && depositedAmount === 0 && (
          <button
            className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
            disabled
          >
            Notify me when new available
          </button>
        )}

        {!isExpired && status === 3 && (
          <button
            className="bg-primary rounded-[10px] w-2/3 text-center mx-auto py-[15px] mt-5 text-text lg:mt-2 cursor-pointer hover:bg-sky-400 ease-in transition-all"
            disabled
          >
            Notify me when new available
          </button>
        )}
      </div>
      <div
        className="group absolute top-0 right-0 translate-x-1/3 -translate-y-1/3"
        ref={elementRef}
      >
        <Image
          src={PandaImage}
          alt="Panda"
          className={`w-[200px] h-[200px] sm:w-[80px] sm:h-[80px] ${
            isInView ? "animate-skew-once" : ""
          }`}
        />
      </div>
    </div>
  );
}
