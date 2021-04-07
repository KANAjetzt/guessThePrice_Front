<script>
  /*
  source: https://codesandbox.io/s/2wghk?file=/App.svelte

  TODO: Use background-position instead of width
  */

  import { tweened } from "svelte/motion";
  import { derived } from "svelte/store";
  import { bounceOut } from "svelte/easing";
  import { roomStore, roomState, appStore } from "../stores";

  let timerValue = $roomState.gameSettings.betweenRoundsTime;

  const timer = tweened(timerValue, { easing: bounceOut });

  setInterval(() => {
    timer.set($timer - 1);
  }, 1000);

  const width = derived(timer, ($timer) => {
    return $timer * (100 / timerValue);
  });

  timer.subscribe((val) => {
    if (val < 0.1) {
      timer.set(timerValue, { delay: 100 });
    }
  });
</script>

<div class="timer" style="width: {$width}%;" />

<style>
  .timer {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    background-color: var(--color-1-darker--alpha25);
    height: 100%;
    width: 100vw;
  }
</style>
