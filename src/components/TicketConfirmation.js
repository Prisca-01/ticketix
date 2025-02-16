"use client";
import { useEffect } from "react";
import SectionHeader from "./SectionHeader";
import Image from "next/image";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

export default function TicketConfirmation({
  currentStep,
  formData,
  onBookAnother,
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("formData");
    }
  }, []);

  const handleDownload = () => {
    const element = document.getElementById("ticket-container");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "techember-ticket.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="bg-primary border-2 border-border md:w-[650px] w-[335px] md:h-[1025px] flex flex-col justify-center items-center rounded-3xl">
        <SectionHeader activeStep={currentStep} currentStep={3} title="Ready" />

        <h2 className="md:text-3xl text-2xl font-bold font-alatsi  text-gray-100 text-center md:mb-7">
          Your Ticket is Booked!
        </h2>
        <p className="text-gray-100 mb-8 w-[240px] md:w-full text-center text-sm md:text-sm">
          Check your email for a copy or you can{" "}
          <span className="font-bold">download</span>
        </p>
        <section className="flex flex-col p-6 md:p-8 justify-center items-center ">
          {/* Ticket Preview */}
          <motion.div
            id="ticket-container"
            className="relative w-[500px] h-[600px] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image
              src="/bg.svg"
              width={300}
              height={600}
              alt="Ticket background"
              className="object-cover"
            />

            {/* Ticket Content */}
            <div className="absolute inset-0 p-6 text-gray-100 flex flex-col">
              <div className="border-2 border-border w-[260px] h-[446px] mx-auto flex flex-col items-center p-4 space-y-4 rounded-3xl">
                <div className="text-center space-y-1">
                  <h3 className="text-2xl font-bold font-roadrage">
                    Techember Fest &#39;25
                  </h3>
                  <p className="text-xs md:text-xs">
                    📍 04 Rumens road, Ikoyi, Lagos
                  </p>
                  <p className="text-xs md:text-xs">
                    📅 March 15, 2025 | 7:00 PM
                  </p>
                </div>

                {/* Avatar */}
                <div className="flex justify-center">
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="w-[120px] h-[120px] rounded-lg border-4 border-button"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-select/50 backdrop-blur-sm p-4 rounded-lg w-[230px]">
                  {/* Name & Email */}
                  <div className="flex justify-between items-center border-b border-line pb-2">
                    <div className="flex-1 text-left">
                      <p className="text-xs text-gray-700">Name</p>
                      <p className="text-xs font-bold">{formData.fullName}</p>
                    </div>
                    <div className="w-px h-8 bg-line mx-2" />
                    <div className="flex-1 text-left">
                      <p className="text-xs text-gray-700">Email</p>
                      <p className="text-xs font-bold truncate">
                        {formData.email}
                      </p>
                    </div>
                  </div>

                  {/* Ticket Info */}
                  <div className="flex justify-between items-center border-b border-line py-2">
                    <div className="flex-1 text-left">
                      <p className="text-xs text-gray-700">Ticket Type</p>
                      <p className="text-xs font-bold">Free</p>
                    </div>
                    <div className="w-px h-8 bg-line mx-2" />
                    <div className="flex-1 text-left">
                      <p className="text-xs text-gray-700">Ticket No</p>
                      <p className="text-xs font-bold">1</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {formData.notes && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-700">Additional Info:</p>
                      <p className="text-xs font-bold">{formData.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Barcode Section */}
              <div className="mt-auto flex flex-col items-center">
                <p className="text-xs">Scan this barcode at entrance</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="buttons flex md:flex-row flex-col gap-y-2 md:gap-x-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="md:w-[266px] w-[287px] h-[48px] text-button border-2 border-button rounded-lg"
              onClick={onBookAnother}
            >
              Book Another Ticket
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="md:w-[266px] w-[287px] h-[48px] text-white bg-button rounded-lg"
              onClick={handleDownload}
            >
              Download Ticket
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  );
}
