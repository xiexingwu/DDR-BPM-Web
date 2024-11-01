import { JSX } from "solid-js";
import { Image } from "solid-bootstrap";

type JacketProps = {
  songName: string
}

export default function Jacket(props: JacketProps): JSX.Element {
  return (
    <Image class='jacket'
      src={encodeURI(`/jackets/${props.songName}.png`)}
      width={64} height={64}
    />
  )
}
