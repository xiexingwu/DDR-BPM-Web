import { createSignal, createEffect, Index, For, Show, Suspense } from "solid-js";
import type { Component, JSX } from 'solid-js';
import { Row, Col } from 'solid-bootstrap';


export default function SettingsTab(props): JSX.Element {

  return (
    <Row>
      <Col>
        <p>No settings available yet. Check back later!</p>
      </Col>
    </Row>
  )
}

