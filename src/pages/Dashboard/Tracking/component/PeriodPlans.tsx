import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useGetDailyLogs } from "../../../../services/fetchApi";
import { moodMentalOptions, physicalPainOptions } from "../../../../utils/data";
import { postDailyLog } from "../../../../services/post";
const PeriodPlans: React.FC = () => {
  const [selectedPhysical, setSelectedPhysical] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string[]>([]);
  const [flowValue, setFlowValue] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { DailyLogs, isLoading, refetch } = useGetDailyLogs();

 
  useEffect(() => {
    if (DailyLogs && DailyLogs.length > 0) {
      const recentLog = DailyLogs[0];
      setSelectedPhysical(recentLog.physicalPainSymptoms || []);
      setSelectedMood(recentLog.moodMentalStates || []);
      setFlowValue(recentLog.flowIntensity || 0);
      setNotes(recentLog.notes || "");
    }
  }, [DailyLogs]);


  const togglePhysical = (label: string) => {
    setSelectedPhysical((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const toggleMood = (label: string) => {
    setSelectedMood((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };


  const handleSave = async () => {
    const payload = {
      userId: "694da85b653446a1a6264c21",
      date: new Date().toISOString(),
      cycleDay: 21,
      physicalPainSymptoms: selectedPhysical,
      moodMentalStates: selectedMood,
      flowIntensity: flowValue,
      periodIndicators: ["Spotting"],
      sexualHealthIndicators: [],
      notes,
    };

    try {
      setIsSaving(true);

      const response = await postDailyLog(payload);

      if (response.status === 201) {
        toast.success("Health report saved successfully ✅");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save health report ❌");
    } finally {
      setIsSaving(false);
    }
  };

 
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div
          className="h-10 w-10 rounded-full border-4 border-gray-200 animate-spin"
          style={{ borderTopColor: "#B32070" }}
        />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 w-full">

     
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Physical Pain
        </h3>
        <div className="flex flex-wrap gap-2">
          {physicalPainOptions.map((item) => {
            const isSelected = selectedPhysical.includes(item.label);
            return (
              <button
                key={item.label}
                onClick={() => togglePhysical(item.label)}
                className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 transition-all duration-200
                  ${
                    isSelected
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-pink-50 text-pink-600 border-pink-200"
                  }
                `}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Mood & Mental
        </h3>
        <div className="flex flex-wrap gap-2">
          {moodMentalOptions.map((item) => {
            const isSelected = selectedMood.includes(item.label);
            return (
              <button
                key={item.label}
                onClick={() => toggleMood(item.label)}
                className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 transition-all duration-200
                  ${
                    isSelected
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-pink-50 text-pink-600 border-pink-200"
                  }
                `}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Flow Intensity
        </h3>
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-600">
            How heavy is your flow today?
          </p>
          <span className="text-sm font-medium text-gray-700">
            {flowValue}/10
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="10"
          value={flowValue}
          onChange={(e) => setFlowValue(Number(e.target.value))}
          className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>

      
      <div className="mb-6">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Inputting Note"
          className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-600 focus:ring-2 focus:ring-pink-300 focus:outline-none"
        />
      </div>

   
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-70 text-white font-semibold py-4 rounded-full flex items-center justify-center gap-3 transition"
      >
        {isSaving ? (
          <>
            <span
              className="h-5 w-5 rounded-full border-2 border-white animate-spin"
              style={{ borderTopColor: "transparent" }}
            />
            Saving...
          </>
        ) : (
          <>
            Save <span>✓</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PeriodPlans;
