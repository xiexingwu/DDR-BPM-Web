// import { createSignal, createEffect, createResource, createContext, useContext, For, Show } from "solid-js";
import { createResource, JSX, lazy } from 'solid-js';
import { Stack } from 'solid-bootstrap';

import { useViewModel } from '../js/ViewModel';

import { getChart, genDifficultyText, Song, genSongVers } from '../js/Song';

const Jacket = lazy(() => import('./Jacket'));


type SongRowProps = {
  song: Song;
}

export default function SongRow(props: SongRowProps): JSX.Element {

  const { viewModel, setViewModel } = useViewModel();

  const song = () => props.song;
  const chart = () => getChart(song(), viewModel());

  return (
    <Stack>
      <Stack direction="horizontal" class="song-row">
        <Jacket songName={song().name}/>


        <Stack class="song-row-main">
          <span>{song().title}</span>
          <span>{genDifficultyText(song(), viewModel())}</span>
        </Stack>

        <Stack class="song-row-secondary">
          <span>{genSongVers(song())}</span>
          <span>{chart().bpm_range}</span>
        </Stack>

        <hr />
      </Stack>
      <hr />
    </Stack>

  )
}
