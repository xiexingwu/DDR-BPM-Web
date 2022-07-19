import { lazy, createEffect, createSignal, onMount, For } from "solid-js";
import { Navbar, Nav, Tab, Container, NavDropdown } from "solid-bootstrap";
import { Routes, Route } from "solid-app-router";
import Fa from "solid-fa";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faAppStoreIos } from "@fortawesome/free-brands-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
library.add(faGear)
library.add(faAppStoreIos)

import { useViewModel } from "./js/ViewModel";

import { fetchSong, genSongPath } from './js/Song';
import type { Song } from './js/Song';
import { TabName } from "./js/Tabs";

// const BPMTab = lazy(() => import("./js/BPMTab"));
// const SongTab = lazy(() => import("./js/SongTab"));
import BPMTab from "./components/BPMTab";
import SongTab from "./components/SongTab";
import SettingsTab from "./components/SettingsTab";
import SongDetail from "./components/SongDetail";


export const [songs, setSongs] = createSignal<Song[]>([]);

const fetchAllSongs = async () =>
  (await fetch("/all_songs.txt")).text().then(txt =>
    txt.split('\n').sort()
  )

async function loadSongs() {
  const allSongs = await fetchAllSongs();
  // console.log("allSongs", allSongs);
  const fetchSongs = allSongs.map(fetchSong);
  let songs = await Promise.all(fetchSongs)
  setSongs(songs)
  // console.log("loaded songs:", songs);
}

// Main
function App() {

  /* Load songs */
  onMount(loadSongs);

  const { viewModel, setViewModel } = useViewModel();

  /* Setup Panes */
  const bpmPane = () => ({
    name: TabName.BPM,
    route: TabName.BPM,
    component: <BPMTab />
  });

  const songPane = () => ({
    name: TabName.SONGS,
    route: TabName.SONGS,
    component: <SongTab songs={songs()} />
  });

  const settingsPane = () => ({
    name: TabName.SETTINGS,
    route: TabName.SETTINGS,
    component: <SettingsTab/>
  })

  const tabs = () => [
    bpmPane(), songPane()
  ];


  /* Main app */
  return (<Container fluid="lg">
    <Tab.Container activeKey={viewModel().tab()}>
      <Navbar sticky="top" bg="light" expand>

        <Navbar.Brand href="/">
          <img alt="DDR BPM Logo" src="/favicon/apple-touch-icon.png" width={48} height={48} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="root-navbar"/>

        <Navbar.Collapse id="root-navbar">
          <Nav onSelect={(k: TabName) => setViewModel().setTab(k)} style="width:100%">
            {/* Tabs */}
            <For each={tabs()}>{(tab, i) =>
              <Nav.Link href={`/${tab.name}`}>
                {tab.name}
              </Nav.Link>
            }</For>

            {/* Dropdown menu */}
            <NavDropdown
              align={ {md: 'start'} }
              title={<Fa icon={faGear} />}
              class="ms-auto"
            >
              <Nav.Link href={settingsPane().route}>
                {settingsPane().name}
              </Nav.Link>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="https://apps.apple.com/au/app/ddr-bpm/id1628838191">
                <>
                  <span class="me-1">iOS App</span>
                  <Fa icon={faAppStoreIos} />
                </>
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.paypal.com/donate/?hosted_button_id=2R64RY6ZL52EW">
                Donate
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Navbar>

      <Tab.Content id="tab-content">
        {/* Tabs */}
        <Routes>
          <Route path="/" element={bpmPane().component} />

          <For each={tabs()}>{(tab, i) =>
            <Route path={tab.route as string} element={tab.component} />
          }</For>

          <Route path={settingsPane().route} element={settingsPane().component} />
        </Routes>

        {/* Songs */}
        <Routes>
          <For each={songs()}>{(song, i) =>
            <Route path={genSongPath(song)} element={<SongDetail song={song} />} />
          }</For>
        </Routes>
      </Tab.Content>

    </Tab.Container>
  </Container>)
}

export default App;