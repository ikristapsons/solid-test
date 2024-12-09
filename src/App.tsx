import { onMount, type Component, type JSX, createSignal } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import {
  playAudio,
  pauseAudio,
  forwardAudio,
  rewindAudio,
  fasterPlayback,
  slowerPlayback,
  bookmark,
} from "./audio/audioPlayer";

const converTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h:${minutes}m:${remainingSeconds}s`
}

const result = converTime(240);
console.log(result);

const App: Component = () => {
  let audioRef!: HTMLAudioElement;
  const setAudioRef = (el: HTMLAudioElement) => {
    audioRef = el;
  };

  const [duration, setDuration] = createSignal(0);
  const [currentTime, setCurrentTime] = createSignal(0);

  onMount(() => {
    if (audioRef) {
      audioRef.addEventListener("loadedmetadata", () => {
        const convertedDuration = converTime(audioRef.duration)
        setDuration(convertedDuration)
        setCurrentTime(audioRef.currentTime);
        console.log(`Audio duration: ${audioRef.duration}`);
        console.log(`Audiot current time: ${audioRef.currentTime}`)
      });
    }
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />

        <audio
          ref={setAudioRef}
          controls
          src="src/assets/music/echoes.mp3"
          preload="metadata"
          typeof="audio/mp3"
        ></audio>
        <div id="audioControls">
        
          <span id="duration">Duration: {duration()}</span>
          <button type="button" onClick={() => playAudio(audioRef)}>
            PLAY
          </button>
          <button type="button" onClick={() => pauseAudio(audioRef)}>
            PAUSE
          </button>
          <button type="button" onClick={() => forwardAudio(audioRef)}>
            +10SEC
          </button>
          <button type="button" onClick={() => rewindAudio(audioRef)}>
            -10SEC
          </button>
          <button type="button" onClick={() => fasterPlayback(audioRef)}>
            Faster
          </button>
          <button type="button" onClick={() => slowerPlayback(audioRef)}>
            Slower
          </button>
          <button type="button" onClick={() => bookmark(audioRef)}>
            Bookmark
          </button>
          <span id="current-time">CurrentTime: {currentTime()}</span>
          <output id="volume-ouput">100</output>
          <input type="range" id="seek-slider" max="100" value="0" />
          <input type="range" id="volume-slider" max="100" value="100" />
        </div>
      </header>
    </div>
  );
};

export default App;
