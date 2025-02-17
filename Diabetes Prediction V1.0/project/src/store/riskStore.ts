import { create } from 'zustand';
import { useProfileStore } from './profileStore';

interface RiskState {
  age: number;
  hypertension: boolean | null;
  heartDisease: boolean | null;
  bmi: number;
  hba1c: number;
  glucose: number;
  risk: number;
  showResult: boolean;
  
  setAge: (age: number) => void;
  setBMI: (bmi: number) => void;
  setBinaryValue: (key: 'hypertension' | 'heartDisease', value: boolean) => void;
  setBloodLevel: (key: 'hba1c' | 'glucose', value: number, fromProfile?: boolean) => void;
  calculateHbA1c: (glucose: number) => number;
  calculateRisk: () => void;
  resetAssessment: () => void;
}

export const useRiskStore = create<RiskState>((set, get) => ({
  age: 25,
  hypertension: null,
  heartDisease: null,
  bmi: 24.5,
  hba1c: 5.7,
  glucose: 95,
  risk: 0,
  showResult: false,

  setAge: (age) => set({ age }),
  setBMI: (bmi) => set({ bmi }),
  setBinaryValue: (key, value) => set({ [key]: value }),
  
  setBloodLevel: (key, value, fromProfile = false) => {
    if (key === 'glucose') {
      // Calculate HbA1c when glucose is updated
      const hba1c = get().calculateHbA1c(value);
      set({ glucose: value, hba1c });
      
      // Sync with profile store if not from profile
      if (!fromProfile) {
        const profileStore = useProfileStore.getState();
        profileStore.isUpdatingFromRisk = true;
        profileStore.updateProfile({ glucoseLevel: value });
      }
    } else {
      set({ [key]: value });
    }
  },

  calculateHbA1c: (glucose: number) => {
    // Formula: HbA1c = (Average Glucose + 46.7) / 28.7
    const hba1c = (glucose + 46.7) / 28.7;
    // Round to 1 decimal place and clamp between 4 and 12
    return Math.min(Math.max(Math.round(hba1c * 10) / 10, 4), 12);
  },

  calculateRisk: () => {
    const state = get();
    let riskScore = 0;
    
    if (state.age > 45) riskScore += 0.2;
    if (state.age > 65) riskScore += 0.1;
    if (state.hypertension) riskScore += 0.15;
    if (state.heartDisease) riskScore += 0.15;
    if (state.bmi >= 25 && state.bmi < 30) riskScore += 0.1;
    if (state.bmi >= 30) riskScore += 0.2;
    if (state.hba1c >= 5.7 && state.hba1c < 6.5) riskScore += 0.2;
    if (state.hba1c >= 6.5) riskScore += 0.4;
    if (state.glucose >= 100 && state.glucose < 126) riskScore += 0.2;
    if (state.glucose >= 126) riskScore += 0.4;
    
    set({ risk: Math.min(riskScore, 1), showResult: true });
  },

  resetAssessment: () => set({ showResult: false }),
}));