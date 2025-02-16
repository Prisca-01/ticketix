"use client";

import { useState, useEffect } from "react";
import TicketSelection from "@/components/TicketSelection";
import AttendeeDetails from "@/components/AttendeeDetails";
import TicketConfirmation from "@/components/TicketConfirmation";
import Link from "next/link";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";

const INITIAL_DATA = {
  ticketType: "Free",
  quantity: 1,
  fullName: "",
  email: "",
  avatar: "",
  notes: "",
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("formData");
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    }
    return INITIAL_DATA;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setCurrentStep(3);
  };

  return (
    <>
      <header className="flex flex-row justify-between items-center py-3 px-6 md:px-20 font-header">
        <Image src="/logo.svg" width={100} height={100} alt="Ticketix" />
        <div className="nav hidden md:block text-gray-500 space-x-9 font-bold text-lg">
          <Link href="#">Events</Link>
          <Link href="#">About Project</Link>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 bg-slate-200 p-2 w-[169px] rounded-xl text-gray-900">
          <Link href="#" className="text-base">
            MY TICKETS
          </Link>
          <FaLongArrowAltRight />
        </div>
      </header>

      {currentStep === 1 && (
        <TicketSelection
          currentStep={currentStep}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <AttendeeDetails
          formData={formData}
          currentStep={currentStep}
          onBack={() => setCurrentStep(1)}
          onSubmitForm={handleFormSubmit}
        />
      )}

      {currentStep === 3 && (
        <TicketConfirmation
          currentStep={currentStep}
          formData={formData}
          onBookAnother={() => setCurrentStep(1)}
        />
      )}
    </>
  );
}
