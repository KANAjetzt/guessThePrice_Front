<script>
  import { createEventDispatcher } from "svelte";
  import { roomStore, roomState, appStore } from "../stores";
  import BtnDefault from "./BtnDefault.svelte";
  import PlayArrowIcon from "./Icons/PlayArrow.svelte";
  import LockIcon from "./Icons/Lock.svelte"

  const dispatch = createEventDispatcher();

  export let disabled = false;
</script>

<BtnDefault
  on:click={() => {
    dispatch("click");
  }}
  {disabled}
>
  <div class="playArrowIcon">
    {#if !disabled}
    <PlayArrowIcon width={12} height={14} fill={"black"} />
    {:else}
    <LockIcon width={18} height={12} fill={"black"} />
    {/if}
  </div>
  <span>{$appStore.currentRoom !== "gameEnd" ? "START" : "NEUSTART"}</span>
</BtnDefault>

<style>
  .playArrowIcon {
    position: absolute;
    left: 0.6rem;
  }
</style>
