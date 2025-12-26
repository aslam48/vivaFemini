import React, { useState, useEffect } from 'react';
import { useGetDailyLogs } from '../../../../services/fetchApi';
import { moodMentalOptions, physicalPainOptions } from '../../../../utils/data';


const PeriodPlans: React.FC = () => {
  const [selectedPhysical, setSelectedPhysical] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string[]>([]);
  const [flowValue, setFlowValue] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');

  const { DailyLogs, isLoading } = useGetDailyLogs();

  
  useEffect(() => {
    if (DailyLogs && DailyLogs.length > 0) {
      const recentLog = DailyLogs[0];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPhysical(recentLog.physicalPainSymptoms || []);
      setSelectedMood(recentLog.moodMentalStates || []);
      setFlowValue(recentLog.flowIntensity || 0);
      // setNotes(recentLog.notes || '');
    }
  }, [DailyLogs]);

  const togglePhysical = (label: string) => {
    setSelectedPhysical(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const toggleMood = (label: string) => {
    setSelectedMood(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const handleSave = async () => {
    // TODO: Implement your save/update API call here
    const dataToSave = {
      physicalPainSymptoms: selectedPhysical,
      moodMentalStates: selectedMood,
      flowIntensity: flowValue,
      notes: notes,
      date: new Date().toISOString(),
    };
    
    console.log('Saving data:', dataToSave);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 w-full">
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 w-full">
      {/* Physical Pain Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Physical Pain</h3>
        <div className="flex flex-wrap gap-2">
          {physicalPainOptions.map((item) => {
            const isSelected = selectedPhysical.includes(item.label);
            return (
              <button
                key={item.label}
                onClick={() => togglePhysical(item.label)}
                className={`${
                  isSelected
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-pink-50 text-pink-600 border-pink-200'
                } px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 transition-all duration-200 hover:shadow-md`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood & Mental Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Mood & Mental</h3>
        <div className="flex flex-wrap gap-2">
          {moodMentalOptions.map((item) => {
            const isSelected = selectedMood.includes(item.label);
            return (
              <button
                key={item.label}
                onClick={() => toggleMood(item.label)}
                className={`${
                  isSelected
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-pink-50 text-pink-600 border-pink-200'
                } px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 transition-all duration-200 hover:shadow-md`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flow Intensity Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Flow Intensity</h3>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">How heavy is your flow today?</p>
          <span className="text-sm font-medium text-gray-700">{flowValue}/10</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={flowValue}
          onChange={(e) => setFlowValue(Number(e.target.value))}
          className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Light</span>
          <span>Medium</span>
          <span>Heavy</span>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mb-6">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Inputting Note"
          className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
          rows={4}
        />
      </div>

      {/* Save Button */}
      <button 
        onClick={handleSave}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
      >
        Save <span>✓</span>
      </button>
    </div>
  );
};

export default PeriodPlans;