import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import Cycle from "../../../assets/svg/cycle.svg";
import Period from "../../../assets/svg/period.svg";
import Ovulation from "../../../assets/svg/ovultion.svg";
import Next_Period from "../../../assets/svg/next_period.svg";
import MainLayout from "../../../constant/MainLayout";
import HistoricalTable from "./component/HistoricalTable";

import { useFlowPaattern, useSymptom_Frequency } from "../../../services/fetchApi";

const HealthReport = () => {
  const { SymptomData, isLoading: symptomLoading } = useSymptom_Frequency();
  const { FlowData, isLoading: flowLoading } = useFlowPaattern();
  
  const lineChartRef = useRef<HTMLDivElement>(null);
  const physicalPainRef = useRef<HTMLDivElement>(null);
  const moodMentalRef = useRef<HTMLDivElement>(null);
  const sexualHealthRef = useRef<HTMLDivElement>(null);
  const digestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (symptomLoading || flowLoading || !SymptomData || !FlowData || FlowData.length === 0) return;
    
    console.log('Flow Data:', FlowData)
    
    const maxValue = 150; 
    const physicalPercentage = Math.round((SymptomData.physicalPain / maxValue) * 100);
    const moodPercentage = Math.round((SymptomData.moodMental / maxValue) * 100);
    const digestionPercentage = Math.round((SymptomData.digestionAppetite / maxValue) * 100);
    const sexualPercentage = Math.round((SymptomData.sexualHealth / maxValue) * 100);

    const createRadialChart = (ref: React.RefObject<HTMLDivElement | null>, color: string, percentage: number) => {
      const options = {
        chart: {
          type: "radialBar",
          height: 120,
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
                formatter: (val: string) => val + "%",
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


    const flowCategories = FlowData.map((item: { date: string | number | Date; }) => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    
    const flowIntensities = FlowData.map((item: { intensity: unknown; }) => item.intensity);

    const lineChartOptions = {
      chart: {
        type: "line",
        height: 280,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      series: [
        {
          name: "Flow Intensity",
          data: flowIntensities,
          type: "line",
        },
      ],
      stroke: {
        curve: "straight",
        width: 3,
        colors: ["#FB3179"],
        dashArray: 0,
      },
      markers: {
        size: 7,
        colors: ["#FFFFFF"],
        strokeColors: ["#FB3179"],
        strokeWidth: 3,
        hover: {
          size: 9,
        },
        shape: "circle",
      },
      colors: ["#FB3179"],
      fill: {
        opacity: 1,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: flowCategories,
        labels: {
          style: {
            colors: "#64748B",
            fontSize: "12px",
          },
        },
        axisBorder: {
          show: true,
          color: "#E5E7EB",
        },
        axisTicks: {
          show: true,
        },
      },
      yaxis: {
        min: 0,
        max: 10,
        labels: {
          style: {
            colors: "#64748B",
            fontSize: "12px",
          },
          formatter: (val: number) => val.toFixed(0),
        },
        title: {
          text: "Intensity (0-10)",
          style: {
            color: "#64748B",
            fontSize: "12px",
          },
        },
      },
      grid: {
        borderColor: "#E5E7EB",
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val: unknown) => `${val} / 10`,
        },
      },
    };

   
    let lineChart: ApexCharts, physicalChart, moodChart, sexualChart, digestionChart;

    if (lineChartRef.current) {
      lineChartRef.current.innerHTML = '';
      lineChart = new ApexCharts(lineChartRef.current, lineChartOptions);
      lineChart.render();
    }

    // eslint-disable-next-line prefer-const
    physicalChart = createRadialChart(physicalPainRef, "#EF4444", physicalPercentage);
    // eslint-disable-next-line prefer-const
    moodChart = createRadialChart(moodMentalRef, "#10B981", moodPercentage);
    // eslint-disable-next-line prefer-const
    sexualChart = createRadialChart(sexualHealthRef, "#EC4899", sexualPercentage);
    // eslint-disable-next-line prefer-const
    digestionChart = createRadialChart(digestionRef, "#F59E0B", digestionPercentage);

    // Cleanup
    return () => {
      lineChart?.destroy();
      physicalChart?.destroy();
      moodChart?.destroy();
      sexualChart?.destroy();
      digestionChart?.destroy();
    };
  }, [SymptomData, FlowData, symptomLoading, flowLoading]);

  // Loading state
  if (symptomLoading || flowLoading) {
    return (
      <MainLayout>
       <div className="flex flex-col items-center justify-center h-96 gap-4">
  <div
    className="h-10 w-10 rounded-full border-4 border-gray-200 animate-spin"
    style={{ borderTopColor: "#B32070" }}
  />
  <p className="text-sm text-gray-600">Loading health report...</p>
</div>

      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row justify-between w-full gap-6">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 shrink-0">
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

          <div className="bg-white shadow-lg rounded-2xl p-6 grow flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Period Length
              </h2>
              <p className="text-sm text-gray-500">
                Monthly period pattern (0–7 days) and flow intensity
              </p>
            </div>
            <div ref={lineChartRef} className="w-full grow flex justify-end items-end"></div>
            <div className="flex mt-4 items-start gap-2 text-xs text-gray-500">
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

        {/* Right Column */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg shrink-0">
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

            <div className="bg-white">
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

          {/* Symptom Frequency Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 grow flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Symptom Frequency
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Study your body system & understand your wellbeing
            </p>

            {/* Equal Height Grid - 2x2 layout with fixed heights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 min-h-45">
                <div ref={physicalPainRef} className="w-full max-w-30 h-30"></div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <p className="text-sm font-medium text-gray-700">
                    Physical Pain
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 min-h-45">
                <div ref={moodMentalRef} className="w-full max-w-30 h-30"></div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <p className="text-sm font-medium text-gray-700">
                    Mood & Mental
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 min-h-45">
                <div ref={sexualHealthRef} className="w-full max-w-30 h-30"></div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
                  <p className="text-sm font-medium text-gray-700">
                    Sexual Health
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 min-h-45">
                <div ref={digestionRef} className="w-full max-w-30 h-30"></div>
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
      <HistoricalTable/>
    </MainLayout>
  );
};

export default HealthReport;