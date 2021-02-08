import { writable } from "svelte/store";

export const roomState = writable();

export const roomStore = writable();

export const appStore = writable({
  guessedPrice: 0,
  isAutoNumericOn: false,
});
