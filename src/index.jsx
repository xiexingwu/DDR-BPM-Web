import { render } from "solid-js/web";

import App from "./App";

render(() => <App />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
  // window.addEventListener("load", function () {
  //   navigator.serviceWorker
  //     .register("/serviceWorker.js")
  //     .then(res => console.log("service worker registered"))
  //     .catch(err => console.log("service worker not registered", err))
  // })
}