import { create } from 'zustand'

const useThemeStore = create((set) => ({
  theme: localStorage.getItem('proflow_theme') || 'dark',

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem('proflow_theme', next)
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(next)
      return { theme: next }
    }),

  initializeTheme: () => {
    const saved = localStorage.getItem('proflow_theme')
    const theme = saved || 'dark'
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
    set({ theme })
  },
}))

export default useThemeStore
