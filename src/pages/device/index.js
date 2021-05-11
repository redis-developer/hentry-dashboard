import * as React from "react"
import { useState, useEffect } from "react"
import { useQueryParam, StringParam } from "use-query-params"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import {getDeviceTimeSeriesById} from "../../scripts/device"

/** load used components */
import { Graphs } from "../../components/chart"
/**
 * DeviceAnalysis Page
 *
 * Loads device details from various apis and shows a graphical representation of data
 */
const DeviceAnalysis = data => {
  /** load team id from page id */
  const [deviceID] = useQueryParam("id", StringParam)
  const [deviceDetails, setDeviceDetails] = useState({})
  const [timeSeries, setTimeSeries] = useState([])

  useEffect(()=>{
    getDeviceTimeSeriesById(deviceID).then((data)=>{
        setTimeSeries(data)
    }).catch((error)=>{
        alert("Error fetching timeseries" + error)

    })
  },[])

  return (
    <Layout>
      <Seo title={`Analysis of`} />
      <div>
        <Graphs data={timeSeries} />
      </div>
    </Layout>
  )
}

export default DeviceAnalysis
