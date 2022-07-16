import { Navbar, Nav, Tab, Container } from "solid-bootstrap"

import { createEffect, createSignal, Suspense } from "solid-js";
import { BPMTab } from "./js/BPMTab";
import { SongTab } from "./js/SongTab";

export const navTabId = (name) => ("nav-" + name + "-tab");
export const navTabContentId = (name) => ("nav-" + name);

const tabNames = {
  bpm: "BPM",
  songs : "Songs"
};


function App() {

  const [tabKey, setTabKey] = createSignal(tabNames.bpm);
  // createEffect(() => console.log("tabKey is", tabKey()))

  const bpmPane = {
    name: tabNames.bpm,
    component: <BPMTab />
  };
  const songPane = {
    name: tabNames.songs,
    component: <SongTab />
  };
  const tabs = [
    bpmPane, songPane
  ];

  return (<>
    <Tab.Container activeKey={tabKey()}>
      <Navbar sticky="top" bg="light" expand>
        <Container>
          <Navbar.Brand>
            <img alt="DDR BPM Logo" src="/src/assets/favicon/apple-touch-icon.png" width={48} heigh={48} />
          </Navbar.Brand>
        </Container>

        <Container>
          <Navbar.Toggle aria-controls="root-navbar" />
        </Container>

        <Container>
          <Navbar.Collapse id="root-navbar">
            <Nav class="me-auto" onSelect={(k) => setTabKey(k)}>
              <For each={tabs}>{(tab, i) =>
                <Nav.Link eventKey={tab.name}>
                  {tab.name}
                </Nav.Link>
              }</For>
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>

      <Container>
        <Suspense fallback={<div>Loading...</div>}>

          <Tab.Content>
            <For each={tabs}>{(tab, i) =>
              <Tab.Pane eventKey={tab.name} title={tab.name}>
                <Container>
                  {tab.component}
                </Container>
              </Tab.Pane>
            }</For>
          </Tab.Content>

        </Suspense>
      </Container>

    </Tab.Container>

  </>)

}

export default App;