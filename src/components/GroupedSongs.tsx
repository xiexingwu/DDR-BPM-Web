import { Accessor, Component, createEffect, For, JSX, lazy, Show, Suspense, SuspenseList } from 'solid-js';
import { Card, Nav, Stack } from 'solid-bootstrap';

import { Fa } from 'solid-fa';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { SortType, useViewModel } from '../js/ViewModel';
import { genSongPath, Song, VersionType } from '../js/Song';
const SongRow = lazy(() => import("./SongRow"))
// import SongRow from "./SongRow"

library.add(faChevronDown, faChevronRight)

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
  const { viewModel } = useViewModel();
  const n = () => props.songGroup.songs.length;
  // const active = () => active

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
      sortVal = VersionType[sortVal];
      break
    case SortType.NAME:
      break
  }

  return (
    
    <Card.Header 
      onClick={props.setActive} 
      class="song-group-header"
    >
      <Stack direction="horizontal">
        <Show
          when={viewModel().searchStr() == ""}
          fallback={
            <span>Searching "{viewModel().searchStr()}": </span>
          }
        >
          <span>{sortBy + sortVal}: </span>
        </Show>
        <span class="n-songs">{n()} songs</span>

        <Fa icon={props.active!() ? faChevronDown : faChevronRight}/>
      </Stack>
    </Card.Header>
  )
}

const GroupedSongsList: Component<GroupedSongsType> = (props) => {
  const songGroup = () => props.songGroup;

  return (
    <SuspenseList revealOrder="forwards" tail="hidden">
      <For
        each={songGroup().songs}
      >{(song, i) =>
        <Suspense fallback={<p>loading...</p>}>
          <Nav.Link href={genSongPath(song)} class="song-link">
            <SongRow song={song} />
          </Nav.Link>
        </Suspense>
        }</For>
    </SuspenseList>
  )
}

export default function GroupedSongs(props: GroupedSongsType): JSX.Element {
  const songGroup = () => props.songGroup;

  return (
    <Stack class='song-group'>
      <GroupedSongsHeader songGroup={songGroup()} active={props.active} setActive={props.setActive} />
      <Show
        when={props.active!()}
      >
        <GroupedSongsList songGroup={songGroup()} />
      </Show>
    </Stack>
  )
}

