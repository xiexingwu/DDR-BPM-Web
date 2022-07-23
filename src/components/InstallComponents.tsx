
import { Button, Card } from "solid-bootstrap"
import { Component, createEffect, createSignal, Show } from "solid-js"
import { Fa } from 'solid-fa';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faDownload)
library.add(faArrowUpFromBracket)

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.platform);

export const InstallButton:Component = (props) => {

  return (
    <Button variant="primary" class='install-component d-none'>
      <Fa icon={faDownload}/>
      <span>Install</span>
    </Button>
  )
}
export const InstallUnavailable: Component = (props) => {
  return (
    <></>
  )
}
export const IOSInstallTip:Component = (props) => {

  const [displayTip, setDisplayTip] = createSignal(false);

  if (isIOS()) setDisplayTip(true);

  return (
    <Show when={displayTip()}>
      <Card
        bg="light"
        text="dark"
        id="ios-install-tip"
      >
        <Card.Header>
          Tip
        </Card.Header>
        <Card.Body>
          <Card.Title>Installing on iOS</Card.Title>
          <Card.Text>
            <ul>
              <li>Open this page with Safari.</li>
              <li>Tap <Fa icon={faArrowUpFromBracket} /> (Share).</li>
              <li>Add to Home Screen.</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </Show>
  )
}



// This variable will save the event for later use.
let deferredPrompt;
const installButtons = () => document.querySelectorAll('.install-component');
const toggleInstallButtonsDisplay = (display: boolean) => {
  installButtons().forEach((button) => display ? button.classList.remove('d-none') : button.classList.add('d-none'))
}


const displayInstallPrompt = async () => {
  // const installUnavailable = document.querySelector('#install-unavailable');


  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    // console.log('User accepted the install prompt.');
    toggleInstallButtonsDisplay(false)
  } else if (outcome === 'dismissed') {
    // console.log('User dismissed the install prompt');
  }
}

window.addEventListener('beforeinstallprompt', (e) => {
  // https://web.dev/learn/pwa/installation-prompt/

  // console.log('ready to install.')
  // Prevents the default mini-infobar or install dialog from appearing on mobile
  // e.preventDefault();

  // Save the event because you'll need to trigger it later.
  deferredPrompt = e;

  toggleInstallButtonsDisplay(false);

  installButtons().forEach((button) => {
    button.classList.remove('d-none');
    button.addEventListener('click', displayInstallPrompt)
  })
});