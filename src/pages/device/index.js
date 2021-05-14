import * as React from "react"
import { useState, useEffect } from "react"
import { useQueryParam, StringParam } from "use-query-params"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { getDeviceTimeSeriesById } from "../../scripts/device"

/** load used components */
import { Graph } from "../../components/chart"
import { TimeGraph } from "../../components/timechart"
/**
 * DeviceAnalysis Page
 *
 * Loads device details from various apis and shows a graphical representation of data
 */
const DeviceAnalysis = data => {
  /** load team id from page id */
  const [deviceID] = useQueryParam("id", StringParam)
  const [deviceDetails, setDeviceDetails] = useState({})
  const [currentMode, setCurrentMode] = useState("snapshot")

  /** store time series data into these variables */
  const [entropy, setEntropy] = useState([])
  const [snapshot, setSnapshot] = useState([])

  /** load time series data about  */
  useEffect(() => {
    /** load device snapshot */
    getDeviceTimeSeriesById("snapshot", deviceID)
      .then(data => {
        setSnapshot(data)
      })
      .catch(error => {
        alert("Error fetching snapshot data" + error)
      })

    /** load device entropy */
    getDeviceTimeSeriesById("entropy", deviceID)
      .then(data => {
        setEntropy(data)
      })
      .catch(error => {
        alert("Error fetching snapshot data" + error)
      })
  }, [])

  const styles = {
    active:
      "flex items-center px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg    2hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2",
    inactive:
      "flex items-center px-6 py-2 font-semibold text-black transition duration-500 ease-in-out transform border hover:border-black rounded-lg    2hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2",
  }

  return (
    <div>
      <Layout>
        <Seo title={`Analysis of {Device Name}`} />
        <div className="flex items-start w-full mt-6 lg:mx-auto lg:justify-center lg:w-1/2">
          <div className="mr-2">
            <button
              className={
                currentMode === "snapshot" ? styles.active : styles.inactive
              }
              onClick={() => {
                setCurrentMode("snapshot")
              }}
            >
              View Snapshot
            </button>
          </div>
          <div className="ml-2">
            <button
              className={
                currentMode === "entropy" ? styles.active : styles.inactive
              }
              onClick={() => {
                setCurrentMode("entropy")
              }}
            >
              View Entropy
            </button>
          </div>
        </div>
        {/* <TimeGraph snapshot={snapshot} entropy={entropy} /> */}
      </Layout>
      <div className="m-4">
        <Graph yAxisTitle="Lines of Code" data={snapshot} />
      </div>
      <div className="m-4">
        {/* <Graphs yAxisTitle="Entropy (changes)" data={entropy} /> */}
      </div>
    </div>
  )
}

export default DeviceAnalysis
