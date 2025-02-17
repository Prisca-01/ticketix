"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);
  }, []);

  const handleDownload = (id) => {
    const element = document.getElementById(`ticket-container-${id}`);
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = `techember-ticket-${id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="container flex flex-col items-center justify-center">
      <h1 className="text-3xl text-gray-100 font-bold mt-20 mb-8">
        My Tickets
      </h1>

      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <section
              key={index}
              className="flex flex-col p-6 md:p-8 justify-center items-center "
            >
              <motion.div
                id={`ticket-container-${index}`}
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
                    <div className="flex justify-center">
                      <img
                        src={ticket.avatar}
                        alt="Avatar"
                        className="w-[120px] h-[120px] rounded-lg border-4 border-button"
                      />
                    </div>
                    <div className="bg-select/50 backdrop-blur-sm p-4 rounded-lg w-[230px]">
                      <div className="flex justify-between items-center border-b border-line pb-2">
                        <div className="flex-1 text-left">
                          <p className="text-xs text-gray-700">Name</p>
                          <p className="text-xs font-bold">{ticket.fullName}</p>
                        </div>
                        <div className="w-px h-8 bg-line mx-2" />
                        <div className="flex-1 text-left">
                          <p className="text-xs text-gray-700">Email</p>
                          <p className="text-xs font-bold truncate">
                            {ticket.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-line py-2">
                        <div className="flex-1 text-left">
                          <p className="text-xs text-gray-700">Ticket Type</p>
                          <p className="text-xs font-bold">Free</p>
                        </div>
                        <div className="w-px h-8 bg-line mx-2" />
                        <div className="flex-1 text-left">
                          <p className="text-xs text-gray-700">Ticket No</p>
                          <p className="text-xs font-bold">{index + 1}</p>
                        </div>
                      </div>
                      {ticket.notes && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-700">
                            Additional Info:
                          </p>
                          <p className="text-xs font-bold">{ticket.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-auto flex flex-col items-center">
                    <p className="text-xs">Scan this barcode at entrance</p>
                  </div>
                </div>
              </motion.div>

              <div className="buttons flex md:flex-row flex-col gap-y-2 md:gap-x-6 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="md:w-[266px] w-[287px] h-[48px] text-white bg-button rounded-lg"
                  onClick={() => handleDownload(index)}
                >
                  Download Ticket
                </motion.button>
              </div>
            </section>
          ))}
        </div>
      )}

      <div className="flex md:flex-row flex-col justify-center items-center gap-4 mt-6">
        <Link
          href="/"
          className="md:w-[266px] w-[287px] h-[48px] flex items-center justify-center text-white text-center bg-button rounded-lg"
        >
          Back to Home
        </Link>
        <button
          className="bg-red-600 md:w-[266px] w-[287px] h-[48px] text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("tickets");
            setTickets([]);
          }}
        >
          Clear All Tickets
        </button>
      </div>
    </div>
  );
}
