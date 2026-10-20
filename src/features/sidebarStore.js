import { create } from 'zustand'

const useSidebarStore = create((set) => ({
  isCollapsed: false,
  isMobileOpen: false,

  toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setCollapsed: (value) => set({ isCollapsed: value }),

  toggleMobileOpen: () => set((state) => ({ isMobileOpen: !state.isMobileOpen })),
  setMobileOpen: (value) => set({ isMobileOpen: value }),
  closeMobile: () => set({ isMobileOpen: false }),
}))

export default useSidebarStore
