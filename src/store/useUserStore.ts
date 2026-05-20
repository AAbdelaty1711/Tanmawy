import { create } from "zustand";

interface UserState {
  isFounder: boolean;
  toggleRole: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isFounder: false,
  toggleRole: () => set((state) => ({ isFounder: !state.isFounder })),
}));
