import React from "react";
import { Calendar, Activity } from "lucide-react";
import StayPositive from "../../../../assets/staypositive.png";
import SickWoman from "../../../../assets/sickwoman.jpg";
import Fruit from "../../../../assets/fruit.jpg";
import Doctor from "../../../../assets/doctor.jpg";

const CycleHighlight: React.FC = () => {
  return (
    <div className="px-4 sm:px-0 w-full lg:max-w-1/2">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-2">
          Cycle Highlight
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Understand your cycle and take care
        </p>
        <p className="text-gray-600 text-sm sm:text-base">during peak days</p>

        <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white rounded-full shadow-sm">
          <Calendar className="w-4 h-4 text-pink-500" />
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            1 Tip
          </span>
        </div>
      </div>

      {/* Care Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
        {/* Stay Comfortable Card 1 */}
        <div className="bg-[#D2FEFE] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-xl sm:text-2xl">🥤</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              Stay Comfortable
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2 sm:mb-3">
            Drink water to support your health and your flow
          </p>
          <p className="text-[10px] sm:text-xs text-gray-600">
            ~8 glasses daily
          </p>
        </div>

        {/* Stay Comfortable (Main) Card */}
        <div className="bg-[#FFE5EE] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
              <img src={StayPositive} alt="" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              Stay Comfortable
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 sm:mb-4">
            On heavy flow days, prioritize comfort. Stay hydrated and use
            heating pads for abdominal relief.
          </p>
          <div className="flex items-center gap-2 text-purple-600 text-[10px] sm:text-xs">
            <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Listen to your body</span>
          </div>
        </div>

        {/* Gentle Movement Card */}
        <div className="bg-[#FFECD3] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-xl sm:text-2xl">🧘</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              Gentle Movement
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-2 sm:mb-3">
            Light stretching and yoga can ease discomfort
          </p>
          <div className="flex items-center gap-2 text-purple-600 text-[10px] sm:text-xs">
            <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Listen to your body</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 sm:mb-8">
        {/* Daily Check-Offs */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md">
          <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
            Daily Check-Offs
          </h3>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-100 gap-2">
              <span className="text-xs sm:text-sm text-gray-600">Symptoms</span>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-pink-500">
                  Mild Bloating, Cravings
                </span>
                <span className="text-base sm:text-lg">🍰</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-2">
              <span className="text-xs sm:text-sm text-gray-600">
                Health Report
              </span>
              <span className="text-xs sm:text-sm font-medium text-green-500">
                Positive (Logged)
              </span>
            </div>
          </div>
        </div>

        {/* Trend Watch */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            📊
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">
              Trend Watch
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-100 gap-2">
              <span className="text-xs sm:text-sm text-gray-600">
                Most Frequent Symptom
              </span>
              <div className="bg-[#FDEDF0] rounded-2xl px-3 py-1 ">
                <span className="text-xs sm:text-sm font-medium text-pink-500">
                  Bloating
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-2">
              <span className="text-xs sm:text-sm text-gray-600">
                Symptom Intensity Change
              </span>
              <div className="flex items-center gap-2 bg-[#D8F2FD] rounded-2xl px-3 ">
                <span className="text-xs sm:text-sm font-medium text-cyan-500">
                  Stable
                </span>
                <span className="text-base sm:text-lg">😊</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended for You Section */}
     <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-pink-500 mb-4 sm:mb-6">
          Recommended for You
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-80 flex flex-col">
            <img
              src={SickWoman}
              alt="Reduce stress"
              className="h-50 w-full object-cover"
            />

            <div className="p-4 flex flex-col flex-1 justify-between">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                5 Ways to Reduce Stress During Your Cycle
              </h3>

              <button className="text-pink-500 font-medium text-xs sm:text-sm hover:text-pink-600 transition-colors flex items-center gap-1">
                Read more →
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-80 flex flex-col">
            <img
              src={Fruit}
              alt="Nutrition tips"
              className="h-50 w-full object-cover"
            />

            <div className="p-4 flex flex-col flex-1 justify-between">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                Best Nutrition Tips for Better Energy
              </h3>

              <button className="text-pink-500 font-medium text-xs sm:text-sm hover:text-pink-600 transition-colors flex items-center gap-1">
                Read more →
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-80 flex flex-col">
            <img
              src={Doctor}
              alt="Sleep and hormones"
              className="h-50 w-full object-cover"
            />

            <div className="p-4 flex flex-col flex-1 justify-between">
              <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                How Sleep Affects Hormonal Balance
              </h3>

              <button className="text-pink-500 font-medium text-xs sm:text-sm hover:text-pink-600 transition-colors flex items-center gap-1">
                Read more →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleHighlight;
