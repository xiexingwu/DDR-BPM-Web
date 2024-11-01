import { createSignal, createEffect, Index, For, lazy } from "solid-js";
import type { Component, JSX } from 'solid-js';
import { Row, Col, Form, Accordion, Stack } from 'solid-bootstrap';

import { SDType, SortType, useViewModel } from "../js/ViewModel";
import { Song, VersionType } from '../js/Song';

const GroupedSongs = lazy(() => import("./GroupedSongs"))
// import GroupedSongs from './GroupedSongs';
import type { SongGroup } from './GroupedSongs';

import '../css/SongTab.css';




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

const SongTabList: Component = (props) => {
  const { viewModel, setViewModel } = useViewModel();
  const songs = () => viewModel().songs();

  const filterSongs = (songs: Song[]): Song[] => {
    if (!viewModel().searchStr()) { setViewModel().setActiveGroup(-1); return songs };
    const filteredSongs = songs.filter(song => {
      const strs = [song.name, song.title, song.titletranslit];
      return strs.some(str => str.toLowerCase().includes(viewModel().searchStr().toLowerCase()))
    })
    setViewModel().setActiveGroup(0);
    return filteredSongs
  }

  const groupSongs = (songs: Song[]): SongGroup[] => {
    const by = viewModel().sortBy();
    if (viewModel().searchStr() != "" || by == SortType.NONE) { 
      return [{
        songs: songs,
        sortVal: "",
      }]
    };

    let groups: Record<string, Song[] > = {}

    const groupByName = (song: Song) => {
      const alpha = song.titletranslit[0].toUpperCase();
      const alphaGroup = alpha >= "A" ? alpha : "#";
      (groups[alphaGroup] = groups[alphaGroup] || []).push(song);
    }
    const groupByLevel = (song: Song) => {
      const levels = viewModel().sdType() == SDType.SINGLE ? song.levels.single : song.levels.double;
      if (!levels) return;

      for (const diff in levels!){
        const level = levels[diff]
        if (level) (groups[level] = groups[level] || []).push(song);
      }
    }
    const groupByVersion = (song: Song) => {
      (groups[song.version] = groups[song.version] || []).push(song);
    }

    let group: (song: Song) => void;
    let sortGroup: (a: string, b: string) => number;
    switch (by) {
      case SortType.LEVEL:
        group = groupByLevel;
        sortGroup = (a, b) => Number(b) - Number(a) ;
        break;
      case SortType.NAME:
        group = groupByName;
        sortGroup = (a,b) => a < b ? -1 : 1
        break;
      case SortType.VERSION:
        group = groupByVersion;
        sortGroup = (a, b) => {
          const A = Object.keys(VersionType).indexOf(a);
          const B = Object.keys(VersionType).indexOf(b);
          // console.log(A, a, B, b);
          return A-B;
        };
        break;
    }


    songs.forEach(song => group(song))
    // console.log("groups", groups)
    const songGroups: SongGroup[] = Object.keys(groups)
    .sort(sortGroup)
    .map((key) => ({
      songs: groups[key],
      sortVal: key,
    }))

    return songGroups
  }

  const filteredSongs = () => filterSongs(songs());
  const songGroups = () => groupSongs(filteredSongs());

  const setActiveGroup = (i: number): (() => void) => {
    return () => {
      const previous = viewModel().activeGroup();
      const headers = document.querySelectorAll('.song-group-header')
      const closePrevious = () => {
        const previousHeader = headers[previous]//.children[0]
        previousHeader.classList.remove('position-sticky')
      }
      const openNew = () => {
        const newHeader = headers[i]//.children[0]
        newHeader.classList.add('position-sticky')
      }

      switch (previous) {
        case i:
          setViewModel().setActiveGroup(-1);
          closePrevious();
          break;
        default:
          closePrevious();
        case -1:
          setViewModel().setActiveGroup(i);
          openNew()
          // break;
      }
    }
  }

  return (
    <Stack id="song-tab-list">
      <For each={songGroups()}>{(songGroup, i) => 
        <>
          <GroupedSongs
            songGroup={songGroup}
            active={() => viewModel().activeGroup() == i()}
            setActive={setActiveGroup(i())}
          />
          <hr/>
        </>
      }</For>
    </Stack>
  )
}

export default function SongTab(props): JSX.Element {

  /* View Model */
  
  return (
    <Row id="song-tab">
      <Col md={3}>
        <SongTabNav/>
      </Col>

      <Col md={9}>
          <SongTabList />
      </Col>
    </Row>
  )
}
