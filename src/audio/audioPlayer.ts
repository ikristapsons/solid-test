export function playAudio(audioRef: HTMLAudioElement): void {
  const retrieveBookMark = localStorage.getItem("playbackBookmark");
  if (audioRef) {
    audioRef.currentTime = retrieveBookMark ? parseFloat(retrieveBookMark) : 0;
    audioRef.play();
  } else {
    console.log("audioRef not defined");
  }
}

export function pauseAudio(audioRef: HTMLAudioElement): void {
  audioRef.pause();
}

export function forwardAudio(audioRef: HTMLAudioElement): void {
  if (audioRef) audioRef.currentTime += 10;
}

export function rewindAudio(audioRef: HTMLAudioElement): void {
  if (audioRef) audioRef.currentTime -= 10;
}

export function fasterPlayback(audioRef: HTMLAudioElement): void {
  if (audioRef) audioRef.playbackRate = 1.5;
}

export function slowerPlayback(audioRef: HTMLAudioElement): void {
  if (audioRef) audioRef.playbackRate = 0.5;
}

export function bookmark(audioRef: HTMLAudioElement): void {
  if (audioRef) {
    const bookmark = audioRef.currentTime;
    localStorage.setItem("playbackBookmark", bookmark.toString());
    console.log(`Bookmark saved at: ${bookmark} seconds`);
  } else {
    console.log("audioRef is not defined");
  }
}
