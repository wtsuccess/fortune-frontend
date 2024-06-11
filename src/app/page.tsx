'use client'

import HeroSection from "@/components/sections/Hero";
import TicketSection from "@/components/sections/Ticket";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <TicketSection />
    </div>
  );
}
