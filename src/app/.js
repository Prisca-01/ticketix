"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Script from "next/script";
// import Image from 'next/image';

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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
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

      {!isSubmitted ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          {/* Full Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("fullName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              aria-invalid={errors.fullName ? "true" : "false"}
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Avatar Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <input
              {...register("avatar")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              aria-invalid={errors.avatar ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => widget?.open()}
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Upload Image
            </button>
            {errors.avatar && (
              <p className="mt-2 text-sm text-red-600">
                {errors.avatar.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Generate Ticket
          </button>
        </form>
      ) : (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Conference Ticket</h2>
          <div className="space-y-4">
            <p className="text-lg">
              <span className="font-semibold">Name:</span> {formData.fullName}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Email:</span> {formData.email}
            </p>
            <img
              src={formData.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
