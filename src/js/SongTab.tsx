import { createSignal, createEffect, Index, For, Show } from "solid-js";
import type { Component } from 'solid-js';
import { Row, Col, Accordion, Form } from 'solid-bootstrap';
import { Song, SDType } from './Song';

import { SongRow } from './SongRow';
import { SortType, GroupedSongs } from './GroupedSongs';
import type { SongGroup } from './GroupedSongs';

type SongTabProps = {
  songs: Song[];
}
type SongTabNavProps = {
  // value: Accessor<string>;
  // setter: Setter<string>;
}

/* Create view model for search/filtering songs */
const [sortBy, setSortBy] = createSignal(SortType.VERSION);
const [sdType, setSDType] = createSignal(SDType.SINGLE);
const [searchStr, setSearchStr] = createSignal("");
const songVM = () => ({
  sortBy: sortBy(),
  searchStr: searchStr(),
  sdType: sdType(),
})


/* Apply viewModel */
const filterSongs = (songs: Song[], viewModel = songVM()): Song[] => {
  if (!viewModel.searchStr) { return songs };
  const filteredSongs = songs.filter(song => {
    const strs = [song.name, song.title, song.titletranslit];
    return strs.some(str => str.toLowerCase().includes(viewModel.searchStr.toLowerCase()))
  })
  return filteredSongs
}

const groupSongs = (songs: Song[], viewModel = songVM()): SongGroup[] => {
  const by = viewModel.sortBy;
  if (by == SortType.NONE) {
    return [{
      songs: songs,
      sortBy: by,
      sortVal: by
    }]
  }

  const group = (groups: any, song: Song) => {
    if (song){
      (groups[song[by]] = groups[song[by]] || []).push(song);
      return groups
    }
  }

  const groups: {string: SongGroup} = songs.reduce(group, {})
  let songGroups: SongGroup[] = []
  for (const groupVal in groups){
    songGroups.push({
      songs: groups[groupVal],
      sortBy: by,
      sortVal: groupVal
    })
  }

  return songGroups
}

const SongTabNav: Component<SongTabNavProps> = (props) => {
  createEffect(() => console.log("sorting by:", sortBy()))

  return (
    <Row>
      <Col sm={6} md={12}>
        <Row>
          <Col sm={6} md={12} xl={6}>
            <Form.Select 
              aria-label="Sort by" 
              onChange={e => {
                const target = e?.target as HTMLSelectElement;
                setSortBy(target.value as SortType)
              }}
            >
              <Index each={Object.values(SortType)}>{(sortType, i) =>
                <option value={sortType()}>{sortType()}</option>
              }</Index>
            </Form.Select>
          </Col>
          
          <Col sm={6} md={12} xl={6}>
            <Form.Select 
              aria-label="Single or Double"
              onChange={e => {
                const target = e?.target as HTMLSelectElement;
                setSDType(target.value as SDType)
              }}
            >
              <Index each={Object.values(SDType)}>{(sdType, i) =>
                <option value={sdType()}>{sdType()}</option>
              }</Index>
            </Form.Select>
          </Col>
        </Row>
      </Col>

      <Col sm={6} md={12}>
      <Form.Control placeholder="Search" onInput={e => {
        const target = e?.target as HTMLInputElement;
        setSearchStr(target.value)
      }} 
      />
      </Col>
    </Row>
  )
}

export const SongTab: Component<SongTabProps> = (props) => {

  const songs = () => props.songs;
  const filteredSongs = () => filterSongs(songs());
  const songGroups = () => groupSongs(songs());

  // createEffect(() => console.log(allSongs()))
  // createEffect(() => console.log(`${allSongs()?.length} songs in all_songs.txt`))
  // createEffect(() => console.log('sortBy:', sortBy()))
  // createEffect(() => console.log('songs:', songs()))
  // createEffect(() => console.log('songGroups:', songGroups()))

  return (
    <>
    {/* <Container class="tab" id="SongTab"> */}
      <Row>
        <Col md={3}>
          <SongTabNav/>
        </Col>

        <Col md={9}>
          <div>
            <Show
              when={filteredSongs()}
              fallback={<p>Loading songs...</p>}
            >
              <For each={filteredSongs()}>{(song, i) => 
                  <SongRow song={song} />
              }</For>
            </Show>
          </div>
        </Col>
      </Row>
    {/* </Container> */}
    </>
  )
}