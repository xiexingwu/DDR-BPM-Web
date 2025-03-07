import { Show, JSX } from "solid-js";
import type { Component } from 'solid-js';
import { Image, Stack } from 'solid-bootstrap';

import { useViewModel } from "../js/ViewModel";

import { Song, getChart, getChartBPMs, genDifficultyText, DisplayBPM } from '../js/Song';
import { BPMWheel } from './BPMWheel';

import "../css/SongDetail.css";
import BackArrow from "./BackArrow";
import BPMPlot from "./BPMPlot";
import { TabName } from "../js/Tabs";

type SongDetailProps = {
  song: Song
}

const SongDetailHeader: Component<SongDetailProps> = (props) => {
  const song = () => props.song;
  return (
    <Stack direction="horizontal" class="song-detail-header">
      <Image
        class="jacket"
        src={encodeURI(`/jackets/${song().name}.png`)}
        width={80} height={80}
      />

      <Stack class="song-detail-title">
        <span>{song().title}</span>
        <Show when={song().title != song().titletranslit}>
          <span>{song().titletranslit}</span>
        </Show>
      </Stack>

    </Stack>
  )
}

const SongDetailSummary: Component<SongDetailProps> = (props) => {
  const { viewModel } = useViewModel();

  const song = () => props.song;
  return (
    <Stack direction="horizontal" class="song-detail-summary py-2" gap={5}>
      <span class="song-version">{song().version}</span>
      <span class="song-difficulties">{genDifficultyText(song(), viewModel())}</span>
    </Stack>
  )
}

export default function SongDetail(props: SongDetailProps): JSX.Element {
  const { viewModel } = useViewModel();

  const song = () => props.song;
  const chart = () => getChart(song(), viewModel());
  const bpms = () => getChartBPMs(chart());

  console.log(chart(), bpms())

  return (
    <Stack class="song-detail">
      <BackArrow dst={'/' + TabName.SONGS} />
      <SongDetailHeader song={song()} />
      <SongDetailSummary song={song()} />
      <DisplayBPM chart={chart()} />
      <BPMWheel bpms={bpms()} />
      <BPMPlot chart={chart()} />
    </Stack>
  )
}
