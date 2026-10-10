import { create } from "zustand";

type UiState = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  wizardDraft: { areaId: string; title: string; description: string };
  setWizardDraft: (draft: Partial<UiState["wizardDraft"]>) => void;
  resetWizard: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  wizardDraft: { areaId: "", title: "", description: "" },
  setWizardDraft: (draft) => set((s) => ({ wizardDraft: { ...s.wizardDraft, ...draft } })),
  resetWizard: () => set({ wizardDraft: { areaId: "", title: "", description: "" } }),
}));