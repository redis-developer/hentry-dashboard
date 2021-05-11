import axios from "axios"
import { server } from "./config"

const getTeamDetailsById = async id => {
  const result = await axios.get(`${server.api}/team/${id}`)
  const { data } = await result
  return data.payload
}

export { getTeamDetailsById }
