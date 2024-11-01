import { JSX } from "solid-js";
import { sanitiseURL } from "../js/util";
import { Image } from "solid-bootstrap";

type JacketProps = {
  songName: string
}

export default function Jacket(props: JacketProps): JSX.Element {
  return (
    <Image class='jacket'
      src={sanitiseURL(`/jackets/${props.songName}.png`)}
      width={64} height={64}
    />
  )
}
