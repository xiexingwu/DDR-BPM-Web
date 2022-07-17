// import { createSignal, createEffect, createResource, createContext, useContext, For, Show } from "solid-js";
import type { Component } from 'solid-js';
import { Container, Row, Col, Image } from 'solid-bootstrap';
import type { Song } from './Song';
import { sanitiseURL } from './util';
type SongRowProps = {
  song: Song;
}


export const SongRow: Component<SongRowProps> = (props) => {
  const song = props.song;

  return (
    <Container class="song-row">
      <Row>
        <Col sm={2}>
          <Image
            src={sanitiseURL(`/src/assets/jackets/${song.name}-jacket.png`)}
            width={64} height={64}
          />
        </Col>
        
        <Col sm={8}>
          <p>{song.name}</p>
          <p>{song.version ?? ""}</p>
        </Col>

        <Col sm={2}>
        </Col>
      </Row>
    </Container>
  )
}
