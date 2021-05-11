import * as React from "react"

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries
  } from "react-vis"

import "react-vis/dist/style.css";

const MSEC_DAILY = 86400000;
export const Graphs = ({ data }) => {
    const timestamp = new Date('September 9 2017').getTime()
  const processedData = data.map((entry)=>({x:entry[0],y:entry[1]}))

  return (  <XYPlot xType="time" width={800} height={600}>
  <HorizontalGridLines />
  <VerticalGridLines />
  <XAxis title="X Axis" />
  <YAxis title="Y Axis" />
  <LineSeries
    data={processedData}
  />
  <LineSeries data={null} />
  <LineSeries
    data={[
      {x: timestamp + MSEC_DAILY, y: 10},
      {x: timestamp + MSEC_DAILY * 2, y: 4},
      {x: timestamp + MSEC_DAILY * 3, y: 2},
      {x: timestamp + MSEC_DAILY * 4, y: 15}
    ]}
  />
</XYPlot>
  
  )
}
