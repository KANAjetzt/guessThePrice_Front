import { derived, writable } from "svelte/store";

export const roomState = writable();

export const roomStore = writable();

export const appStore = writable({
  guessedPrice: 0,
  isAutoNumericOn: false,
  clientWidth: undefined,
  currentRoom: "characterCreation",
  currentPlayer: undefined,
  lightboxIsOpen: false,
  DSGVOisOpen: false,
  makeSureIsOpen: false,
  btnExitPlayerIsSure: false,
  galleryClickedImage: undefined,
  playerInfoMaxWidth: 0,
  subgridSupported: undefined,
});

// Cannot read property 'score' of undefined --> da war ich gestern
export const sortedPlayers = derived(roomState, ($roomState) => {
  return [...$roomState.playerStates.$items]
    .map((player) => player[1])
    .sort((a, b) => b.score - a.score);
});
