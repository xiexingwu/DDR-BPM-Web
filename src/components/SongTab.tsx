import { createSignal, createEffect, Index, For, Show, Suspense, createRenderEffect } from "solid-js";
import type { Component, JSX } from 'solid-js';
import { Row, Col, Accordion, Form, Nav } from 'solid-bootstrap';

import { SDType, SortType, useViewModel } from "../js/ViewModel";
import { genSongPath, Song } from '../js/Song';

import { SongRow } from './SongRow';
import { GroupedSongs } from './GroupedSongs';
import type { SongGroup } from './GroupedSongs';

import '../css/SongTab.css';
import { TabName } from "../js/Tabs";

type SongTabProps = {
  songs: Song[];
}

const SongTabNav: Component = (props) => {
  // createEffect(() => console.log("sorting by:", sortBy()))
  const { viewModel, setViewModel } = useViewModel();


  return (
    <Row id="song-tab-nav">
      <Col sm={8} md={12}>
        <Row>
          <Col xs={6} md={12} xl={6}>
            <Form.Select
              aria-label="Sort by"
              value={viewModel().sortBy()}
              onChange={e => {
                const target = e?.target as HTMLSelectElement;
                setViewModel().setSortBy(target.value as SortType)
              }}
            >
              <Index each={Object.values(SortType)}>{(sortType, i) =>
                <option value={sortType()}>{sortType()}</option>
              }</Index>
            </Form.Select>
          </Col>

          <Col xs={6} md={12} xl={6}>
            <Form.Select
              aria-label="Single or Double"
              value={viewModel().sdType()}
              onChange={e => {
                const target = e?.target as HTMLSelectElement;
                setViewModel().setSDType(target.value as SDType)
              }}
            >
              <Index each={Object.values(SDType)}>{(sdType, i) =>
                <option value={sdType()}>{sdType()}</option>
              }</Index>
            </Form.Select>
          </Col>
        </Row>
      </Col>

      <Col sm={4} md={12}>
        <Form.Control placeholder="Search" onInput={e => {
          const target = e?.target as HTMLInputElement;
          setViewModel().setSearchStr(target.value)
        }}
        />
      </Col>
    </Row>
  )
}

export default function SongTab(props: SongTabProps): JSX.Element {

  /* View Model */
  const { viewModel, setViewModel } = useViewModel();
  /* Apply viewModel */
  const filterSongs = (songs: Song[]): Song[] => {
    if (!viewModel().searchStr()) { return songs };
    const filteredSongs = songs.filter(song => {
      const strs = [song.name, song.title, song.titletranslit];
      return strs.some(str => str.toLowerCase().includes(viewModel().searchStr().toLowerCase()))
    })
    return filteredSongs
  }

  const groupSongs = (songs: Song[]): SongGroup[] => {
    const by = viewModel().sortBy();
    if (by == SortType.NONE) {
      return [{
        songs: songs,
        sortBy: by,
        sortVal: by
      }]
    }

    const group = (groups: any, song: Song) => {
      if (song) {
        (groups[song[by]] = groups[song[by]] || []).push(song);
        return groups
      }
    }

    const groups: { string: SongGroup } = songs.reduce(group, {})
    let songGroups: SongGroup[] = []
    for (const groupVal in groups) {
      songGroups.push({
        songs: groups[groupVal],
        sortBy: by,
        sortVal: groupVal
      })
    }

    return songGroups
  }

  const songs = () => props.songs;
  const filteredSongs = () => filterSongs(songs());
  const songGroups = () => groupSongs(songs());


  // createEffect(() => console.log(allSongs()))
  // createEffect(() => console.log(`${allSongs()?.length} songs in all_songs.txt`))
  // createEffect(() => console.log('sortBy:', sortBy()))
  // createEffect(() => console.log('songs:', songs()))
  // createEffect(() => console.log('songGroups:', songGroups()))

  // createEffect(() => console.log('tab: ', viewModel().tab()))
  // createRenderEffect(() => setViewModel().setTab(TabName.SONGS))

  return (
    <Row id="song-tab">
      <Col md={3}>
        <SongTabNav/>
      </Col>

      <Col md={9} id="song-tab-list">
        <For 
          each={filteredSongs()} 
          fallback={<span>{viewModel().searchStr() == "" ? "Loading songs..." : "Searching " + viewModel().searchStr()}</span>}
        >{(song, i) =>
          <>
            <Nav.Link href={genSongPath(song)} class="song-link">
              <SongRow song={song} />
            </Nav.Link>
            <hr/>
          </>
        }</For>
      </Col>
    </Row>
  )
}
