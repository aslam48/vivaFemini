import React, { useState } from "react";
import FirstImg from "../assets/firstImg.png"
import Start from "../assets/foward.png"

const CycleCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(14);
  const currentMonth = "October 2025";
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const calendarDays = [
    { day: null },
    { day: null },
    { day: null },
    { day: 1 },
    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25 },
    { day: 26 },
    { day: 27 },
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { day: 31 },
  ];

  const periodDays = [17, 18];
  const fertileDays = [26, 27, 28, 29];
  const today = 14;

  const getButtonStyle = (day: number | null) => {
    if (!day) return "invisible";

    const baseStyle =
      "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-semibold transition-all cursor-pointer text-sm sm:text-base";

    if (day === today) {
      return `${baseStyle} bg-white text-pink-500 ring-2 sm:ring-4 ring-pink-300`;
    }

    if (periodDays.includes(day)) {
      return `${baseStyle} bg-pink-500`;
    }

    if (fertileDays.includes(day)) {
      return `${baseStyle} bg-blue-600`;
    }

    if (day === selectedDate) {
      return `${baseStyle} bg-pink-400 ring-2 ring-white`;
    }

    return `${baseStyle} border-2 border-pink-300 hover:border-pink-400`;
  };

  return (
    <div className="w-full lg:w-1/2">
    <div className=" rounded-2xl bg-linear-to-br from-pink-500 via-pink-500 to-rose-400 p-4 sm:p-6 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-pink-100 text-xs sm:text-sm mb-2">Today, October 14</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-white text-xl sm:text-2xl font-bold">
              {currentMonth}
            </span>
            <span className="text-white text-lg sm:text-xl">▲</span>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center text-pink-100 text-[10px] sm:text-xs font-semibold"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6 sm:mb-8">
          {calendarDays.map((item, index) => (
            <div
              key={index}
              className={getButtonStyle(item.day)}
              onClick={() => item.day && setSelectedDate(item.day)}
            >
              {item.day}
            </div>
          ))}
        </div>

        {/* Info card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl">
          <p className="text-gray-500 text-xs sm:text-sm text-center mb-3 sm:mb-4">
            Today is Cycle Day
          </p>

          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-pink-500 text-white text-4xl sm:text-5xl font-bold rounded-2xl sm:rounded-3xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shadow-lg">
              21
            </div>
          </div>

          <div className="text-center mb-3 sm:mb-4">
            <p className="text-gray-600 text-xs sm:text-sm">
              <span className="font-semibold">Avg. Cycle: 28 Days</span>
              <span className="mx-2">•</span>
              <span className="hidden sm:inline">Currently: 78% of 100</span>
              <span className="sm:hidden">78% of 100</span>
            </p>
          </div>

          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="border-2 border-pink-200 rounded-full px-4 sm:px-6 py-2">
              <span className="text-gray-500 text-xs sm:text-sm">Next Period: </span>
              <span className="text-pink-500 font-semibold text-xs sm:text-sm">
                Nov 12 (17 Days)
              </span>
            </div>
          </div>

          <p className="text-gray-400 text-[10px] sm:text-xs text-center">
            Fertile window starts
            <span className="font-semibold text-gray-600">Nov 3</span>
          </p>
        </div>
      </div>
    </div>

    <div className="mt-4 space-y-3">
          {/* Referral Card */}
          <div className="bg-white rounded-2xl p-4 shadow-lg relative">
            <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors">
              ✕
            </button>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="text-gray-800 font-semibold text-sm mb-1">
                  Refer your friends to VivaFemini 💕💐
                </h3>
                <p className="text-gray-500 text-xs">
                  Gift your friend 30 days of free Premium to help them thrive
                </p>
              </div>
              <div className="text-3xl">📣</div>
            </div>
          </div>

          {/* Pregnancy Test Card */}
          <div className="bg-white rounded-2xl p-4 shadow-lg relative">
            <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors">
              ✕
            </button>
            <h3 className="text-gray-800 font-semibold text-sm mb-3">
              Hi! Did you take your pregnancy test?
            </h3>
            <div className="flex justify-around gap-2">
              <div>
                <img src={FirstImg} />
              </div>
               <div>
                <img src={Start} />
              </div>
               <div>
                <img src={Start} />
              </div>
               <div>
                <img src={Start} />
              </div>

            </div>
          </div>
        </div>
    </div>
  );
};

export default CycleCalendar;
