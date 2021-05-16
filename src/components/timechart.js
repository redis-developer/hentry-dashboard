import * as React from "react"
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
} from "react-timeseries-charts"
import { TimeSeries } from "pondjs"

export const TimeGraph = ({ snapshot, entropy }) => {
  const entropySeries = new TimeSeries({
    name: "entropy",
    columns: ["time", "entropy"],
    points: [
      [1400425947000, 52],
      [1400425948000, 18],
      [1400425949000, 26],
      [1400425950000, 93],
    ],
  })

  console.log(snapshot)
  return (
    <ChartContainer timeRange={entropySeries.timerange()} width={800}>
      <ChartRow height="200">
        <YAxis
          id="axis1"
          label="Units"
          min={0}
          max={100}
          width="60"
          type="linear"
          format="$,.2f"
        />
        <Charts>
          <LineChart axis="x" series={entropySeries} columns="entropy" />
        </Charts>
      </ChartRow>
    </ChartContainer>
  )
}
