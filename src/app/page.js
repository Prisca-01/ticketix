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

      {/* Attendee Details */}
      <div className="container  p-4 flex flex-col items-center justify-center">
        <div className="bg-primary border-2 border-border md:w-[700px] md:h-[858px] flex justify-center items-center rounded-3xl">
          <section className="bg-first w-[604px] h-[682px] flex flex-col p-8 justify-center items-center border-2 border-border rounded-3xl">
            





            <div className="buttons flex md:flex-row flex-col md:gap-x-6 mt-8">
              <button className="md:w-[266px] md:h-[48px] text-center border-2 border-button text-button rounded-lg">
                Back
              </button>
              <button className="md:w-[266px] md:h-[48px] text-white text-center bg-button rounded-lg">
                Get My Free Ticket
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
