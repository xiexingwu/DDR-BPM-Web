import { Index, Show, Switch, Match, createEffect, For } from "solid-js";
import type { Component } from 'solid-js';
import { Row, Col, Table } from 'solid-bootstrap';
import "../css/BPMWheel.css";


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
    decStr = String(Math.floor(dec * 100))
  }

  return [intStr, ".", decStr];
}

function fmtSpeed(speed: number): string {
  return String(speed).padStart(4, "\xa0")
}

type BPMWheelProps = {
  bpms: number[];
};
type BPMHeaderProps = {
  ncol: number;
}
type BPMRowProps = {
  bpms: number[];
  mod: number;
}
const BPMRow: Component<BPMRowProps> = (props) => {
  let modStr = fmtSpeedMod(props.mod)
  return <tr class="d-flex">
    <td class="mod col">
      <div>{modStr[0]}</div>
      <div>{modStr[1]}</div>
      <div>{modStr[2]}</div>
    </td>
    <Index each={props.bpms}>{(bpm, i) =>
      <td class="col">
        {fmtSpeed(Math.round(props.mod * bpm()))}
      </td>
    }</Index>
  </tr>
};

const BPMHeader: Component<BPMHeaderProps> = (props) => {
  const texts = () => {switch (props.ncol){
    case 3:
      return ["Mostly", "Min", "Max"];
    case 2:
      return ["Min", "Max"];
    default:
      return ["Speed"];
  }}
  return (
    <tr class="d-flex">
      <th class="mod col">
        Speed Mod
      </th>
      <For each={texts()}>{(text, i) =>
        <th class="col">{text}</th>
      }</For>
    </tr>
  )
}

export const BPMWheel: Component<BPMWheelProps> = (props) => {
  const bpms = () => props.bpms.length ? props.bpms : [200];
  const ncol = () => bpms().length;

  return (
    <Show
      when={[1, 2, 3].includes(ncol())}
      fallback={<p>BPMWheel cannot display with {ncol()} inputs</p>}
    >
      <Table striped bordered class="bpm-wheel">
        <thead>
          <BPMHeader ncol={ncol()} />
        </thead>
        <tbody>
          <Index each={speedMods}>{(mod, i) =>
            <BPMRow bpms={bpms()} mod={mod()} />
          }</Index>
        </tbody>
      </Table>
    </Show>

  );
};