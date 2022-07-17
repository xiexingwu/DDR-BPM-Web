import type { Component, Resource } from 'solid-js';
import type { Song } from './Song';
import { Container, Row, Col } from 'solid-bootstrap';


export type SongGroup = {
  songs: Song[];
  sortBy: SortType;
  sortVal: string;
}

export enum SortType {
  NONE = "No sort", 
  NAME = "A-Z", 
  LEVEL = "Level", 
  VERSION = "Version"
}

export const GroupedSongs: Component<SongGroup> = (props) => {

  return (
    <></>
  )
}

