import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { registerSW } from 'virtual:pwa-register'

import { ViewModelProvider } from "./js/ViewModel";
import "./css/global.css";


import {AppLayout, AppBody} from "./App";

render(() =>
  <ViewModelProvider>
  <Router root={AppLayout}>
      <AppBody/>
  </Router>
  </ViewModelProvider>
  , document.getElementById("root")!
);

const intervalMS = 60 * 60 * 1000
const updateSW = registerSW({
  onRegistered(r) {
    r && setInterval(() => {
      r.update()
    }, intervalMS)
  },
  onRegisterError(error) { }
})


