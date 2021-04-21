<script>
  import { roomStore, roomState, appStore } from "../stores";
  import Timer from "./Timer.svelte";
</script>

<div class="roundCounter">
  <h3>
    Runde {$roomState.currentRound + 1} <span>von</span>
    {$roomState.gameSettings.rounds}
  </h3>
  <Timer />
</div>

<style>
  .roundCounter {
    position: relative;
    width: 100%;
    padding: 2.3rem 0;
    background-image: var(--color-gradient-1--90deg);
  }

  h3 {
    position: relative;
    font-size: var(--baseFontSize);
    font-weight: 500;
    text-align: center;
    z-index: 2;
  }

  span {
    color: var(--color-2);
  }
</style>
