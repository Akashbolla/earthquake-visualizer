import React, { useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useSelector } from 'react-redux'

function magColor(mag){
  if (mag >= 6) return 'rgb(139,0,0)'
  if (mag >= 4) return 'rgb(255,69,0)'
  if (mag >= 2) return 'rgb(255,165,0)'
  return 'rgb(255,215,0)'
}

function Recenter({ center }) {
  const map = useMap()
  if (center) map.setView(center, 2)
  return null
}

export default function MapView(){
  const { filtered } = useSelector(s => s.earthquakes)
  const features = filtered?.features || []

  const center = useMemo(() => {
    if (features.length) {
      const [lon, lat] = features[0].geometry.coordinates
      return [lat, lon]
    }
    return [20, 0]
  }, [features])

  return (
    <MapContainer
      center={center}
      zoom={2}
      style={{height: '100%', width: '100%'}}
      className="dark:grayscale-[40%] transition"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Recenter center={center} />

      {features.map((f, idx) => {
        const [lon, lat, depth] = f.geometry.coordinates
        const mag = f.properties.mag ?? 0
        const color = magColor(mag)
        const radius = Math.max(4, mag * 3)
        return (
          <CircleMarker
            key={f.id || idx}
            center={[lat, lon]}
            radius={radius}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.6 }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-bold">{f.properties.place}</div>
                <div>Magnitude: {mag}</div>
                <div>Depth: {depth ?? 'n/a'} km</div>
                <div>
                  Time: {f.properties.time ? new Date(f.properties.time).toLocaleString() : 'n/a'}
                </div>
                {f.properties.url && (
                  <a
                    href={f.properties.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    Details
                  </a>
                )}
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}

