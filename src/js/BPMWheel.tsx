import { Index, Show, Switch, Match, createEffect } from "solid-js";
import type { Component } from 'solid-js';
import { Container, Row, Col, Table } from 'solid-bootstrap';
import "/src/css/BPMWheel.css";


const speedMods: number[] = [
  0.25, 0.5, 0.75, 1, 
  1.25, 1.5, 1.75, 2,
  2.25, 2.5, 2.75, 3,
  3.25, 3.5, 3.75, 4,
  4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8
]

function fmtSpeedMod(speedMod: number): [string, string, string] {
  const int = Math.floor(speedMod);
  const intStr = String(int)
  if (int == speedMod) {
    return [intStr, "", ""];
  }
  
  let dec = speedMod - int;
  let decStr: string;
  if (Math.abs(dec - 0.5) < 0.01) {
    decStr = "5"
  } else {
    decStr = String(Math.floor(dec*100))
  }

  return [intStr, ".", decStr];
}

function fmtSpeed(speed: number): string {
  return String(speed).padStart(4, "\xa0")
}

type BPMWheelProps = {
  bpms: number[];
};

type BPMRowProps = {
  bpms: number[];
  mod: number;
}
const BPMRow: Component<BPMRowProps> = (props) => {
  let modStr = fmtSpeedMod(props.mod)
  return <tr>
    <td class="mod">
      <div>{modStr[0]}</div>
      <div>{modStr[1]}</div>
      <div>{modStr[2]}</div>
    </td>
    <Index each={props.bpms}>{ (bpm, i) =>
      <td>
        {fmtSpeed(Math.round(props.mod * bpm()))}
      </td>
    }</Index>
  </tr>
  };

export const BPMWheel: Component<BPMWheelProps> = (props) => {
  const bpms = () => props.bpms.length ? props.bpms : [200];
  const n = () => bpms().length;
  // createEffect(() => console.log("wheel bpms:", bpms(), "props.bpms:", props.bpms))
  // createEffect(() => console.log("wheel n:", n()))

const header = () => (
  <tr>
    <th class="mod">
      Speed Mod
    </th>
    <Switch>
      <Match when={n() == 1}>
        <th>Speed</th>
      </Match>
        <Match when={n() == 2}>
          <th>Min</th>
          <th>Max</th>
      </Match>
      <Match when={n() == 3}>
          <th>Mostly</th>
          <th>Min</th>
          <th>Max</th>
      </Match>
    </Switch>
  </tr>
)

  return (
    <Container>
      <Row>
        <Col justify-content="center">
          <Show
            when={1 <= n() && n() <= 3}
            fallback={<p>BPMWheel cannot display with {n()} inputs</p>}
          >
            <Table striped bordered class="BPMWheel">
              <thead>
                {header()}
              </thead>
              <tbody>
                <Index each={speedMods}>{(mod, i) =>
                  <BPMRow bpms={bpms()} mod={mod()} />
                }</Index>
              </tbody>
            </Table>
          </Show>
        </Col>
      </Row>
    </Container>

  );
};