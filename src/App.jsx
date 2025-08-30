import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initConfigAndData } from './features/earthquakesSlice'
import HumanoidSidebar from './components/HumanoidSidebar'
import MapView from './components/MapView'
import Controls from './components/Controls'

export default function App(){
  const dispatch = useDispatch()
  const state = useSelector(s => s.earthquakes)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  useEffect(() => {
    dispatch(initConfigAndData())
  }, [dispatch])

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-gray-100 via-slate-50 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black transition">
      <HumanoidSidebar />

      <main className="flex-1 p-4 flex flex-col gap-4">
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <h1 className="text-2xl font-extrabold">🌍 Earthquake Visualizer</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Data: {state.status}{state.error ? ` — ${state.error}` : ''}
            </div>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 h-[80vh]">
          <div className="space-y-4">
            <Controls />
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              Legend: marker size ~ magnitude
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow" style={{height: '100%'}}>
            <MapView />
          </div>
        </div>
      </main>
    </div>
  )
}
