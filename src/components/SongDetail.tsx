import { sanitiseURL } from "../js/util";
import { createEffect, Show, JSX } from "solid-js";
import type { Component } from 'solid-js';
import { Nav, Row, Col, Image, Stack } from 'solid-bootstrap';

import { useViewModel } from "../js/ViewModel";

import { Song, getChart, genChartBPMs, genDifficultyText, genChartDisplayBPM } from '../js/Song';
import { BPMWheel } from './BPMWheel';

import "../css/SongDetail.css";
import BackArrow from "./BackArrow";
import BPMPlot from "./BPMPlot";

type SongDetailProps = {
  song: Song
}

const SongDetailHeader: Component<SongDetailProps> = (props) => {
  const song = () => props.song;
  return (
      <Stack direction="horizontal" class="song-detail-header">
        <Image
          class="jacket"
          src={sanitiseURL(`/jackets/${song().name}-jacket.png`)}
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
  const chart = () => getChart(song(), viewModel());
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
  const bpms = () => genChartBPMs(chart());

  // createEffect(() => console.log('sortBy:', sortBy()))
  // createEffect(() => console.log('songs:', songs()))
  // createEffect(() => console.log('songGroups:', songGroups()))

  return (
    <Stack class="song-detail">
      <BackArrow/>
      <SongDetailHeader song={song()}/>
      <SongDetailSummary song={song()}/>
      {genChartDisplayBPM(chart())}
      <BPMWheel bpms={bpms()} />
      <BPMPlot chart={chart()} />
    </Stack>
  )
}