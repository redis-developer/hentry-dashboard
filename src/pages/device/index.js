import * as React from "react"
import { useState, useEffect } from "react"
import { useQueryParam, StringParam } from "use-query-params"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import {
  getDeviceTimeSeriesById,
  pollDeviceTimeSeriesUpdatesById,
} from "../../scripts/device"

/** load used components */
import { Graph } from "../../components/chart"
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

  let lastEntropyTimeStamp = 0
  let lastSnapShotTimeStamp = 0

  /** load time series data about  */
  useEffect(() => {
    /** load device snapshot */
    getDeviceTimeSeriesById("snapshot", deviceID)
      .then(data => {
        const processedData = []
        for (let i = 0; i < data.length; i++) {
          processedData.push({
            x: parseInt(data[i][0]),
            y: parseInt(data[i][1]),
          })
          lastSnapShotTimeStamp = data[i][0]
        }
        setSnapshot(processedData)
      })
      .catch(error => {
        alert("Error fetching snapshot data" + error)
      })

    /** load device entropy */
    getDeviceTimeSeriesById("entropy", deviceID)
      .then(data => {
        const processedData = []
        for (let i = 0; i < data.length; i++) {
          processedData.push({
            x: parseInt(data[i][0]),
            y: parseInt(data[i][1]),
          })
          lastEntropyTimeStamp = data[i][0]
        }
        setEntropy(processedData)
      })
      .catch(error => {
        alert("Error fetching snapshot data" + error)
      })
  }, [])

  /** polling service to automatically update graph every 10 seconds */
  setInterval(() => {
    if (lastEntropyTimeStamp === 0) {
      return
    }

    pollDeviceTimeSeriesUpdatesById(
      "snapshot",
      deviceID,
      lastSnapShotTimeStamp
    ).then(data => {
      const processedData = []
      for (let i = 0; i < data.length; i++) {
        processedData.push({
          x: parseInt(data[i][0]),
          y: parseInt(data[i][1]),
        })
        lastSnapShotTimeStamp = data[i][0]
      }
      setSnapshot(oldSnapshots => [...oldSnapshots, ...processedData])
    })

    pollDeviceTimeSeriesUpdatesById(
      "entropy",
      deviceID,
      lastEntropyTimeStamp
    ).then(data => {
      const processedData = []
      for (let i = 0; i < data.length; i++) {
        processedData.push({
          x: parseInt(data[i][0]),
          y: parseInt(data[i][1]),
        })
        lastEntropyTimeStamp = data[i][0]
      }
      setEntropy(oldEntropy => [...oldEntropy, ...processedData])
    })

    console.log("ticker")
  }, 1 * 1000)

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
        <Graph
          yAxisTitle="Lines of Code"
          data={currentMode === "snapshot" ? snapshot : entropy}
        />
      </div>
      <div className="m-4">
        {/* <Graphs yAxisTitle="Entropy (changes)" data={entropy} /> */}
      </div>
    </div>
  )
}

export default DeviceAnalysis
