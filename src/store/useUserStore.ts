import { create } from "zustand";

interface UserState {
  isFounder: boolean;
  toggleRole: () => void;
  setFounder: (val: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isFounder: false,
  toggleRole: () => set((state) => ({ isFounder: !state.isFounder })),
  setFounder: (val) => set({ isFounder: val }),
}));
