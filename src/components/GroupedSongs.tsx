import { Accessor, Component, createEffect, For, lazy, Match, Resource, Setter, Show, Suspense, SuspenseList, Switch } from 'solid-js';
import { Accordion, Nav, Stack } from 'solid-bootstrap';

import { SortType, useViewModel } from '../js/ViewModel';
import { genSongPath, Song } from '../js/Song';
const SongRow = lazy(() => import("./SongRow"))

export type SongGroup = {
  songs: Song[];
  sortVal: string;
}

type GroupedSongsType = {
  songGroup: SongGroup;
  active?: Accessor<boolean>;
  setActive?: () => void;
}

const GroupedSongsHeader: Component<GroupedSongsType> = (props) => {
  const {viewModel} = useViewModel();
  const n = () => props.songGroup.songs.length;

  let sortBy = "";
  let sortVal = props.songGroup.sortVal;
  switch (viewModel().sortBy()) {
    case SortType.NONE:
      sortBy = SortType.NONE;
      break
    case SortType.LEVEL:
      sortBy = SortType.LEVEL + " ";
      break
    case SortType.VERSION:
      break
    case SortType.NAME:
      break
  }

  return (
    <Accordion.Header onClick={props.setActive}>
      <Stack direction="horizontal" class="song-group-header">
        <Show 
          when={viewModel().searchStr() == ""}
          fallback={
            <span>Searching "{viewModel().searchStr()}": </span>
          }
        >
          <span>{sortBy + sortVal}: </span>
        </Show>
        <span class="n-songs">{n()} songs</span>
      </Stack>
    </Accordion.Header>
  )
}

const GroupedSongsList: Component<GroupedSongsType> = (props) => {
  const songs = () => props.songGroup.songs;

  return (
    <SuspenseList revealOrder="forwards" tail="hidden">
      <For
        each={songs()}
      >{(song, i) =>
        <Suspense>
          <Nav.Link href={genSongPath(song)} class="song-link">
            <SongRow song={song} />
          </Nav.Link>
        </Suspense>
        }</For>
    </SuspenseList>
  )
}

export const GroupedSongs: Component<GroupedSongsType> = (props) => {
  const songGroup = () => props.songGroup;
  const active = () => props.active!();
  // createEffect(() => console.log(songGroup().sortVal, "active:", active()))

  return (
    <Stack>
      <GroupedSongsHeader songGroup={songGroup()} setActive={props.setActive}/>

      <Show
        when={active()}
      >
        <GroupedSongsList songGroup={songGroup()} />
      </Show>
    </Stack>
  )
}

