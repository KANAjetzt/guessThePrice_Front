<script>
  /*
  source: https://codesandbox.io/s/2wghk?file=/App.svelte
  */

  import { tweened } from "svelte/motion";
  import { derived } from "svelte/store";
  import { bounceOut } from "svelte/easing";

  const timer = tweened(5, { easing: bounceOut });

  setInterval(() => {
    timer.set($timer - 1);
  }, 1000);

  const height = derived(timer, ($timer) => $timer * 1.667);

  timer.subscribe((val) => {
    if (val < 0.1) {
      timer.set(5, { delay: 100 });
    }
  });
</script>

<div class="timer" style="height: {$height}vh;" />
<div class="timer-value" />

<style>
  .timer {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    background-color: rgba(51, 51, 51, 0.158);
    height: 100vh;
    width: 100vw;
  }
  .timer-value {
    position: absolute;
    display: flex;
    color: #eee;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 54px;
    font-size: 94px;
    height: 100vh;
    width: 100vw;
  }
  .timer-value small {
    font-size: 18px;
  }
</style>
