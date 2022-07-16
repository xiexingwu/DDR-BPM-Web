import { createSignal, createEffect } from "solid-js";
import type { Accessor, Setter, Component } from 'solid-js';
import { Container, Row, Col, OverlayTrigger, Tooltip, Form } from 'solid-bootstrap';
import Fa from 'solid-fa';
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

import { BPMWheel } from "./BPMWheel";

import "/src/css/BPMTab.css";


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
    <Container id="BPMInput">
      <Row>
        <Col align="center">
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
        </Col>
      </Row>
    </Container>
  )
}


export const BPMTab: Component = (props) => {
  const [bpmStr, setBpmStr] = createSignal("200");
  const bpmStrClean = () => cleanBpmStr(bpmStr())
  const bpms = () => parseBpmStr(bpmStrClean());
  createEffect(() => console.log("bpmStrClean", bpmStrClean()));

  return (
    <Container>
      <Row>
        <Col>
          <div class="tab" id="BPMTab">
            <BPMInput value={bpmStr} setter={setBpmStr} />
            <BPMWheel bpms={bpms()} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}