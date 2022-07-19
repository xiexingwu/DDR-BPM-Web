import { createSignal, createEffect } from "solid-js";
import type { Accessor, Setter, Component, JSX } from 'solid-js';
import { Stack, OverlayTrigger, Tooltip, Form } from 'solid-bootstrap';
import Fa from 'solid-fa';
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import { BPMWheel } from "./BPMWheel";

import "../css/BPMTab.css";


const invalidBpmCharRegex = /[^0-9~\-,\.]+/g;
const invalidBpmLenRegex = /.*\..+\..+/;

function checkBpmStrValid(bpmStr: string): boolean {
  if (invalidBpmCharRegex.test(bpmStr)) { return false };
  if (invalidBpmLenRegex.test(bpmStr)) { return false };
  return true;
}
function cleanBpmStr(bpmStr: string): string {
  return bpmStr
    .replace(invalidBpmCharRegex, "")
    .replace(/[~\-,]/g, ".");
}
function parseBpmStr(bpmStr: string): number[] {
  return bpmStr.split(/\./).filter(s => s != "").map(s => Number(s)).slice(0, 2)
}

type BPMInputProps = {
  value: Accessor<string>;
  setter: Setter<string>;
}

const BPMInput: Component<BPMInputProps> = (props) => {
  const bpmStr = props.value;
  const bpmStrIsValid = () => checkBpmStrValid(bpmStr());

  return (
    <Stack direction="horizontal" id="bpm-input">
      <span>BPM:</span>
      <Form.Control
        placeholder="200"
        data-valid={bpmStrIsValid()}
        inputmode="decimal"
        onInput={e => {
          const target = e?.target as HTMLInputElement;
          props.setter(target.value)
        }}
      />
      <OverlayTrigger
        placement="top"
        offset={[0, 8]}
        overlay={<Tooltip>Input "110.220" for variable BPM of 110 to 220.</Tooltip>}
      >
        <Fa icon={faCircleQuestion} />
      </OverlayTrigger>
    </Stack>

  )
}


export default function BPMTab(): JSX.Element {
  const [bpmStr, setBpmStr] = createSignal("200");
  const bpmStrClean = () => cleanBpmStr(bpmStr())
  const bpms = () => parseBpmStr(bpmStrClean());
  // createEffect(() => console.log("bpmStrClean", bpmStrClean()));

  return (
    <Stack id="bpm-tab">
      <BPMInput value={bpmStr} setter={setBpmStr} />
      <BPMWheel bpms={bpms()} />
    </Stack>
  )
}