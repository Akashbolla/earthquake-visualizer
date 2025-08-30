import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { refreshData } from '../features/earthquakesSlice'

export default function HumanoidSidebar() {
  const dispatch = useDispatch()
  const state = useSelector(s => s.earthquakes)
  const count = state.filtered?.features?.length ?? 0
  const endpointDisplay = state.config ? (state.config.USGS_ENDPOINT || state.config['USGS_ENDPOINT']) : 'loading...'

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 p-4 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-xl font-bold">🤖</div>
        <div>
          <div className="font-semibold">QuakeBot</div>
          <div className="text-xs text-gray-300">Your seismic guide</div>
        </div>
      </div>

      <div className="text-sm">
        <div className="font-medium">Recent quakes:</div>
        <div className="text-2xl font-bold">{count}</div>
      </div>

      <div className="mt-auto">
        <button onClick={() => dispatch(refreshData())} className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700">Refresh Now</button>
      </div>

      <div className="text-xs text-gray-400 mt-4 break-words">
        Endpoint: <br/>{endpointDisplay}
      </div>
    </aside>
  )
}
