import axios from 'axios'

// Load runtime config (from public/config.json)
export async function loadConfig() {
  const resp = await axios.get('/config.json')
  return resp.data
}

// Fetch either local mock or remote USGS GeoJSON
export async function fetchEarthquakes(config) {
  const url = config?.USE_LOCAL_MOCK ? (config.LOCAL_MOCK_PATH || '/data/mock_earthquakes.json') : (config.USGS_ENDPOINT)
  // If url looks relative, axios will use current origin (works for public/ files)
  const resp = await axios.get(url)
  return resp.data
}
