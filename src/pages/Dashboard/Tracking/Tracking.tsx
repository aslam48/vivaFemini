import { useState, useEffect } from "react";
import MainLayout from "../../../constant/MainLayout";
import Welcome from "../../../assets/welcome.png";
import PeriodPlans from "./component/PeriodPlans";
import { useGetDailyLogs } from "../../../services/fetchApi";
import {
  periodIndicatorsOptions,
  sexualHealthOptions,
} from "../../../utils/data";

const Tracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string[]>([]);
  const [selectedSexual, setSelectedSexual] = useState<string[]>([]);

  const { DailyLogs, isLoading } = useGetDailyLogs();

  useEffect(() => {
    if (DailyLogs && DailyLogs.length > 0) {
      const recentLog = DailyLogs[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPeriod(recentLog.periodIndicators || []);
      setSelectedSexual(recentLog.sexualHealthIndicators || []);
    }
  }, [DailyLogs]);

  const togglePeriod = (indicator: string) => {
    setSelectedPeriod((prev) =>
      prev.includes(indicator)
        ? prev.filter((item) => item !== indicator)
        : [...prev, indicator]
    );
  };

  const toggleSexual = (indicator: string) => {
    setSelectedSexual((prev) =>
      prev.includes(indicator)
        ? prev.filter((item) => item !== indicator)
        : [...prev, indicator]
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-6 mb-5">
        {/* Left Side - Welcome and Indicators */}
        <div className="flex flex-col gap-6 w-full lg:w-2/6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 w-full">
            <div className="flex justify-center mb-8">
              <img
                src={Welcome}
                alt="Welcome"
                className="w-48 h-48 object-contain"
              />
            </div>

            <div className="text-center space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome,
              </h1>
              <h2 className="text-xl md:text-2xl text-[#6B7280]">
                How are you doing today?
              </h2>
              <p className="text-sm md:text-base text-[#6B7280] leading-relaxed">
                Get to track your symptoms daily, to know your state of
                wellbeing
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 w-full">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-96 gap-4">
                <div
                  className="h-10 w-10 rounded-full border-4 border-gray-200 animate-spin"
                  style={{ borderTopColor: "#B32070" }}
                />
                <p className="text-sm text-gray-600">Loading...</p>
              </div>
            ) : (
              <>
                {/* Period Indicators Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Period Indicators
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {periodIndicatorsOptions.map((indicator) => {
                      const isSelected = selectedPeriod.includes(
                        indicator.label
                      );
                      return (
                        <button
                          key={indicator.label}
                          onClick={() => togglePeriod(indicator.label)}
                          className={`${
                            isSelected
                              ? "bg-pink-500 text-white border-pink-500"
                              : "bg-pink-50 text-pink-600 border-pink-200"
                          } px-4 py-2 rounded-full text-sm font-medium border cursor-pointer flex items-center gap-2 transition-all duration-200 hover:shadow-md`}
                        >
                          <span>{indicator.emoji}</span>
                          <span>{indicator.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sexual Health Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Sexual Health
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sexualHealthOptions.map((indicator) => {
                      const isSelected = selectedSexual.includes(
                        indicator.label
                      );
                      return (
                        <button
                          key={indicator.label}
                          onClick={() => toggleSexual(indicator.label)}
                          className={`${
                            isSelected
                              ? "bg-pink-500 text-white border-pink-500"
                              : "bg-pink-50 text-pink-600 border-pink-200"
                          } px-4 py-2 rounded-full text-sm font-medium border cursor-pointer flex items-center gap-2 transition-all duration-200 hover:shadow-md`}
                        >
                          <span>{indicator.emoji}</span>
                          <span>{indicator.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Period Plans */}
        <div className="w-full lg:flex-1">
          <PeriodPlans />
        </div>
      </div>
    </MainLayout>
  );
};

export default Tracking;
