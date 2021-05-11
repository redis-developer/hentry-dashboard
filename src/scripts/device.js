import axios from "axios"
import { server } from "./config"

const getDeviceTimeSeriesById = async id => {
    // http://localhost:8000/timeseries/8e62cc02ec0e46e991b3d67f73aadd81
  const result = await axios.get(`${server.api}/timeseries/${id}/now`)
  const { data } = await result
  return data.payload
}

export { getDeviceTimeSeriesById }
