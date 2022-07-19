// import { createSignal, createEffect, createResource, createContext, useContext, For, Show } from "solid-js";
import type { Component } from 'solid-js';
import { Image, Stack } from 'solid-bootstrap';
import { Route } from "solid-app-router";

import { useViewModel } from '../js/ViewModel';

import { getChart, genDifficultyText, Song, genSongVers } from '../js/Song';
import { sanitiseURL } from '../js/util';


type SongRowProps = {
  song: Song;
}

export const SongRow: Component<SongRowProps> = (props) => {

  const { viewModel, setViewModel } = useViewModel();

  const song = () => props.song;
  const chart = () => getChart(song(), viewModel());

  return (
      <Stack direction="horizontal" class="song-row">
        <Image
          class="jacket"
          src={sanitiseURL(`/jackets/${song().name}-jacket.png`)}
          width={64} height={64}
        />

        <Stack class="song-row-main">
          <span>{song().title}</span>
          <span>{genDifficultyText(song(), viewModel())}</span>
        </Stack>

        <Stack class="song-row-secondary">
          <span>{genSongVers(song())}</span>
          <span>{chart().bpm_range}</span>
        </Stack>

      </Stack>
  )
}
