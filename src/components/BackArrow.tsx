import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Button, Stack } from "solid-bootstrap";
import Fa from "solid-fa";
import { JSX } from "solid-js";
import { useViewModel } from "../js/ViewModel";

library.add(faArrowLeftLong)

type BackArrowProps = {
  dst?: string
}

export default function BackArrow(props): JSX.Element {
  const { viewModel } = useViewModel()
  return (
    <Stack direction="horizontal" gap={2} class="back-arrow" as="a" href={ props.dst ?? viewModel().tab() }>
      <Fa icon={faArrowLeftLong} />
      <span>{viewModel().tab().slice(1)}</span>
    </Stack>
  )
}