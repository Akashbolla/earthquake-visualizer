import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMagnitudeRange } from '../features/earthquakesSlice'

export default function Controls() {
  const dispatch = useDispatch()
  const ui = useSelector(s => s.earthquakes.ui)
  const [min, setMin] = useState(ui.minMag)
  const [max, setMax] = useState(ui.maxMag)

  useEffect(() => {
    setMin(ui.minMag)
    setMax(ui.maxMag)
  }, [ui.minMag, ui.maxMag])

  return (
    <div className="p-4 bg-white/80 rounded-lg shadow-md">
      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium">Min Mag</label>
        <input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="w-20 p-1 border rounded" />
        <label className="text-sm font-medium">Max Mag</label>
        <input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="w-20 p-1 border rounded" />
        <button onClick={() => dispatch(setMagnitudeRange({ min, max }))} className="ml-auto px-3 py-1 bg-orange-500 rounded text-white">Apply</button>
      </div>
    </div>
  )
}
