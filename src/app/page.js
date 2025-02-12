import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Home() {
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
      <div className="container p-4 flex flex-col items-center justify-center">
        {/* Ticket Selection */}
        <section className="bg-teal-900 flex flex-col p-8 w-[700px] justify-center items-center">
          <div className="bg-red-950 px-20 text-center">
            <h1 className="text-gray-100 text-4xl font-extrabold">
              Techember Fest ”25
            </h1>
            <p className="text-gray-100">
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now.
            </p>
            <p className="text-gray-100">
              <span>📍 [Event Location]</span>
              <span>| |</span>
              <span>March 15, 2025 | 7:00 PM</span>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
