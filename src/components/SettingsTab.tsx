import { createSignal, createEffect, Index, For, Show, Suspense } from "solid-js";
import type { JSX } from 'solid-js';
import { Row, Col, Stack } from 'solid-bootstrap';
import { IOSInstallTip } from "./InstallComponents";


export default function SettingsTab(props): JSX.Element {

  return (
    <Stack>
      <p>No settings available yet. Check back later!</p>
      <IOSInstallTip/>
    </Stack>
  )
}

