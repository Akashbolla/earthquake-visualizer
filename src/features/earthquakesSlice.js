import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loadConfig, fetchEarthquakes } from '../api/earthquakeService'

export const initConfigAndData = createAsyncThunk(
  'earthquakes/init',
  async (_, thunkAPI) => {
    try {
      const config = await loadConfig()
      const data = await fetchEarthquakes(config)
      return { config, data }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || String(err))
    }
  }
)

export const refreshData = createAsyncThunk(
  'earthquakes/refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState().earthquakes
      const cfg = state.config || await loadConfig()
      const data = await fetchEarthquakes(cfg)
      return { data }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || String(err))
    }
  }
)

function filterByMag(geojson, minMag, maxMag) {
  if (!geojson || !geojson.features) return geojson
  const features = geojson.features.filter(f => {
    const m = f.properties && f.properties.mag
    return (typeof m === 'number') && m >= minMag && m <= maxMag
  })
  return { ...geojson, features }
}

const slice = createSlice({
  name: 'earthquakes',
  initialState: {
    status: 'idle', // idle | loading | succeeded | failed
    config: null,
    geojson: null,
    filtered: null,
    error: null,
    ui: { minMag: 0, maxMag: 10 }
  },
  reducers: {
    setMagnitudeRange(state, action) {
      state.ui.minMag = action.payload.min
      state.ui.maxMag = action.payload.max
      if (state.geojson) {
        state.filtered = filterByMag(state.geojson, state.ui.minMag, state.ui.maxMag)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initConfigAndData.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(initConfigAndData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.config = action.payload.config
        state.geojson = action.payload.data
        state.filtered = filterByMag(state.geojson, state.ui.minMag, state.ui.maxMag)
      })
      .addCase(initConfigAndData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
      .addCase(refreshData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(refreshData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.geojson = action.payload.data
        state.filtered = filterByMag(state.geojson, state.ui.minMag, state.ui.maxMag)
      })
      .addCase(refreshData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
  }
})

export const { setMagnitudeRange } = slice.actions
export default slice.reducer
