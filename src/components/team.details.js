import * as React from "react"
import { useEffect, useState } from "react"

/** load dependent components */
import { DeviceCard } from "./device.card"

/** load network scripts */
import { getTeamDetailsById } from "../scripts/team"

export const TeamDetailsCard = ({ id }) => {
  /** store basic information about team in teamDetails with place holders */
  const [teamDetails, setTeamDetails] = useState({
    friendlyName: "friendlyName",
    id: "id",
  })

  /** store each device details in devices array */
  const [devices, setDevices] = useState([])

  /** make a network call to fetch teamDetails */
  useEffect(() => {
    getTeamDetailsById(id).then(details => {
      setTeamDetails({ friendlyName: details.friendlyName, id: details.id })
      setDevices(details.devices)
    })
  }, [])
  return (
    <div className="pt-12">
      <h1 className="mb-6 text-3xl font-semibold tracking-tighter text-black sm:text-4xl ">
        {teamDetails.friendlyName}
      </h1>
      <section className="text-gray-700">
        <div className="container px-2">
          <div className="flex flex-wrap text-center items-center flex-grow justify-center ">
            {devices.map(device => (
              <DeviceCard data={device} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
