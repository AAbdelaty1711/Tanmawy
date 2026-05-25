import { create } from "zustand";

interface LayoutState {
  isLeftPanelOpen: boolean;
  setLeftPanelOpen: (val: boolean) => void;
  toggleLeftPanel: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isLeftPanelOpen: false,
  setLeftPanelOpen: (val) => set({ isLeftPanelOpen: val }),
  toggleLeftPanel: () => set((state) => ({ isLeftPanelOpen: !state.isLeftPanelOpen })),
}));
