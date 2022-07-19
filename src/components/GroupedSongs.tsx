import type { Component, Resource } from 'solid-js';
import type { Song } from './Song';
import { Row, Col } from 'solid-bootstrap';

import { SortType } from './Song';

export type SongGroup = {
  songs: Song[];
  sortBy: SortType;
  sortVal: string;
}


export const GroupedSongs: Component<SongGroup> = (props) => {

  return (
    <></>
  )
}

