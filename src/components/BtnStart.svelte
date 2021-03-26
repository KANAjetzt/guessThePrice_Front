<script>
  import { createEventDispatcher } from "svelte";
  import { roomStore, roomState, appStore } from "../stores";
  import BtnDefault from "./BtnDefault.svelte";
  import PlayArrowIcon from "./Icons/PlayArrow.svelte";

  const dispatch = createEventDispatcher();
</script>

<BtnDefault
  on:click={() => {
    dispatch("click");
  }}
>
  <div class="playArrowIcon">
    <PlayArrowIcon width={12} height={14} fill={"black"} />
  </div>
  <span>{$appStore.currentRoom !== "gameEnd" ? "START" : "NEUSTART"}</span>
</BtnDefault>

<style>
  .playArrowIcon {
    position: absolute;
    left: 0.6rem;
  }
</style>
