import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

// Import images (keeping your original imports)
import Cycle from "../../../assets/svg/cycle.svg";
import Period from "../../../assets/svg/period.svg";
import Ovulation from "../../../assets/svg/ovultion.svg";
import Next_Period from "../../../assets/svg/next_period.svg";
import MainLayout from "../../../constant/MainLayout";

const HealthReport = () => {
  const lineChartRef = useRef(null);
  const physicalPainRef = useRef(null);
  const moodMentalRef = useRef(null);
  const sexualHealthRef = useRef(null);
  const digestionRef = useRef(null);

  useEffect(() => {
    // Line Chart Configuration
    const lineChartOptions = {
      chart: {
        type: "line",
        height: 300,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#EC4899"],
      },
      markers: {
        size: 6,
        colors: ["#EC4899"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 8,
        },
      },
      series: [
        {
          name: "Flow Intensity",
          data: [0, 0, 0, 0, 6, 3, 9, 5, 0, 5, 5],
        },
      ],
      xaxis: {
        categories: [
          "2025-10-07",
          "",
          "2025-10-09",
          "",
          "2025-10-10",
          "",
          "2025-10-11",
          "",
          "2025-10-11",
        ],
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "11px",
          },
          rotate: 0,
        },
      },
      yaxis: {
        min: 0,
        max: 10,
        tickAmount: 5,
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
        },
      },
      grid: {
        borderColor: "#F3F4F6",
        strokeDashArray: 4,
      },
      tooltip: {
        theme: "light",
        y: {
          formatter: (val) => val + " days",
        },
      },
    };

    // Radial Chart Configuration Function
    const createRadialChart = (ref, color, percentage) => {
      const options = {
        chart: {
          type: "radialBar",
          height: 180,
        },
        series: [percentage],
        plotOptions: {
          radialBar: {
            hollow: {
              size: "65%",
            },
            track: {
              background: "#F3F4F6",
              strokeWidth: "100%",
            },
            dataLabels: {
              name: { show: false },
              value: {
                fontSize: "24px",
                fontWeight: "bold",
                color: "#1F2937",
                offsetY: 8,
                formatter: (val) => val + "%",
              },
            },
          },
        },
        colors: [color],
        stroke: {
          lineCap: "round",
        },
      };

      if (ref.current) {
        const chart = new ApexCharts(ref.current, options);
        chart.render();
        return chart;
      }
    };

    // Initialize Charts
    let lineChart, physicalChart, moodChart, sexualChart, digestionChart;

    if (lineChartRef.current) {
      lineChart = new ApexCharts(lineChartRef.current, lineChartOptions);
      lineChart.render();
    }

    physicalChart = createRadialChart(physicalPainRef, "#EF4444", 55);
    moodChart = createRadialChart(moodMentalRef, "#EC4899", 75);
    sexualChart = createRadialChart(sexualHealthRef, "#EC4899", 32);
    digestionChart = createRadialChart(digestionRef, "#F59E0B", 23);

    // Cleanup
    return () => {
      lineChart?.destroy();
      physicalChart?.destroy();
      moodChart?.destroy();
      sexualChart?.destroy();
      digestionChart?.destroy();
    };
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-between w-full">
      <div className="w-1/2">
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Cycle Summary – October 2025
          </h1>

          <div className="flex flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-red-300 bg-red-50">
              <img src={Cycle} alt="Cycle" className="w-5 h-5" />
              <span className="text-sm text-[#F36F56]">Cycle Length:</span>
              <span className="text-sm font-bold text-gray-900">28 Days</span>
            </div>

            <div className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-pink-300 bg-pink-50">
              <img src={Period} alt="Period" className="w-5 h-5" />
              <span className="text-sm text-[#FB3179]">Period Duration:</span>
              <span className="text-sm font-bold text-gray-900">5 Days</span>
            </div>

            <div className="flex items-center gap-2 px-5 py-3 rounded-full border-2 border-purple-300 bg-purple-50">
              <img src={Next_Period} alt="Next Period" className="w-5 h-5" />
              <span className="text-sm text-[#7E19DF]">
                Estimated Next Period:
              </span>
              <span className="text-sm font-bold text-gray-900">Nov 4</span>
            </div>
          </div>

          <div className="items-center gap-2 px-5 py-3 rounded-full border-2 border-blue-300 bg-blue-50 inline-flex">
            <img src={Ovulation} alt="Ovulation" className="w-5 h-5" />
            <span className="text-sm text-[#0D34F9]">Ovulation Window:</span>
            <span className="text-sm font-bold text-gray-900">Oct 17-22</span>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Period Length
            </h2>
            <p className="text-sm text-gray-500">
              Monthly period pattern (0–7 days) and flow intensity
            </p>
          </div>
          <div ref={lineChartRef} className="w-full"></div>
          <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
            <svg
              className="w-4 h-4 text-gray-400 mt-0.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span>
              Higher peaks indicate stronger symptoms. Flow overlay (pink) shows
              heavier days.
            </span>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col gap-6 ml-6">
      <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Flow & Symptom Summary
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Understand your symptoms linked to sleep & activity
          </p>

          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            Your average cycle length is 29 days. PMS symptoms were more
            frequent this month. Flow pattern remains within a typical range
          </p>

          <div className="bg-white border-l-4 border-pink-500 pl-4">
            <p className="text-sm font-bold text-pink-600 mb-3">
              Tips To Adhere To:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-700 mt-0.5">•</span>
                <span>Low sleep nights → higher cramp scores</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-gray-700 mt-0.5">•</span>
                <span>Low hydration → increased bloating</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Symptom Frequency
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Study your body system & understand your wellbeing
          </p>

          <div className="grid grid-cols-3">
            <div className="flex flex-col items-center">
              <div ref={physicalPainRef} className="w-full max-w-45"></div>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <p className="text-sm font-medium text-gray-700">
                  Physical Pain
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div ref={moodMentalRef} className="w-full max-w-45"></div>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                <p className="text-sm font-medium text-gray-700">
                  Mood & Mental
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div ref={digestionRef} className="w-full max-w-45"></div>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <p className="text-sm font-medium text-gray-700">
                  Digestion & Appetite
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:col-start-2">
              <div ref={sexualHealthRef} className="w-full max-w-45"></div>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                <p className="text-sm font-medium text-gray-700">
                  Sexual Health
                </p>
              </div>
            </div>

            <div className="flex-col items-center hidden">
              <div className="w-full max-w-45 h-45 bg-gray-100 rounded-full"></div>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <p className="text-sm font-medium text-gray-700">
                  Digestion & Appetite
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>


      
    </MainLayout>
  );
};

export default HealthReport;
