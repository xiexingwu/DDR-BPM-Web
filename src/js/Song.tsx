import { Component, For, Index, JSX, Show } from 'solid-js';
import { DiffType, SDType, ViewModel } from './ViewModel';

import "../css/Song.css"
import { Stack } from 'solid-bootstrap';



export const fetchSong = async (songName: string): Promise<any> => {
  const url = encodeURI(`/data/${songName}.json`);
  return await (await fetch(url)).json()
    .catch(err => {
      console.error(`Failed to fetch ${url}`)
      return { ...emptySong, name: songName, title: songName }
    });
}

export const genSongVers = (song: Song): string => {
  return VersionType[song.version].replace(/DDR\s?/, "");
}

export const genSongPath = (song: Song): string => {
  return 'song/' + song.name
}

export const genDifficultyText = (song: Song, viewModel: ViewModel, diff?: DiffType): JSX.Element => {
  const levels = viewModel.sdType() == SDType.SINGLE ? song.levels.single! : song.levels.double!;
  let spans: Component[];
  if (diff) {
    spans = [
      (props) => <span class={diff}>{levels[diff]}</span>
    ]
  } else {
    spans = Object.entries(levels).map(([diff, level], i) => (
      (props) => <span class={diff}>{level}</span>
    ))
  }
  return (
    <div class="diff-text">
      <Index each={spans}>{(span, i) =>
        <>
          {span()}
          <Show when={i < spans.length - 1}>
            <span> . </span>
          </Show>
        </>
      }</Index>
    </div>
  )
}

export const getChart = (song: Song, viewModel: ViewModel): Chart => {
  return song.chart[0]
}

function getChartMinDomMaxBPM(chart: Chart): number[] {
  return chart.bpm_range.split("~").filter(s => s != "").map(s => Number(s))
}

export const getChartBPMs = (chart: Chart): number[] => {
  let bpms = getChartMinDomMaxBPM(chart);

  if (bpms.length == 1) {
    const bpm = bpms[0]
    return [bpm, bpm, bpm]
  }

  return bpms;
}

export function DisplayBPM(props:{chart: Chart}): JSX.Element {
  const chart = props.chart
  return (
    <Stack direction="horizontal" class="display-bpm">
      <span>BPM: </span>
      {chart.bpm_range}
    </Stack>
  )
}

export enum VersionType {
  world = "DDR World" as any,
  a3 = "DDR A3" as any,
  a20p = "DDR A20 PLUS" as any,
  a20 = "DDR A20" as any,
  a = "DDR A" as any,
  ddr14 = "DDR 2014" as any,
  ddr13 = "DDR 2013" as any,
  x3 = "DDR X3" as any,
  x2 = "DDR X2" as any,
  x = "DDR X" as any,
  supernova2 = "DDR SuperNOVA2" as any,
  supernova = "DDR SuperNOVA" as any,
  extreme = "DDR EXTREME" as any,
  max2 = "DDR MAX2" as any,
  max = "DDR MAX" as any,
  fifth = "DDR 5th" as any,
  fourth = "DDR 4th" as any,
  third = "DDR 3rd" as any,
  second = "DDR 2nd" as any,
  first = "DDR" as any,
  unknown = "Unknown" as any,
}

const emptySong: Song = {
  name: "",
  version: VersionType.unknown,
  ssc: false,
  title: "",
  titletranslit: "",
  song_length: 0,
  per_chart: false,
  levels: {
    single: { beginner: 0 },
    double: { beginner: 0 }
  },
  chart: [
    {
      dominant_bpm: 0,
      true_min: 0,
      true_max: 0,
      bpm_range: "0",
      bpms: [{ st: 0, ed: 0, val: 0 }],
      stops: []
    }
  ]
};

export type Song = {
  name: string;
  version: VersionType;
  ssc: boolean;
  title: string;
  titletranslit: string;
  song_length: number;
  per_chart: boolean;
  levels: {
    single?: Level;
    double?: Level;
  };
  chart: Array<Chart>
};

type Level = {
  beginner?: number;
  easy?: number;
  medium?: number;
  hard?: number;
  challenge?: number;
}

export type Chart = {
  dominant_bpm: number;
  true_min: number;
  true_max: number;
  bpm_range: string;
  bpms: Array<{
    st: number;
    ed: number;
    val: number;
  }>;
  stops: Array<{
    st: number;
    dur: number;
    beats: number;
  }>
}
