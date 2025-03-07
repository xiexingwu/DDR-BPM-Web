import { newPlot } from 'plotly.js-basic-dist-min';
import type { Data, Layout, Config } from 'plotly.js-basic-dist-min';
import { JSX, onMount } from 'solid-js';
import { Chart } from '../js/Song';


type BPMPlotProps = {
  chart: Chart
}

interface XYData {
  x: Array<number>,
  y: Array<number>
}

const ID = "bpm-plot"

const genBpmsData = (chart: Chart): XYData => {
  const bpms = chart.bpms;
  const n = chart.bpms.length;
  let x = bpms.map(b => [b.st, b.ed]).flat()
  let y = bpms.map(b => [b.val, b.val]).flat()

  return { x, y }
}

const genStopsData = (bpms: XYData, chart: Chart): XYData => {
  const n = chart.bpms.length;
  const stops = chart.stops;
  const findBpmAtTime = (time: number): number => {
    const i = bpms.x.findIndex(t => t >= time)!
    return bpms.y[i - 1]
  }

  let x = stops.map(b => b.st)
  let y = stops.map(b => findBpmAtTime(b.st))

  return { x, y }
}

export default function BPMPlot(props: BPMPlotProps): JSX.Element {

  const chart = () => props.chart;

  const genBPMPlot = () => {
    const bpms: Partial<Data> = {
      ...genBpmsData(chart()),
      name: 'BPM',
      mode: 'lines',
      hoverinfo: "skip",
    }

    const stops: Partial<Data> = {
      ...genStopsData(bpms as XYData, chart()),
      text: chart().stops.map(s => s.beats),
      name: 'Stops',
      mode: 'markers',
      hovertemplate:
        `%{text:.2f} beats @${chart().dominant_bpm}BPM`
    }

    const layout: Partial<Layout> = {
      xaxis: {
        title: 'Time (s)',
        range: [0, Math.ceil(Math.max(...bpms.x) / 15) * 15],
        dtick: 15,
        fixedrange: true,
      },
      yaxis: {
        title: 'BPM',
        range: [0, Math.ceil(Math.max(...bpms.y) / 100) * 100],
        dtick: 50,
        fixedrange: true,
      },
      legend: {
        // showlegend: false,
        yanchor: "top",
        xanchor: "left",
        x: 0.01,
        y: 1.2,
        itemclick: "false",
        itemdoubleclick: "false",
        orientation: "h",
      },
      margin: {
        l: 50,
        r: 10,
        b: 40,
        t: 50,
        pad: 5,
        autoexpand: false,
      },
      title: false,
    }

    const config: Config = {
      displayModeBar: false,
      responsive: true,
      scrollZoom: true
    }

    newPlot(ID, [bpms, stops], layout, config)
  }

  // onMount(genBPMPlot)

  return (
    <>
      <span>
        Plot is buggy on mobile: it might not let you scroll around the page when dragging on the plot directly.
        Try dragging around the edges of the screen (or this text) instead.
      </span>
      <div id={ID}>
      </div>
    </>
  )
}

