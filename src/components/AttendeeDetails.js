"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Script from "next/script";
import SectionHeader from "./SectionHeader";
import { motion } from "framer-motion";

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

export default function AttendeeDetails({
  currentStep,
  formData = {},
  onBack,
  onSubmitForm,
}) {
  const [widget, setWidget] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData || {},
  });

  useEffect(() => {
    const savedData = localStorage.getItem("attendeeDetails");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      reset(parsedData);
    }
  }, [reset]);

  useEffect(() => {
    if (Object.keys(formData).length) {
      reset(formData);
      localStorage.setItem("attendeeDetails", JSON.stringify(formData));
    }
  }, [formData, reset]);

  const onSubmit = (data) => {
    localStorage.setItem("attendeeDetails", JSON.stringify(data)); // Save to localStorage
    onSubmitForm(data); 
  };

  return (
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

      <div className="bg-primary border-2 border-border md:w-[700px] md:h-[1000px] flex flex-col justify-center items-center rounded-3xl">
        <SectionHeader
          activeStep={currentStep}
          currentStep={2}
          title="Attendee Details"
        />
        <section className="bg-first w-[335px] md:w-[604px] flex flex-col p-6 md:p-8 justify-center items-center border-2 border-border rounded-3xl">
          {/* Avatar Upload Section */}
          <div className="bg-select md:w-[556px] text-gray-100 mt-8 border-2 border-line rounded-lg p-4">
            <p className="mb-4 text-lg font-semibold">Upload Profile Photo:</p>
            <div className="flex flex-col items-center gap-4">
              <input {...register("avatar")} className="hidden" />
              <button
                type="button"
                onClick={() => widget?.open()}
                className="w-full py-3 border-2 border-dashed border-line rounded-lg hover:bg-select transition-colors"
              >
                Click to Upload Image
              </button>
              {watch("avatar") && (
                <img
                  src={watch("avatar")}
                  alt="Preview"
                  className="w-[140px] h-[140px] rounded-lg object-cover border-4 border-button"
                />
              )}
              {errors.avatar && (
                <p className="text-red-500 text-sm">{errors.avatar.message}</p>
              )}
            </div>
          </div>

          <div className="bg-line md:h-1 md:w-full mt-8"></div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-8 space-y-6">
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
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
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
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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

            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="button"
                className="md:w-1/2 py-3 border-2 border-button text-button rounded-lg"
                onClick={onBack}
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="md:w-1/2 py-3 bg-button text-white rounded-lg"
              >
                Get My Free Ticket
              </motion.button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
