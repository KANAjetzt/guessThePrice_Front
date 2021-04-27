<script>
  import { createEventDispatcher } from "svelte";
  import { deleteLS } from "../utils/localStorageHandler";
  import { roomStore, roomState, appStore } from "../stores";
  import RunningIcon from "./Icons/Running.svelte";

  const dispatch = createEventDispatcher();
</script>

<button
  class="exitBtn"
  on:click={() => {
    // Delete all LS data
    deleteLS("sessionData");
    // Leave current lobby
    $roomStore.leave();
    // Refresh the page
    location.reload();
  }}
>
  <div class="icon">
    <RunningIcon width={12} height={18} fill={"black"} />
  </div>
</button>

<style>
  .exitBtn {
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    border: none;
    background-color: var(--color-3);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .exitBtn:hover,
  .exitBtn:focus {
    transform: translateY(-0.2rem);
    filter: drop-shadow(var(--shadow-1--color1));
  }

  .icon {
    position: absolute;
    top: 55%;
    left: 52%;
    transform: translate(-50%, -50%);
  }
</style>
