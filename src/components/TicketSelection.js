"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import SectionHeader from "./SectionHeader";

export default function TicketSelection({ currentStep, onNext }) {



  const [ticketDetails, setTicketDetails] = useState({
    type: "Free",
    quantity: 1
  });
  
  const handleNext = () => {
    localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));
    onNext();
  };

  return (
    <div className="container p-4 flex flex-col items-center justify-center">
      <div className="bg-primary border-2 border-border md:w-[700px] md:h-[858px] flex flex-col justify-center items-center rounded-3xl">
        <SectionHeader
          activeStep={currentStep}
          currentStep={1}
          title="Ticket Selection"
        />
        <section className="bg-first md:w-[604px] md:h-[682px] flex flex-col p-8 justify-center items-center border-2 border-border rounded-3xl">
          <div className="selection text-gray-100 text-center md:w-[556px] md:h-[200px] px-6 py-4 flex flex-col justify-center items-center space-y-2 border-2 border-line rounded-3xl">
            <h1 className="text-gray-100 text-2xl md:text-4xl font-extrabold font-roadrage">
              Techember Fest ”25
            </h1>
            <p className="md:hidden w-[229px] text-gray-100 flex-col text-sm md:text-base mb-8">
              <span>Join us for an unforgettable</span>{" "}
              <span>experience at [Event Name]! Secure</span>{" "}
              <span>your spot now.</span>
            </p>
            <p className="hidden md:block text-gray-100 flex-col text-base">
              Join us for an unforgettable experience at{" "}
              <span>[Event Name]! Secure your spot now.</span>
            </p>
            <p className="text-gray-100 text-base md:flex space-x-2 md:mt-0">
              <span>📍 [Event Location]</span>
              <span className="hidden md:flex">| |</span>
              <span className="hidden md:flex">March 15, 2025 | 7:00 PM</span>
            </p>
            <p className="text-gray-100 text-base md:hidden">
              March 15, 2025 | 7:00 PM
            </p>
          </div>

          <div className="bg-line h-1 w-full md:h-1 md:w-full mt-8"></div>

          <div className="ticketType text-gray-100 mt-8">
            <p className="mb-2">Select Ticket Type:</p>
            <div className="flex flex-col md:flex-row gap-6 w-[287px] h-[410px] border-2 border-line rounded-3xl p-4 md:w-[556px] md:h-[142px]">
              {/* Ticket options */}
              {["Free", "VIP", "VVIP"].map((type, index) => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  className={`flex flex-col gap-y-2 w-[255px] md:w-[158px] h-[110px] p-3 ${
                    type === "Free" ? "bg-free" : ""
                  } border-type border-2 rounded-xl`}
                >
                  <p className="font-bold">
                    {type === "Free" ? "Free" : "$150"}
                  </p>
                  <p className="text-sm">{type} ACCESS</p>
                  <p>20/52</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col">
              <label className="mb-2">Number of Tickets:</label>
              <select
                className="md:w-full h-[48px] bg-primary text-white px-2 outline-none border-2 border-line rounded-lg"
                // defaultValue="1"
                value={ticketDetails.quantity}
                onChange={(e) =>
                  setTicketDetails((prev) => ({ ...prev, quantity: e.target.value }))
                }
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="buttons flex md:flex-row flex-col gap-y-2 md:gap-y-0 md:gap-x-6 mt-8 md:w-full w-[287px]">
          <motion.button
              whileHover={{ scale: 1.05 }} className=" md:w-[266px] w-full h-[48px] text-button text-center border-2 border-button rounded-lg">
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="md:w-[266px] w-full h-[48px] text-white text-center bg-button rounded-lg"
              onClick={handleNext}
            >
              Next
            </motion.button>
          </div>

        </section>
      </div>
    </div>
  );
}
