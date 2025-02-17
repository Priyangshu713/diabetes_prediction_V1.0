import React from 'react';
import { Card } from '../ui/Card';
import AgeInput from './inputs/AgeInput';
import BinaryInput from './inputs/BinaryInput';
import BMIInput from './inputs/BMIInput';
import BloodLevelInput from './inputs/BloodLevelInput';
import { useRiskStore } from '../../store/riskStore';
import { ArrowRight } from 'lucide-react';

export default function RiskForm() {
  const { calculateRisk } = useRiskStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateRisk();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card className="p-6">
          <AgeInput />
        </Card>

        <Card className="p-6">
          <BinaryInput
            title="Hypertension"
            description="Have you been diagnosed with high blood pressure?"
            name="hypertension"
          />
        </Card>

        <Card className="p-6">
          <BinaryInput
            title="Heart Disease"
            description="Do you have any history of heart disease?"
            name="heartDisease"
          />
        </Card>

        <Card className="p-6">
          <BMIInput />
        </Card>

        <Card className="p-6">
          <BloodLevelInput
            title="HbA1c Level"
            description="Glycated hemoglobin level indicates your average blood sugar level"
            name="hba1c"
            unit="%"
            min={4}
            max={12}
            step={0.1}
          />
        </Card>

        <Card className="p-6">
          <BloodLevelInput
            title="Blood Glucose Level"
            description="Your current blood glucose level"
            name="glucose"
            unit="mg/dL"
            min={70}
            max={200}
            step={1}
          />
        </Card>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl transition-colors"
        >
          Calculate Risk
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}