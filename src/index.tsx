import { render } from "solid-js/web";
import { Router } from "solid-app-router";
import { registerSW } from 'virtual:pwa-register'

import { ViewModelProvider } from "./js/ViewModel";
import "./css/global.css";


import App from "./App";

render(() =>
  <Router>
    <ViewModelProvider>
      <App/>
    </ViewModelProvider>
  </Router>
  , document.getElementById("root") as HTMLElement);

const intervalMS = 60 * 60 * 1000
const updateSW = registerSW({
  onRegistered(r) {
    r && setInterval(() => {
      r.update()
    }, intervalMS)
  },
  onRegisterError(error) { }
})


