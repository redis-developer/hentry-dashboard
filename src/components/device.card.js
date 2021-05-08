import * as React from "react"
import { Link } from "gatsby"
export const DeviceCard = ({ data }) => {
  const {
    frequency,
    friendlyName,
    machineID,
    operatingSystem,
    timestamp,
  } = data

  return (
    <div className="px-2 py-2 m-2 lg:w-1/5 md:w-1/5 cursor-pointer border rounded transition duration-100 border-gray-200 hover:border-gray-500 hover:shadow-2xl">
      <img
        className="object-center object-scale-down w-full mb-6 rounded"
        src={`os/${operatingSystem}.png`}
        alt="content"
      />
      <h2 className="mb-3 text-md font-semibold text-gray-700  title-font">
        {friendlyName}
      </h2>
      <p className="mb-4 text-base leading-relaxed"></p>
    </div>
  )
}
