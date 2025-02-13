"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import html2canvas from "html2canvas";

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  avatar: yup
    .string()
    .url("Invalid URL")
    .required("Avatar URL is required")
    .test("is-image", "URL must be an image", (value) => {
      return /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(value);
    }),
});

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [widget, setWidget] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("formData") || "{}")
        : {},
  });

  const formData = watch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  const onSubmit = () => setIsSubmitted(true);

  return (
    <>
      <header className="flex flex-row justify-between py-3 md:px-20">
        <h2 className="text-teal-700 font-extrabold text-2xl">Ticketix</h2>
        <div className="nav hidden md:block text-gray-500 space-x-9 font-bold text-lg">
          <Link href="#">Events</Link>
          <Link href="#">About</Link>
        </div>
        <div className="flex flex-row justify-center items-center gap-2  bg-slate-200 p-2 w-32 rounded-xl text-gray-900">
          <Link href="#" className="">
            My Tickets
          </Link>
          <FaLongArrowAltRight />
        </div>
      </header>

      {/* Ticket Selection */}

      <div className="container  p-4 flex flex-col items-center justify-center">
        <div className="bg-primary border-2 border-border md:w-[700px] md:h-[858px] flex justify-center items-center rounded-3xl">
          <section className="bg-first w-[604px] h-[682px] flex flex-col p-8 justify-center items-center border-2 border-border rounded-3xl">
            <div className="selection text-gray-100 text-center md:w-[556px] md:h-[200px] flex flex-col justify-center items-center space-y-2 border-2 border-line rounded-3xl">
              <h1 className="text-gray-100 text-4xl font-extrabold">
                Techember Fest ”25
              </h1>
              <p className="text-gray-100 flex flex-col text-base">
                Join us for an unforgettable experience at
                <span>[Event Name]! Secure your spot now.</span>
              </p>
              <p className="text-gray-100 text-base space-x-2">
                <span>📍 [Event Location]</span>
                <span>| |</span>
                <span>March 15, 2025 | 7:00 PM</span>
              </p>
            </div>
            <div className="bg-line md:h-1 md:w-full mt-8"></div>

            <div className="ticketType text-gray-100 mt-8">
              <p className="mb-2">Select Ticket Type:</p>
              <div className="flex flex-row gap-x-6 border-2 border-line rounded-3xl p-4 md:w-[556px]">
                <div className="flex flex-col gap-y-2  md:w-[158px] md:h-[110px] p-3 bg-free border-type border-2 rounded-xl">
                  <p className="font-bold">Free</p>
                  <p className="text-sm">REGULAR ACCESS</p>
                  <p>20/52</p>
                </div>

                <div className="flex flex-col gap-y-2  md:w-[158px] md:h-[110px] p-3 border-type border-2 rounded-xl">
                  <p className="font-bold">$150</p>
                  <p>VIP ACCESS</p>
                  <p>20/52</p>
                </div>

                <div className="flex flex-col gap-y-2  md:w-[158px] md:h-[110px] p-3 border-type border-2 rounded-xl">
                  <p className="font-bold">$150</p>
                  <p>VVIP ACCESS</p>
                  <p>20/52</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col bg-select">
                <label className="mb-2">Number of Tickets:</label>
                <input
                  type="number"
                  placeholder="Tickets?"
                  min={1}
                  className="md:w-full md:h-[48px] bg-primary px-3 outline-none border-2 border-line rounded-lg"
                ></input>
              </div>
            </div>

            <div className="buttons flex md:flex-row flex-col md:gap-x-6 mt-8">
              <button className="md:w-[266px] md:h-[48px] text-button text-center border-2 border-button rounded-lg">
                Cancel
              </button>
              <button className="md:w-[266px] md:h-[48px] text-white text-center bg-button rounded-lg">
                Next
              </button>
            </div>
          </section>
        </div>
      </div>
      {/* Attendee Details Section */}
      <div className="container p-4 flex flex-col items-center justify-center">
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="lazyOnload"
          onLoad={() => {
            const newWidget = window.cloudinary.createUploadWidget(
              {
                cloudName: "dwyzvuqer",
                uploadPreset: "Avatar Tickets",
              },
              (error, result) => {
                if (!error && result?.event === "success") {
                  setValue("avatar", result.info.secure_url);
                }
              }
            );
            setWidget(newWidget);
          }}
        />

        <div className="bg-primary border-2 border-border md:w-[700px] md:h-[1083px] flex justify-center items-center rounded-3xl">
          <section className="bg-first w-[604px] h-[907px] flex flex-col p-8 justify-center items-center border-2 border-border rounded-3xl">
            {/* Avatar Upload Section */}
            <div className="bg-select w-[556px] text-gray-100 mt-8 border-2 border-line rounded-lg p-4">
              <p className="mb-4 text-lg font-semibold">
                Upload Profile Photo:
              </p>
              <div className="flex flex-col items-center gap-4">
                <input
                  {...register("avatar")}
                  className="hidden"
                  aria-invalid={errors.avatar ? "true" : "false"}
                />
                <button
                  type="button"
                  onClick={() => widget?.open()}
                  className="w-full py-3 border-2 border-dashed border-line rounded-lg hover:bg-select transition-colors"
                >
                  Click to Upload Image
                </button>
                {formData.avatar && (
                  <img
                    src={formData.avatar}
                    alt="Preview"
                    className="w-[140px] h-[140px]  rounded-lg object-cover border-4 border-button"
                  />
                )}
                {errors.avatar && (
                  <p className="text-red-500 text-sm">
                    {errors.avatar.message}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-line md:h-1 md:w-full mt-8"></div>

            {/* Form Inputs */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full mt-8 space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-100 text-sm font-medium mb-2">
                    Enter your name
                  </label>
                  <input
                    {...register("fullName")}
                    className="w-full bg-primary border-2 border-line rounded-lg p-3 text-gray-100 focus:outline-none focus:border-button"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-100 text-sm font-medium mb-2">
                    Enter your email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full bg-primary border-2 border-line rounded-lg p-3 text-gray-100 focus:outline-none focus:border-button"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-100 text-sm font-medium mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    {...register("notes")}
                    className="w-full bg-primary border-2 border-line rounded-lg p-3 text-gray-100 focus:outline-none focus:border-button"
                    rows="4"
                    placeholder="Any special requirements or notes..."
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <button
                  type="button"
                  className="md:w-1/2 py-3 border-2 border-button text-button rounded-lg hover:bg-select transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="md:w-1/2 py-3 bg-button text-white rounded-lg hover:bg-button/90 transition-colors"
                >
                  Get My Free Ticket
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>

      {/* Ticket Section */}
      {isSubmitted && (
        <div className="container p-4 flex flex-col items-center justify-center">
          <div className="bg-primary border-2 border-border md:w-[700px] md:h-[858px] flex justify-center items-center rounded-3xl">
            <section className="flex flex-col p-8 justify-center items-center">
              <h2 className="text-3xl font-bold  text-gray-100 text-center">
                Your Ticket is Booked!
              </h2>
              <p className="text-gray-100 mb-8">
                Check your email for a copy or you can download
              </p>

              {/* Ticket Container with background image */}
              <div
                className="relative w-[500px] h-[600px]  flex items-center justify-center"
                id="ticket-container"
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
                  {/* Top Section */}
                  <div className="mb-6 text-center space-y-1">
                    <h3 className="text-2xl font-bold">
                      Techember Fest &#39;25
                    </h3>
                    <p className="text-sm">📍 04 Rumens road, Ikoyi, Lagos</p>
                    <p className="text-sm">📅 March 15, 2025 | 7:00 PM</p>
                  </div>

                  {/* Avatar */}
                  <div className="mb-6 flex justify-center">
                    <img
                      src={formData.avatar}
                      alt="Avatar"
                      className="w-[140px] h-[140px] rounded-lg border-4 border-button"
                    />
                  </div>

                  {/* Info Box */}
                  <div className="absolute left-[135px] top-72 bg-select/50 backdrop-blur-sm p-4 rounded-lg mb-6 w-[232px] h-[160px]">
                    {/* Name & Email */}
                    <div className="flex justify-between items-center border-b border-line">
                      <div>
                        <p className="text-xs">Name</p>
                        <p className="text-xs font-bold">{formData.fullName}</p>
                      </div>
                      <div className="w-px h-8 bg-line" />
                      <div>
                        <p>Email</p>
                        <p className="text-xs font-bold">{formData.email}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center  border-b border-line">
                      <div>
                        <p className="text-xs">Ticket type</p>
                        <p className="text-xs font-bold">VIP</p>
                      </div>
                      <div className="w-px h-8 bg-line" />
                      <div>
                        <p>Ticket no</p>
                        <p className="text-xs font-bold">1</p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    {formData.notes && (
                      <div>
                        <p className="font-bold mb-2">Additional Info:</p>
                        <p className="text-sm">{formData.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Barcode Section */}
                  <div className="mt-auto flex flex-col items-center">
                    {/* <Image
                src="/barcode.svg"
                width={200}
                height={80}
                alt="Barcode"
                className="mb-2"
              /> */}
                    <p className="text-xs">Scan this barcode at entrance</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="buttons flex md:flex-row flex-col md:gap-x-6 mt-8">
                <button
                  className="md:w-[266px] md:h-[48px] text-button text-center border-2 border-button rounded-lg hover:bg-select transition-colors"
                  onClick={() => setIsSubmitted(false)}
                >
                  Book Another Ticket
                </button>
                <button
                  className="md:w-[266px] md:h-[48px] text-white text-center bg-button rounded-lg hover:bg-button/90 transition-colors"
                  onClick={() => {
                    // Implement download functionality
                    const ticketElement =
                      document.getElementById("ticket-container");
                    html2canvas(ticketElement).then((canvas) => {
                      const link = document.createElement("a");
                      link.download = "techember-ticket.png";
                      link.href = canvas.toDataURL();
                      link.click();
                    });
                  }}
                >
                  Download Ticket
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
