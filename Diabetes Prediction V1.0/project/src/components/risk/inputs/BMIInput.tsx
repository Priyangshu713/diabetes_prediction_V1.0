import React, { useState } from 'react';
import { Scale, Calculator, X, AlertCircle, RefreshCw } from 'lucide-react';
import { useRiskStore } from '../../../store/riskStore';
import { useProfileStore } from '../../../store/profileStore';
import ReactDOM from 'react-dom';

interface BMICalculatorProps {
  onClose: () => void;
  onUpdate: (bmi: number, height: number, weight: number) => void;
  initialHeight?: number;
  initialWeight?: number;
}

function BMICalculator({ onClose, onUpdate, initialHeight, initialWeight }: BMICalculatorProps) {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState({
    metric: initialHeight || 170,
    ft: Math.floor((initialHeight || 170) * 0.0328084),
    inch: Math.round(((initialHeight || 170) * 0.0328084 % 1) * 12)
  });
  const [weight, setWeight] = useState({
    metric: initialWeight || 70,
    lbs: Math.round((initialWeight || 70) * 2.20462)
  });

  const calculateBMI = () => {
    const heightInMeters = unit === 'metric' 
      ? height.metric / 100
      : ((height.ft * 12 + height.inch) * 0.0254);
    const weightInKg = unit === 'metric'
      ? weight.metric
      : weight.lbs * 0.453592;
    return weightInKg / (heightInMeters * heightInMeters);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-400' };
    if (bmi < 30) return { text: 'Overweight', color: 'text-yellow-400' };
    return { text: 'Obesity', color: 'text-red-400' };
  };

  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    setUnit(newUnit);
  };

  const handleHeightChange = (value: number, field: 'metric' | 'ft' | 'inch') => {
    if (field === 'metric') {
      setHeight({
        metric: value,
        ft: Math.floor(value * 0.0328084),
        inch: Math.round((value * 0.0328084 % 1) * 12)
      });
    } else {
      const totalInches = field === 'ft' 
        ? value * 12 + height.inch
        : height.ft * 12 + value;
      setHeight({
        metric: Math.round(totalInches * 2.54),
        ft: Math.floor(totalInches / 12),
        inch: totalInches % 12
      });
    }
  };

  const handleWeightChange = (value: number, field: 'metric' | 'lbs') => {
    if (field === 'metric') {
      setWeight({
        metric: value,
        lbs: Math.round(value * 2.20462)
      });
    } else {
      setWeight({
        metric: Math.round(value * 0.453592),
        lbs: value
      });
    }
  };

  const bmi = calculateBMI();
  const category = getBMICategory(bmi);

  const handleUpdate = () => {
    onUpdate(
      bmi,
      unit === 'metric' ? height.metric : Math.round((height.ft * 12 + height.inch) * 2.54),
      unit === 'metric' ? weight.metric : Math.round(weight.lbs * 0.453592)
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl w-full max-w-md sm:max-w-lg overflow-hidden relative shadow-2xl border border-white/10">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-semibold text-white">BMI Calculator</h3>
          <p className="text-gray-400 mt-2">Calculate your Body Mass Index</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8">
          {/* Unit Toggle */}
          <div className="relative bg-gray-800/50 rounded-xl p-1">
            <div 
              className="absolute inset-y-1 w-1/2 bg-purple-600 rounded-lg transition-transform duration-300"
              style={{ transform: `translateX(${unit === 'imperial' ? '100%' : '0'})` }}
            />
            {(['metric', 'imperial'] as const).map((option) => (
              <button
                key={option}
                onClick={() => handleUnitChange(option)}
                className={`relative z-10 w-1/2 py-2 px-4 text-sm font-medium rounded-lg transition-colors duration-300 ${
                  unit === option
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>

          {/* Height Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Height
            </label>
            {unit === 'metric' ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={height.metric}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value), 'metric')}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <span className="min-w-[4rem] text-center text-white font-medium">
                    {height.metric} cm
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>120 cm</span>
                  <span>170 cm</span>
                  <span>220 cm</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Feet</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="4"
                        max="7"
                        value={height.ft}
                        onChange={(e) => handleHeightChange(parseInt(e.target.value), 'ft')}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                      <span className="min-w-[4rem] text-center text-white font-medium">
                        {height.ft} ft
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Inches</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="11"
                        value={height.inch}
                        onChange={(e) => handleHeightChange(parseInt(e.target.value), 'inch')}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                      <span className="min-w-[4rem] text-center text-white font-medium">
                        {height.inch} in
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Weight Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Weight
            </label>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={unit === 'metric' ? "30" : "66"}
                  max={unit === 'metric' ? "200" : "440"}
                  value={unit === 'metric' ? weight.metric : weight.lbs}
                  onChange={(e) => handleWeightChange(parseInt(e.target.value), unit === 'metric' ? 'metric' : 'lbs')}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <span className="min-w-[4rem] text-center text-white font-medium">
                  {unit === 'metric' ? `${weight.metric} kg` : `${weight.lbs} lbs`}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{unit === 'metric' ? '30 kg' : '66 lbs'}</span>
                <span>{unit === 'metric' ? '115 kg' : '253 lbs'}</span>
                <span>{unit === 'metric' ? '200 kg' : '440 lbs'}</span>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl bg-gradient-to-b from-gray-800 to-gray-800/50 border border-purple-500/20 overflow-hidden">
            <div className="p-4 border-b border-gray-700/50">
              <p className="text-gray-300 text-sm">Your BMI</p>
              <div className="text-3xl font-bold text-white mt-1">
                {bmi.toFixed(1)}
              </div>
              <div className={`text-sm mt-1 ${category.color}`}>
                {category.text}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <button
                onClick={handleUpdate}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Update BMI
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-700/50 hover:bg-gray-700 text-gray-300 py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700/50 bg-gray-800/50">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <AlertCircle className="w-5 h-5 text-purple-400 shrink-0" />
            <p>
              BMI is a screening tool, not a diagnostic of body fatness or health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BMIInput() {
  const { setBMI } = useRiskStore();
  const { height, weight, updateProfile } = useProfileStore();
  const [showCalculator, setShowCalculator] = useState(false);

  // Calculate BMI from height and weight
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  const getBMICategory = (value: number) => {
    if (value < 18.5) return { text: 'Underweight', color: 'text-blue-400' };
    if (value < 25) return { text: 'Normal', color: 'text-green-400' };
    if (value < 30) return { text: 'Overweight', color: 'text-yellow-400' };
    return { text: 'Obesity', color: 'text-red-400' };
  };

  const handleBMIChange = (newBMI: number) => {
    // Calculate new weight based on BMI and current height
    const newWeight = newBMI * (heightInMeters * heightInMeters);
    updateProfile({ weight: Math.round(newWeight) });
  };

  const handleBMIUpdate = (newBMI: number, newHeight: number, newWeight: number) => {
    updateProfile({ height: newHeight, weight: newWeight });
    setShowCalculator(false);
  };

  const category = getBMICategory(bmi);
  const percentage = Math.min(((bmi - 15) / (35 - 15)) * 100, 100);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Scale className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-medium text-white">Body Mass Index (BMI)</h3>
      </div>

      <div className="space-y-6">
        <div className="text-2xl font-bold text-white text-center">
          {bmi.toFixed(1)}
        </div>

        <div className="relative mb-8">
          <div className="h-2 bg-gray-700/50 rounded-full">
            <div
              className="absolute h-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* BMI Slider */}
          <input
            type="range"
            min="15"
            max="35"
            step="0.1"
            value={bmi}
            onChange={(e) => handleBMIChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />

          {/* Category labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs flex-wrap">
            <div className="text-blue-400 whitespace-nowrap">15 (Underweight)</div>
            <div className="text-green-400 whitespace-nowrap">18.5</div>
            <div className="text-yellow-400 whitespace-nowrap">25</div>
            <div className="text-red-400 whitespace-nowrap">30+</div>
          </div>
        </div>

        <div className={`text-center ${category.color} mb-4`}>
          {category.text}
        </div>

        <button
          type="button"
          onClick={() => setShowCalculator(true)}
          className="group w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-purple-600/20 hover:from-purple-600/20 hover:to-purple-600/30 border border-purple-500/20 hover:border-purple-500/30 text-gray-300 flex items-center justify-between transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
              <Calculator className="w-4 h-4 text-purple-400" />
            </div>
            <span>Don't know your BMI?</span>
          </div>
          <span className="text-purple-400 group-hover:translate-x-1 transition-transform">
            Calculate →
          </span>
        </button>
      </div>

      {showCalculator && ReactDOM.createPortal(
        <BMICalculator
          onClose={() => setShowCalculator(false)}
          onUpdate={handleBMIUpdate}
          initialHeight={height}
          initialWeight={weight}
        />,
        document.body
      )}
    </div>
  );
}
