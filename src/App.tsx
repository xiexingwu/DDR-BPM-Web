import { createEffect, createSignal, onMount, Suspense, For } from "solid-js";
import { Navbar, Nav, Tab, Container } from "solid-bootstrap"

import { fetchSong } from './js/Song';
import type { Song } from './js/Song'; 
import { BPMTab } from "./js/BPMTab";
import { SongTab } from "./js/SongTab";

export const [songs, setSongs] = createSignal<Song[]>([]);

const fetchAllSongs = async () =>
  (await fetch("/src/assets/all_songs.txt")).text().then(txt =>
    txt.split('\n').sort()
  )

async function loadSongs() {
  const allSongs = await fetchAllSongs();
  let songs: Song[] = [];
  console.log("allSongs", allSongs);
  allSongs.forEach(async (name) => songs.push(await fetchSong(name)));
  setSongs(songs)
  console.log("loaded songs:", songs);
}

enum TabName {
  BPM = "BPM",
  SONGS = "Songs"
}

function App() {

  /* Load songs */
  onMount(loadSongs);

  /* Setup Tabs */
  const [tabKey, setTabKey] = createSignal(TabName.BPM);
  // createEffect(() => console.log("tabKey is", tabKey()))

  const bpmPane = {
    name: TabName.BPM,
    component: <BPMTab />
  };
  const songPane = {
    name: TabName.SONGS,
    component: <SongTab songs={songs()}/>
  };
  const tabs = [
    bpmPane, songPane
  ];

  /* Main app */
  return (<Container fluid="lg">
    <Tab.Container activeKey={tabKey()}>
      <Navbar sticky="top" bg="light" expand>
        {/* <Container> */}
          <Navbar.Brand>
            <img alt="DDR BPM Logo" src="/src/assets/favicon/apple-touch-icon.png" width={48} height={48} />
          </Navbar.Brand>
        {/* </Container> */}

        {/* <Container> */}
          <Navbar.Toggle aria-controls="root-navbar" />
        {/* </Container> */}

        {/* <Container> */}
          <Navbar.Collapse id="root-navbar">
            <Nav class="me-auto" onSelect={(k: TabName) => setTabKey(k)}>
              <For each={tabs}>{(tab, i) =>
                <Nav.Link eventKey={tab.name}>
                  {tab.name}
                </Nav.Link>
              }</For>
            </Nav>
          </Navbar.Collapse>
        {/* </Container> */}

      </Navbar>

      {/* <Container> */}
        <Suspense fallback={<div>Loading...</div>}>

          <Tab.Content>
            <For each={tabs}>{(tab, i) =>
              <Tab.Pane eventKey={tab.name} title={tab.name}>
                  {tab.component}
              </Tab.Pane>
            }</For>
          </Tab.Content>

        </Suspense>
      {/* </Container> */}

    </Tab.Container>

  </Container>)

}

export default App;